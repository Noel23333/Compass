import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import './bulma/css/bulma.css';
import MenuBar from './components/menubar';
import Navbar from './components/navbar';

function MainContent() {
  const [code, setCode] = useState('');
  const [rtlCode, setRtlCode] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/generate-rtl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Send the C/C++ code to the server
      });

      if (response.ok) {
        const data = await response.json();
        setRtlCode(data.rtlCode); // Display RTL code
      } else {
        alert('Error generating RTL code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error communicating with the server');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <div className="main-content" style={{ width: '50%' }}>
        <header className="App-header">
          <h1>Vitis HLS Code Generation</h1>
          <div className="code-section">
            <div className="input-section">
              <h2>Input Code</h2>
              <textarea
                value={code}
                onChange={handleCodeChange}
                placeholder="Enter C/C++ code"
                rows="10"
                cols="50"
                className="code-input"
              />
              <button onClick={handleSubmit} className="submit-button" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate RTL Code'}
              </button>
            </div>
            {rtlCode && (
              <div className="output-section">
                <h2>RTL Code</h2>
                <textarea
                  value={rtlCode}
                  readOnly
                  rows="20"
                  cols="80"
                  className="rtl-output"
                />
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="columns is-gapless" style={{ height: '100vh', margin: 0 }}>
      <div className="column is-2 has-background-light" style={{ padding: 0 }}>
        <MenuBar />
      </div>

      <div className="column">  
        <Navbar />
        <MainContent />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainLayout />} />
        <Route path="/settings" element={<MainLayout />} />
        <Route path="/history" element={<MainLayout />} />
        <Route path="/documentation" element={<MainLayout />} />
        <Route path="/about" element={<MainLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;