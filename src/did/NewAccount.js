import React, { useState } from 'react';
import '../css/Register.css';

function NewAccount({ onBackClick }) {
    const [algorithm, setAlgorithm] = useState('SM2');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleAlgorithmChange = (event) => {
        setAlgorithm(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username) {
            setErrorMessage('Username is required.');
            return;
        }
        setErrorMessage('');
        setSuccessMessage('');
        setResponseData(null);

        const formData = new FormData();
        formData.append('algo', algorithm);
        formData.append('name', username);

        try {
            const response = await fetch('http://127.0.0.1:8888/account/new', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setResponseData(result.data);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (result.code === 201) {
                setSuccessMessage(result.msg);
                console.log('NewAccount result:', result);
            } else {
                throw new Error(result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to fetch');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="algorithm">Key Generation Algorithm</label>
                    <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange} className="form-select">
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
                        className="form-input"
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="form-button">Submit</button>
            </form>
            <button onClick={onBackClick} className="form-button">Back</button>
            {responseData && (
                <div className="result-data">
                    <h3>Response Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default NewAccount;
