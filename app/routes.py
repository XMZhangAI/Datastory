from flask import render_template, jsonify, Blueprint
import pandas as pd

# initilizing blueprint
main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def home():
    return render_template("index.html")


@main_bp.route("/api/data")
def get_data():
    # Load the pre-processed data
    data_re_energy = pd.read_json(
        "data/processed_data_modern-renewable-energy-consumption.json", orient="records"
    )

    # Send data to frontend
    return jsonify(data_re_energy.to_dict(orient="records"))
