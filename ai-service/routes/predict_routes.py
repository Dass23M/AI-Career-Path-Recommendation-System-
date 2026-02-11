from flask import Blueprint, request, jsonify
from services.prediction_service import predict_career

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/", methods=["POST"])
def predict():

    data = request.json

    result = predict_career(data)

    return jsonify(result)
