import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TextareaAutosize from 'react-textarea-autosize';

function App() {
  const [code, setCode] = useState('');
  const [rtlCode, setRtlCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setCode(''); // Reset code input
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();

      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        formData.append('code', code);
      }

      const response = await fetch('http://localhost:5000/generate-rtl', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setRtlCode(data.rtlCode);
      } else {
        alert('Error generating RTL code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error communicating with the server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rtlCode)
      .then(() => alert('RTL code copied to clipboard!'))
      .catch(() => alert('Failed to copy RTL code.'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Vitis HLS Code Generation</h1>

        {/* File Upload */}
        <input
          type="file"
          accept=".c"
          onChange={handleFileChange}
          className="file-input"
        />

        {/* Input for C/C++ code */}
        <TextareaAutosize
          value={selectedFile ? 'File uploaded. Please refresh the page if you want to use the text input.' : code}
          onChange={handleCodeChange}
          placeholder="Enter C/C++ code"
          className={`code-input ${selectedFile ? 'disabled-input' : ''}`}
          disabled={selectedFile !== null} // Disable if a file is uploaded
        />

        {/* Button to generate RTL code */}
        <button onClick={handleSubmit} className="submit-button" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate RTL Code'}
        </button>

        {/* Display RTL Code */}
        {rtlCode && (
          <div className="rtl-output-container">
            <h2>Generated RTL Code</h2>
            <div className="rtl-output">
              <SyntaxHighlighter language="verilog" style={darcula}>
                {rtlCode}
              </SyntaxHighlighter>
            </div>
            <button onClick={handleCopy} className="copy-button">
              Copy to Clipboard
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
