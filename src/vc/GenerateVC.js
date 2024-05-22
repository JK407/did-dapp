import React, { useState } from 'react';
import '../css/GenerateVC.css';

function GenerateVC({ onBackClick }) {
    const [vcId, setVcId] = useState('');
    const [vcType, setVcType] = useState('');
    const [userDid, setUserDid] = useState('');
    const [userName, setUserName] = useState('');
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setResponseData(null);

        const jsonData = JSON.stringify({
            vc_id: vcId,
            vc_type: vcType,
            user_did: userDid,
            user_name: userName,
            id: id,
            phone: phone,
        });

        try {
            const response = await fetch('http://127.0.0.1:8888/vc/generate', {
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
            if (result.code === 216) {
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
                    <label>VC ID</label>
                    <input
                        type="text"
                        value={vcId}
                        onChange={(e) => setVcId(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>VC Type</label>
                    <input
                        type="text"
                        value={vcType}
                        onChange={(e) => setVcType(e.target.value)}
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
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

export default GenerateVC;
