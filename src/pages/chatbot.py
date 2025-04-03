from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import fitz
import time
import base64

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

OPENAI_API_KEY = ""
client = openai.OpenAI(api_key=OPENAI_API_KEY)

file_path = "src/backend/chatbot_ignatius.pdf"
with fitz.open(file_path) as pdf:
    pdf_text = "\n".join(page.get_text("text") for page in pdf)

pdf_text = pdf_text[:3000]

assistant = client.beta.assistants.create(
    name="Agriwise",
    instructions="You are an agricultural assistant named AgriWise. Provide clear, concise, and practical responses to user queries related to farming, crop management, livestock, weather, and agricultural best practices. Focus on delivering actionable advice and avoid unnecessary details. Use the provided resources or data to assist with specific agricultural questions, such as crop recommendations, pest control, soil health, and irrigation techniques. Always aim to support farmers and agricultural enthusiasts with accurate, easy-to-understand information. Keep your responses short and to the point, not exceeding 3 sentences.",
    model="gpt-4-turbo"
)
assistant_id = assistant.id

thread = client.beta.threads.create()
thread_id = thread.id

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    is_voice = request.json.get('is_voice', False)
    selected_language = request.json.get('language', 'en')  # Get the selected language from the frontend

    # Generate a prompt for GPT to respond in the selected language and keep the response short
    full_prompt = f"Document:\n{pdf_text}\n\nUser: {user_message}\n\nRespond in {selected_language}. Keep your response short and to the point, not exceeding 3 sentences."

    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=full_prompt
    )

    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id
    )

    while True:
        run_status = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
        if run_status.status == "completed":
            break
        time.sleep(1)

    messages = client.beta.threads.messages.list(thread_id=thread_id)
    response_text = messages.data[0].content[0].text.value

    if is_voice:
        # Generate speech in the selected language
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=response_text
        )
        audio_base64 = base64.b64encode(response.content).decode('utf-8')
        return jsonify({'response': response_text, 'audio': audio_base64, 'language': selected_language})
    else:
        return jsonify({'response': response_text, 'language': selected_language})

if __name__ == '__main__':
    app.run(debug=True)