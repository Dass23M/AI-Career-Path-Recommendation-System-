import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer

# ========================
# LOAD DATA
# ========================

df = pd.read_csv("dataset.csv")

# Target
y = df["Recommended_Career"]

# Features
X = df[["Age", "Education", "Skills", "Interests"]]

# ========================
# FEATURE PIPELINE
# ========================

from sklearn.pipeline import FeatureUnion
from sklearn.preprocessing import FunctionTransformer

# Separate columns
numeric_features = ["Age"]
categorical_features = ["Education"]
text_features_skills = "Skills"
text_features_interests = "Interests"

preprocessor = ColumnTransformer(
    transformers=[
        ("num", "passthrough", numeric_features),
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
    ("model", RandomForestClassifier(n_estimators=200))
])

# ========================
# TRAIN
# ========================

pipeline.fit(X, y)

# ========================
# SAVE
# ========================

joblib.dump(pipeline, "../model.pkl")

print("✅ Model trained and saved")
