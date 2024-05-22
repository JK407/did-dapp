// src/vc/GetVcTemplateList.js
import React, { useState } from 'react';
import '../css/Register.css';

function GetVcTemplateList({ onBackClick }) {
    const [templateName, setTemplateName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleTemplateNameChange = (event) => {
        setTemplateName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setResponseData(null);

        const data = {
            name_search: templateName || '',
            start: 1,
            count: 1000
        };

        try {
            const response = await fetch('http://127.0.0.1:8888/vc/template/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const text = await response.text(); // 获取原始响应文本
            console.log('Raw response:', text); // 打印原始响应文本

            try {
                const result = JSON.parse(text); // 尝试解析为 JSON
                console.log('Parsed response:', result); // 打印解析后的 JSON
                setResponseData(result.data);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                if (result.code === 215) {
                    setSuccessMessage(result.msg);
                    console.log('GetVcTemplateList result:', result);
                } else {
                    throw new Error(result.msg);
                }
            } catch (jsonError) {
                console.error('JSON parse error:', jsonError);
                throw new Error(`Failed to parse JSON: ${jsonError.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage(`Failed to fetch: ${error.message}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="templateName">Template Name</label>
                    <input
                        type="text"
                        id="templateName"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                        placeholder="Enter the template name"
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

export default GetVcTemplateList;
