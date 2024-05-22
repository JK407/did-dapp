import React, { useState } from 'react';
import '../css/GetDidDocument.css';

function GetDidDocument({ onBackClick }) {
    const [did, setDid] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleDidChange = (event) => {
        setDid(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!did) {
            setErrorMessage('DID is required.');
            return;
        }
        setErrorMessage('');
        setSuccessMessage('');
        setResponseData(null);

        const jsonData = JSON.stringify({ did });

        try {
            const response = await fetch('http://127.0.0.1:8888/did/document/get', {
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

            if (result.code === 204) {
                setSuccessMessage(result.msg);
                console.log('Get DID Document result:', result);
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
                    <label htmlFor="did">DID</label>
                    <input
                        type="text"
                        id="did"
                        value={did}
                        onChange={handleDidChange}
                        placeholder="Enter DID"
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

export default GetDidDocument;
