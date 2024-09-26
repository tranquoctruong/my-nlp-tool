document.getElementById('url-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const urlInput = document.getElementById('url').value.trim();

    // Validate the URL input
    if (!urlInput) {
        alert("URL cannot be blank.");
        return;
    }

    // If valid, proceed to analyze
    analyzeURL(urlInput);
});

async function analyzeURL(text) {
    let response;
    try {
        response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        document.getElementById('results').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('results').innerText = 'Error: ' + error.message;
    }
    const data = await response.json();
    document.getElementById('results').innerText = JSON.stringify(data, null, 2);
}