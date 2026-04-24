import joblib
import pandas as pd

model = joblib.load("model.pkl")

input_data = pd.DataFrame([{
    "Education": "Bachelors",
    "Skills": "Python, Machine Learning",
    "Interests": "Data Science"
}])

try:
    pred = model.predict(input_data)[0]
    print("Prediction:", pred)
except Exception as e:
    print("Error:", repr(e))
