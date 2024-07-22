

from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
import os

app = Flask(__name__)
CORS(app)

# Set up HuggingFace API token
os.environ["HUGGINGFACEHUB_API_TOKEN"] = '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'  # replace with your actual token

# Define the template and LLM chain
template = """Question: {question}\n\nAnswer: Let's think step by step."""
prompt = PromptTemplate.from_template(template)
repo_id = "mistralai/Mistral-7B-Instruct-v0.2"

llm = HuggingFaceEndpoint(
    repo_id=repo_id, temperature=0.5, token=os.getenv("HUGGINGFACEHUB_API_TOKEN"), model_kwargs={"max_length": 128}
)
llm_chain = LLMChain(prompt=prompt, llm=llm)

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.json.get("message")
    response = llm_chain.run(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
