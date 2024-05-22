import React, {useState} from 'react';
import '../css/GenerateVP.css';

function GenerateVP({onBackClick}) {
    const [usage, setUsage] = useState('');
    const [challenge, setChallenge] = useState('');
    const [vcJson, setVcJson] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setResponseData(null);

        try {
            // // 解析用户输入的 JSON 数组
            // const parsedVcJsonArray = JSON.parse(vcJson);
            // console.log(parsedVcJsonArray);
            // 发送请求到后端
            const response = await fetch('http://127.0.0.1:8888/vp/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({usage, challenge, vc_json: vcJson}),
            });
            // console.log(JSON.stringify({usage, challenge, vc_json: vcJson}))
            const result = await response.json();
            setResponseData(result.data);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (result.code === 222) {
                setSuccessMessage(result.msg);
                console.log('GenerateVP result:', result);
            } else {
                throw new Error(result.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof SyntaxError) {
                setErrorMessage('Invalid JSON format');
            } else {
                setErrorMessage(error.message || 'Failed to fetch');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Usage</label>
                    <input
                        type="text"
                        value={usage}
                        onChange={(e) => setUsage(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Challenge</label>
                    <input
                        type="text"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>VC JSON</label>
                    <textarea
                        value={vcJson}
                        onChange={(e) => setVcJson(e.target.value)}
                        className="form-input"
                        rows="10"
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

export default GenerateVP;
