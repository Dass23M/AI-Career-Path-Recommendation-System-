from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

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

        age = data.get("age")
        education = data.get("education")
        skills = data.get("skills")
        interests = data.get("interests")

        input_data = pd.DataFrame([{
            "Age": age,
            "Education": education,
            "Skills": skills,
            "Interests": interests
        }])

        prediction = model.predict(input_data)[0]

        return jsonify({
            "career": prediction
        })

    except Exception as e:
        print("Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(port=5001, debug=True)
