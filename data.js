let jsonData = '';

// Format JSON with custom color classes
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\d+)/g, function (match) {
        let cls = 'json-value';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-value';
        }
        return `<span class="${cls}">${match}</span>`;
    }).replace(/[{}[\]]/g, function (match) {
        return `<span class="json-brackets">${match}</span>`;
    });
}

document.getElementById('uploadButton').addEventListener('click', async () => {
    const url = 'https://exifreader.p.rapidapi.com/Exif';
    const fileInput = document.getElementById('fileInput');
    const data = new FormData();

    if (fileInput.files.length > 0) {
        data.append('file', fileInput.files[0]);

        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'f3ad3d8f02msh4cdebfc688d55ccp1b326fjsn765e45dc494c',
                'x-rapidapi-host': 'exifreader.p.rapidapi.com'
            },
            body: data
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            jsonData = JSON.stringify(result, null, 2);

            document.getElementById('resultContainer').innerHTML = `
                <div class="action-buttons">
                    <button id="copyButton">Copy</button>
                    <button id="downloadButton">Download</button>
                </div>
                <pre>${syntaxHighlight(result)}</pre>
            `;
            bindButtons();
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('resultContainer').textContent = 'An error occurred. Check the console for details.';
        }
    } else {
        document.getElementById('resultContainer').textContent = 'No file selected.';
    }
});

document.getElementById('emailButton').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value;
    const resultContainer = document.getElementById('resultContainer');

    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }

    // Construct the API URL with the provided email address
    const url = `https://mailok-email-validation.p.rapidapi.com/verify?email=${encodeURIComponent(email)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f3ad3d8f02msh4cdebfc688d55ccp1b326fjsn765e45dc494c',
            'x-rapidapi-host': 'mailok-email-validation.p.rapidapi.com'
        }
    };
    try {
        resultContainer.innerHTML = 'Validating email...';

        const response = await fetch(url, options);
        const result = await response.json();
        jsonData = JSON.stringify(result, null, 2);

        document.getElementById('resultContainer').innerHTML = `
                <div class="action-buttons">
                    <button id="copyButton">Copy</button>
                    <button id="downloadButton">Download</button>
                </div>
                <pre>${syntaxHighlight(result)}</pre>
            `;
        bindButtons();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultContainer').textContent = 'An error occurred. Check the console for details.';
    }

});
function bindButtons() {
    document.getElementById('copyButton')?.addEventListener('click', () => {
        navigator.clipboard.writeText(jsonData).then(() => {
            alert('JSON copied to clipboard!');
        });
    });

    document.getElementById('downloadButton')?.addEventListener('click', () => {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'metadata.json';
        link.click();
        URL.revokeObjectURL(url);
    });
}

bindButtons();
