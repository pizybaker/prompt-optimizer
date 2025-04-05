document.getElementById('optimize').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const resDiv = document.getElementById('result');
    resDiv.innerText = 'Optimizing...';
  
    try {
      const res = await fetch('http://localhost:8000/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      resDiv.innerText = data.optimized_prompt;
    } catch (err) {
      resDiv.innerText = 'Error contacting optimizer.';
    }
  });
  