function sendRequest() {
    const userInput = document.getElementById('userInput').value;
    const responseOutput = document.getElementById('responseOutput');

    // 清空之前的响应
    responseOutput.innerHTML = '';

    // 配置请求参数
    const requestData = {
        inputs: userInput,
        parameters: {
            repetition_penalty: 1.05,
            temperature: 0.3,
            top_k: 5,
            top_p: 0.85,
            max_new_tokens: 2048,
            do_sample: false,
            seed: 2023,
            details: true
        }
    };

    // 发送请求到后端
    fetch('http://{IP}:{port}/generate_stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.generated_text) {
            responseOutput.innerHTML = `<p>模型回复：${data.generated_text}</p>`;
        } else {
            responseOutput.innerHTML = `<p>模型未返回有效的回复。</p>`;
        }
    })
    .catch(error => {
        responseOutput.innerHTML = `<p>请求失败：${error}</p>`;
    });
}
