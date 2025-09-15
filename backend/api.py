from fastapi import FastAPI
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Define input schema
class PredictionInput(BaseModel):
    pickup_state: str
    pickup_city: str
    drop_state: str
    drop_city: str
    weight: float

# Example dummy model prediction function
def predict_emission(data: PredictionInput):
    # For now, just return a fake value
    return {
        "CO2_emission": round(data.weight * 2.5, 2),  # dummy formula
        "Cost_Rs": round(data.weight * 5.0, 2)        # dummy formula
    }

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Backend is running successfully!"}

# Prediction endpoint
@app.post("/predict")
def get_prediction(input_data: PredictionInput):
    prediction = predict_emission(input_data)
    return {"input": input_data, "prediction": prediction}
