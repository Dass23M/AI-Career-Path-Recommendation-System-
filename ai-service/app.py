from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

# =========================
# LOAD MODEL
# =========================

model = joblib.load("model.pkl")

# =========================
# HEALTH CHECK
# =========================

@app.route("/")
def home():
    return jsonify({"message": "AI Career Prediction Service Running"})

# =========================
# PREDICT API
# =========================

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        education = data.get("education")
        skills = data.get("skills")
        interests = data.get("interests")

        # Validate required fields
        if not education or not skills or not interests:
            return jsonify({"error": "Missing required fields: education, skills, interests"}), 400

        # Build input DataFrame matching training feature order
        input_data = pd.DataFrame([{
            "Education": education,
            "Skills": skills,
            "Interests": interests,
        }])

        prediction = model.predict(input_data)[0]

        return jsonify({
            "career": prediction
        })

    except Exception as e:
        logging.error(f"Prediction Error: {str(e)}", exc_info=True)
        return jsonify({"error": "An internal error occurred during prediction processing. Please try again later."}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
