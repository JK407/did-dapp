import React, { useState } from 'react';
import '../css/GetVcIssueLogs.css';

function GetVcIssueLogs({ onBackClick }) {
    const [issuerDid, setIssuerDid] = useState('');
    const [userDid, setUserDid] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setResponseData(null);

        const jsonData = JSON.stringify({
            issuer_did: issuerDid,
            user_did: userDid,
        });

        try {
            const response = await fetch('http://127.0.0.1:8888/vc/issue/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });

            const result = await response.json();
            setResponseData(result.data);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (result.code === 217) {
                setSuccessMessage(result.msg);
                console.log('GetVcTemplateList result:', result);
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
                    <label>Issuer DID</label>
                    <input
                        type="text"
                        value={issuerDid}
                        onChange={(e) => setIssuerDid(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>User DID</label>
                    <input
                        type="text"
                        value={userDid}
                        onChange={(e) => setUserDid(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
            <button onClick={onBackClick} className="form-button">Back</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {responseData && (
                <div className="result-data">
                    <h3>Response Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default GetVcIssueLogs;
