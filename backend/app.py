from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from wordcloud import WordCloud

app = Flask(__name__)
CORS(app)
@app.route("/wordcloud")
def get_wordcloud_data():
    try:
        df = pd.read_csv("source_text.csv")
        full_text = " ".join(text for text in df.text)

        wordcloud = WordCloud(
            width=800,
            height=400,
            background_color=None,
            mode="RGBA",
            stopwords=set(["the", "a", "for", "of", "in", "is", "to", "was"])
        ).generate(full_text)

        word_freq = wordcloud.words_
        formatted_data = [{"text": word, "value": int(freq * 100)} for word, freq in word_freq.items()]
        
        return jsonify(formatted_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def read_root():
    return jsonify({"message": "Backend is running successfully!"})

@app.route("/team")
def get_team():
    mock_data = [
        {"id": 1, "name": "Jon Snow", "email": "jonsnow@gmail.com", "age": 35, "phone": "(665)121-5454", "access": "admin"},
        {"id": 2, "name": "Cersei Lannister", "email": "cerseilannister@gmail.com", "age": 42, "phone": "(421)314-2288", "access": "manager"},
    ]
    return jsonify(mock_data)

@app.route("/contacts")
def get_contacts():
    mock_data = [
        {"id": 1, "address": "PIL regarding environmental clearances..."},
        {"id": 2, "address": "Under investigation by SEBI..."},
    ]
    return jsonify(mock_data)

@app.route("/pie")
def get_pie_data():
    mock_data = [
        {"id": "favor", "label": "favor", "value": 324},
        {"id": "neutral", "label": "neutral", "value": 503},
        {"id": "oppose", "label": "oppose", "value": 324},
    ]
    return jsonify(mock_data)


@app.route("/summary")
def get_summary_data():
    summary_text = "In a landmark move to modernize India's criminal justice system, the Parliament passed three new bills in late 2023 to replace colonial-era laws. The Bharatiya Nyaya Sanhita (BNS) will replace the Indian Penal Code (IPC) of 1860, the Bharatiya Nagarik Suraksha Sanhita (BNSS) will take the place of the Criminal Procedure Code (CrPC) of 1973, and the Bharatiya Sakshya Adhiniyam (BSA) will succeed the Indian Evidence Act of 1872. Key changes include the formal repeal of sedition, the introduction of community service as a punishment for petty crimes, and a clear definition of terrorism. The new laws also emphasize the use of technology, mandating audio-visual recording for searches and seizures and allowing for the electronic filing of FIRs, with the stated aim of improving the speed and transparency of the legal process."
    return jsonify({"content": summary_text})

if __name__ == '__main__':
    app.run(port=8000, debug=True)