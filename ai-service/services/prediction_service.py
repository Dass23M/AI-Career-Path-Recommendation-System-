from services.model_loader import load_model
from utils.preprocess import preprocess_input

model = load_model()

def predict_career(data):

    processed_data = preprocess_input(data)

    # Fake prediction logic until model ready
    if "python" in processed_data["skills"]:
        prediction = "Data Scientist"
        confidence = 0.88
    else:
        prediction = "Software Developer"
        confidence = 0.81

    return {
        "predicted_career": prediction,
        "confidence": confidence
    }
