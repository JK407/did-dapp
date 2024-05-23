import React, { useState } from 'react';
import './App.css';
import Register from './did/NewAccount';
import GetDidDocument from './did/GetDidDocument';
import GetVcTemplateList from './vc/GetVcTemplateList';
import GetBlackList from './did/GetBlackList';
import GetTrustIssuer from './did/GetTrustIssuer';
import GenerateVC from './vc/GenerateVC';
import GetVcIssueLogs from './vc/GetVcIssueLogs';
import VerifyVc from './vc/VerifyVc';
import GenerateVP from './vp/GenerateVP';
import VerifyVp from './vp/VerifyVp';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleGetDidDocumentClick = () => {
    setActiveComponent('GetDidDocument');
  };

  const handleRegisterClick = () => {
    setActiveComponent('Register');
  };

  const handleGetVcTemplateListClick = () => {
    setActiveComponent('GetVcTemplateList');
  };

  const handleGetBlackListClick = () => {
    setActiveComponent('GetBlackList');
  };

  const handleGetTrustIssuerClick = () => {
    setActiveComponent('GetTrustIssuer');
  };

  const handleGenerateVCClick = () => {
    setActiveComponent('GenerateVC');
  };

  const handleGetVcIssueLogsClick = () => {
    setActiveComponent('GetVcIssueLogs');
  };

  const handleVerifyVcClick = () => {
    setActiveComponent('VerifyVc');
  };

  const handleGenerateVPClick = () => {
    setActiveComponent('GenerateVP');
  };

  const handleVerifyVpClick = () => {
    setActiveComponent('VerifyVp');
  };

  const handleBackClick = () => {
    setActiveComponent(null);
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Did去中心化身份系统</h1>
        </header>
        <div className="form-container">
          {!activeComponent && (
              <div className="button-container">
                <button onClick={handleGetDidDocumentClick} className="form-button">GetDidDocument</button>
                <button onClick={handleRegisterClick} className="form-button">NewAccount</button>
                <button onClick={handleGetVcTemplateListClick} className="form-button">GetVcTemplateList</button>
                <button onClick={handleGetBlackListClick} className="form-button">GetBlackList</button>
                <button onClick={handleGetTrustIssuerClick} className="form-button">GetTrustIssuer</button>
                <button onClick={handleGenerateVCClick} className="form-button">GenerateVC</button>
                <button onClick={handleGetVcIssueLogsClick} className="form-button">GetVcIssueLogs</button>
                <button onClick={handleVerifyVcClick} className="form-button">VerifyVc</button>
                <button onClick={handleGenerateVPClick} className="form-button">GenerateVP</button>
                <button onClick={handleVerifyVpClick} className="form-button">VerifyVp</button>
              </div>
          )}
          {activeComponent === 'Register' && <Register onBackClick={handleBackClick} />}
          {activeComponent === 'GetDidDocument' && <GetDidDocument onBackClick={handleBackClick} />}
          {activeComponent === 'GetVcTemplateList' && <GetVcTemplateList onBackClick={handleBackClick} />}
          {activeComponent === 'GetBlackList' && <GetBlackList onBackClick={handleBackClick} />}
          {activeComponent === 'GetTrustIssuer' && <GetTrustIssuer onBackClick={handleBackClick} />}
          {activeComponent === 'GenerateVC' && <GenerateVC onBackClick={handleBackClick} />}
          {activeComponent === 'GetVcIssueLogs' && <GetVcIssueLogs onBackClick={handleBackClick} />}
          {activeComponent === 'VerifyVc' && <VerifyVc onBackClick={handleBackClick} />}
          {activeComponent === 'GenerateVP' && <GenerateVP onBackClick={handleBackClick} />}
          {activeComponent === 'VerifyVp' && <VerifyVp onBackClick={handleBackClick} />}
        </div>
      </div>
  );
}

export default App;
