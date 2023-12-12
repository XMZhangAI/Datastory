from flask import Blueprint, render_template, jsonify
from .data_loading import energy_data, temp_data, co2_data  # import data

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def home():
    return render_template("index.html")


@main_bp.route("/api/data/<string:data_type>")
def get_data(data_type):
    data_dict = {
        "energy": energy_data,
        "temperature": temp_data,
        "co2": co2_data,
    }
    data = data_dict.get(data_type)
    if data is not None:
        return jsonify(data.to_dict(orient="records"))
    else:
        return jsonify({"error": "Invalid data type"}), 400
