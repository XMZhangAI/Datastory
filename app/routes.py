from flask import render_template, jsonify, Blueprint
import pandas as pd
import os

# initializing blueprint
main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def home():
    return render_template("index.html")


@main_bp.route("/api/data")
def get_data():
    # Folder path
    folder_path = "data/processed"

    # Get all .json files in the processed data folder
    files = [f for f in os.listdir(folder_path) if f.endswith(".json")]

    # Load and concatenate all datasets
    data_frames = []
    for file in files:
        file_path = os.path.join(folder_path, file)
        data_frames.append(pd.read_json(file_path, orient="records"))

    # Merge dataframes on 'Year', filling missing values with 0
    merged_data = data_frames[0]
    for df in data_frames[1:]:
        merged_data = pd.merge(merged_data, df, on="Year", how="outer")

    merged_data = merged_data.fillna(0)

    # Save merged data for frontend use
    frontend_folder_path = "data/frontend"
    merged_data.to_json(
        os.path.join(frontend_folder_path, "merged_data.json"), orient="records"
    )

    # Send data to frontend
    return jsonify(merged_data.to_dict(orient="records"))
