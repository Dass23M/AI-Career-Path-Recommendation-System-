import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score

# ========================
# PATHS (relative to this script)
# ========================

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(SCRIPT_DIR, "dataset.csv")
MODEL_OUTPUT_PATH = os.path.join(SCRIPT_DIR, "..", "model.pkl")

# ========================
# LOAD DATA
# ========================

df = pd.read_csv(DATASET_PATH)

print(f"Dataset loaded: {len(df)} rows, {df['Recommended_Career'].nunique()} unique careers")

# Target
y = df["Recommended_Career"]

# Features — Age removed; only Education, Skills, Interests
X = df[["Education", "Skills", "Interests"]]

# ========================
# FEATURE PIPELINE
# ========================

categorical_features = ["Education"]
text_features_skills = "Skills"
text_features_interests = "Interests"

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ("skills", TfidfVectorizer(), text_features_skills),
        ("interests", TfidfVectorizer(), text_features_interests),
    ]
)

# ========================
# MODEL PIPELINE
# ========================

pipeline = Pipeline([
    ("preprocess", preprocessor),
    ("model", RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=42
    ))
])

# ========================
# TRAIN / EVALUATE
# ========================

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"[OK] Test Accuracy: {acc * 100:.2f}%")

# ========================
# SAVE
# ========================

joblib.dump(pipeline, MODEL_OUTPUT_PATH)
print(f"[OK] Model trained and saved to {MODEL_OUTPUT_PATH}")
