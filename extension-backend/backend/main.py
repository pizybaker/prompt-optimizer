from fastapi import FastAPI
from pydantic import BaseModel
import subprocess

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.post("/optimize")
async def optimize_prompt(request: PromptRequest):
    try:
        # Concise system prompt with clear formatting
        full_prompt = (
            "Rewrite the following user prompt to be clearer, more direct, and suitable for an AI assistant. "
            "Only return the rewritten prompt.\n\n"
            f"Original Prompt:\n{request.prompt.strip()}\n\n"
            "Rewritten Prompt:\n"
        )

        result = subprocess.run(
            ["ollama", "run", "mistral"],
            input=full_prompt.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=60
        )

        output = result.stdout.decode().strip()

        return {"optimized_prompt": output}

    except subprocess.TimeoutExpired:
        return {"error": "The model took too long to respond. Try again."}
    except Exception as e:
        return {"error": str(e)}
