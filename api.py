from fastapi import FastAPI
from pydantic import BaseModel
from sentiment_model import predict_sentiment

# Initialize FastAPI app
app = FastAPI(title="Sentiment Analysis API")

# Define request schema
class SentimentRequest(BaseModel):
    text: str

# API endpoint
@app.post("/predict")
def predict(req: SentimentRequest):
    sentiment = predict_sentiment(req.text)
    return {"text": req.text, "sentiment": sentiment}
