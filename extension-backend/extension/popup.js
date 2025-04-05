document.getElementById('optimizeBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value.trim();
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copyBtn');

  if (!prompt) return;

  spinner.style.display = 'block';
  output.style.display = 'none';
  copyBtn.style.display = 'none';
  output.textContent = '';

  try {
    const res = await fetch("http://localhost:8000/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    output.textContent = data.optimized_prompt || "Something went wrong.";
    output.style.display = 'block';
    copyBtn.style.display = 'inline-block';
  } catch (err) {
    output.textContent = "Error connecting to backend.";
    output.style.display = 'block';
  } finally {
    spinner.style.display = 'none';
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('output').textContent;
  navigator.clipboard.writeText(text);

  // Add "copied" class to the button for feedback
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.classList.add('copied');

  // Remove the "copied" class after 2 seconds
  setTimeout(() => {
    copyBtn.classList.remove('copied');
  }, 2000);
});
