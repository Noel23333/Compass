# Vivado HLS YAML Generator (Windows Version)

## ✅ Requirements
- Vivado HLS (e.g. Vitis 2022.1)
- Python 3.x (`pip install pyyaml`)

## ▶️ How to Use

1. Open "Xilinx Vivado HLS Command Prompt" (or regular cmd with environment set)

2. Navigate to project directory:
   cd path\to\vitis_hls_yaml_gen

3. Run the batch script:
   run.bat

It will:
- Run HLS using TCL
- Parse generated Verilog
- Generate YAML pinout in output\pinout.yaml

## 📄 Output Example

```
- name: a
  direction: input
  width: 8
  pin: "<AUTO_ASSIGN_a>"
```

## 🛠️ Clean (manual)
Delete folders: my_project, output, *.log, *.jou
