import requests

url = "http://localhost:5001/predict"
data = {
    "education": "Bachelors",
    "skills": ["Python", "Machine Learning"],
    "interests": ["Data Science"]
}

response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
