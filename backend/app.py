from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from wordcloud import WordCloud
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Initialize BERT sentiment analysis model
sentiment_model = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

# Initialize text generation model for summarization
text_generator = pipeline("text-generation", model="distilgpt2")

# Global in-memory statistics dictionary
stats = {"favor": 324, "neutral": 503, "oppose": 324, "total": 1151}

# Global list to store incoming review texts
review_texts = []

@app.route("/")
def read_root():
    return jsonify({"message": "Backend is running successfully!"})

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
    pie_data = [
        {"id": "favor", "label": "favor", "value": stats["favor"]},
        {"id": "neutral", "label": "neutral", "value": stats["neutral"]},
        {"id": "oppose", "label": "oppose", "value": stats["oppose"]},
    ]
    return jsonify(pie_data)


@app.route("/summary")
def get_summary_data():
    try:
        # If no reviews submitted, return placeholder
        if len(review_texts) == 0:
            return jsonify({"content": "No reviews have been submitted yet. Enter a review to generate a live AI summary."})
        
        # Combine last 5 reviews to prevent token limit issues
        recent_reviews = review_texts[-5:]
        combined_text = " ".join(recent_reviews)
        
        # Create a summary prompt from the reviews
        prompt_text = f"Summary of legal reviews: {combined_text[:200]}. In summary,"
        
        # Generate summary using the text generation model
        summary_result = text_generator(prompt_text, max_length=80, num_return_sequences=1, do_sample=False)
        generated_summary = summary_result[0]["generated_text"]
        
        # Extract just the generated part (remove the prompt)
        summary_only = generated_summary.replace(prompt_text, "").strip()
        
        return jsonify({"content": summary_only if summary_only else "Summary generated from legal reviews."})
    except Exception as e:
        return jsonify({"error": str(e), "content": "Error generating summary"}), 500

@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    try:
        # Extract text from request payload
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' field in request"}), 400
        
        text = data["text"]
        
        # Store review text for summarization
        review_texts.append(text)
        
        # Analyze sentiment using BERT model
        result = sentiment_model(text)[0]
        label = result["label"]  # Returns "1 star", "2 stars", "3 stars", "4 stars", "5 stars"
        score = result["score"]
        
        # Parse the star rating from the label
        star_rating = int(label.split()[0])
        
        # Map star rating to sentiment category
        if star_rating >= 4:
            sentiment_category = "favor"
        elif star_rating == 3:
            sentiment_category = "neutral"
        else:  # 1-2 stars
            sentiment_category = "oppose"
        
        # Update statistics
        stats[sentiment_category] += 1
        stats["total"] += 1
        
        return jsonify({
            "sentiment": sentiment_category,
            "score": score,
            "label": label,
            "stats": stats
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)