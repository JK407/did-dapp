import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [algorithm, setAlgorithm] = useState('SM2');
  const [username, setUsername] = useState('');

  const handlePublicKeyChange = (event) => {
    setPublicKey(event.target.files[0]);
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setIsRegister(false);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
    setIsRegister(true);
  };

  const handleBackClick = () => {
    setIsLogin(false);
    setIsRegister(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log('Public Key File:', publicKey);
      console.log('Private Key File:', privateKey);
      // 在这里处理登录的文件上传逻辑
    } else if (isRegister) {
      console.log('Algorithm:', algorithm);
      console.log('Username:', username);
      // 在这里处理注册的逻辑，调用后端接口
    }
  };

  return (
      <div className="App">
        <div className="form-container">
          {!isLogin && !isRegister && (
              <>
                <button onClick={handleLoginClick} className="form-button">Login</button>
                <button onClick={handleRegisterClick} className="form-button">Register</button>
              </>
          )}
          {isLogin && (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="publicKey" className="custom-file-upload custom-file-upload-gray">
                      <input type="file" id="publicKey" onChange={handlePublicKeyChange} />
                      {publicKey ? publicKey.name : 'Upload Public Key File'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="privateKey" className="custom-file-upload custom-file-upload-gray">
                      <input type="file" id="privateKey" onChange={handlePrivateKeyChange} />
                      {privateKey ? privateKey.name : 'Upload Private Key File'}
                    </label>
                  </div>
                  <button type="submit" className="form-button">Submit</button>
                </form>
                <button onClick={handleBackClick} className="form-button">Back</button>
              </>
          )}
          {isRegister && (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="algorithm">Key Generation Algorithm</label>
                    <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange}>
                      <option value="SM2">SM2</option>
                      <option value="ECC_P256">ECC_P256</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Blockchain Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your blockchain username"
                    />
                  </div>
                  <button type="submit" className="form-button">Submit</button>
                </form>
                <button onClick={handleBackClick} className="form-button">Back</button>
              </>
          )}
        </div>
      </div>
  );
}

export default App;
