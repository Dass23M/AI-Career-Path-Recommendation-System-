def preprocess_input(data):

    return {
        "education": data.get("education", ""),
        "skills": data.get("skills", []),
        "interests": data.get("interests", []),
        "experienceLevel": data.get("experienceLevel", ""),
    }
