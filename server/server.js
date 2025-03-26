const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Client } = require('ssh2');

// ��ʼ�� Express Ӧ��
const app = express();
const port = 5000;

// �м��
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.c'; // ȷ������չ��
    cb(null, file.originalname || `uploaded_file${ext}`);
  }
});

const upload = multer({ storage: storage });

// SSH Զ�̷���������
const sshConfig = {
  host: '', // Զ�̷����� IP
  port: 22,  // SSH �˿�
  username: 'noel', // Զ�̷������û���
  privateKey: fs.readFileSync('/home/noel/.ssh/id_rsa'), // SSH ˽Կ·��
  passphrase: ''  // ������д���˽Կ����
};

// Զ�̴洢·��
const remoteDir = '/home/noel/React/temp';

// ���� RTL �������ɵ� API
app.post('/generate-rtl', upload.single('file'), (req, res) => {
  let tempCFile;

  // �ж����ϴ��ļ������ı�����
  if (req.file) {
    tempCFile = path.join(__dirname, 'uploads', req.file.filename);
  } else if (req.body.code) {
    const code = req.body.code;
    const tempDir = path.join(__dirname, 'temp_project');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    tempCFile = path.join(tempDir, 'temp_code.c');
    fs.writeFileSync(tempCFile, code);
  } else {
    return res.status(400).json({ message: 'No input provided' });
  }

  // ���� TCL �ű�
  const tclScript = `
    open_project -reset hls_project
    set_top top_function
    add_files ${path.join(remoteDir, 'temp_code.c')}
    open_solution -reset solution1
    set_part xc7vx485tffg1761-2
    create_clock -period 10 -name default
    csynth_design
    export_design -format ip_catalog
    exit
  `;

  const tempDir = path.dirname(tempCFile);
  const tclScriptPath = path.join(tempDir, 'generate_rtl.tcl');
  fs.writeFileSync(tclScriptPath, tclScript);

  // SSH ����Զ�̷�����
  const conn = new Client();
  conn.on('ready', () => {
    console.log('SSH Connection established.');

    conn.sftp((err, sftp) => {
      if (err) {
        console.error('SFTP Error:', err);
        conn.end();
        return res.status(500).json({ message: 'SFTP Error' });
      }

      // ȷ��Զ�� `temp` Ŀ¼����
      conn.exec(`mkdir -p ${remoteDir}`, (err) => {
        if (err) {
          console.error('Remote directory creation failed:', err);
          conn.end();
          return res.status(500).json({ message: 'Remote directory creation failed' });
        }

        // �ϴ� C �����ļ�
        sftp.fastPut(tempCFile, path.join(remoteDir, 'temp_code.c'), (err) => {
          if (err) {
            console.error('Error uploading C file:', err);
            conn.end();
            return res.status(500).json({ message: 'Error uploading C file' });
          }

          // �ϴ� TCL �ű�
          sftp.fastPut(tclScriptPath, path.join(remoteDir, 'generate_rtl.tcl'), (err) => {
            if (err) {
              console.error('Error uploading TCL script:', err);
              conn.end();
              return res.status(500).json({ message: 'Error uploading TCL script' });
            }

            // Զ��ִ�� Vitis HLS ����
            const command = `/home/noel/Programs/Xilinx/Vitis_HLS/2022.1/bin/vitis_hls -f ${path.join(remoteDir, 'generate_rtl.tcl')}`;
            conn.exec(command, (err, stream) => {
              if (err) {
                console.error('Error executing Vitis HLS:', err);
                conn.end();
                return res.status(500).json({ message: 'Error executing Vitis HLS' });
              }

              let output = '';
              stream.on('data', (data) => {
                output += data.toString();
              });

              stream.on('close', (code) => {
                console.log('Vitis HLS command executed, exit code:', code);
                if (code !== 0) {
                  conn.end();
                  return res.status(500).json({ message: 'Vitis HLS execution failed' });
                }

                // ����Զ�� RTL �����ļ�·��
                const rtlCodeFile = '/home/noel/hls_project/solution1/syn/verilog/top_function.v'; // ����·��

                // ��� RTL �����ļ��Ƿ����
                sftp.stat(rtlCodeFile, (err) => {
                  if (err) {
                    console.error('RTL code not generated:', err);
                    conn.end();
                    return res.status(500).json({ message: 'RTL code not generated' });
                  }

                  // ���� RTL �����ļ�
                  const localRtlPath = path.join(tempDir, 'top_function.v');
                  sftp.fastGet(rtlCodeFile, localRtlPath, (err) => {
                    conn.end();
                    if (err) {
                      console.error('Error downloading RTL file:', err);
                      return res.status(500).json({ message: 'Error downloading RTL code' });
                    }

                    const rtlCode = fs.readFileSync(localRtlPath, 'utf8');
                    res.json({ rtlCode });
                  });
                });
              });
            });
          });
        });
      });
    });
  }).on('error', (err) => {
    console.error('SSH Connection Error:', err);
    res.status(500).json({ message: 'SSH connection error' });
  }).connect(sshConfig);
});

// ���� Express ������
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
