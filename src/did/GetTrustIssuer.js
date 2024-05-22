import React, { useState } from 'react';
import '../css/GetTrustIssuer.css';

function GetTrustIssuer({ onBackClick }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setResponseData(null);
        setSuccessMessage('');


        const jsonData = JSON.stringify({
            start: 1,
            count: 1000,
        });

        try {
            const response = await fetch('http://127.0.0.1:8888/trust/issuer/list', {
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
            if (result.code === 212) {
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
                <button type="submit" className="form-button">Submit</button>
            </form>
            <button onClick={onBackClick} className="form-button">Back</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseData && (
                <div className="result-data">
                    <h3>Response Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default GetTrustIssuer;
