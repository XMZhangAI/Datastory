import json
import pandas as pd
import os


def get_new_column_name(old_col_name, column_name_mapping):
    return (
        column_name_mapping.get(old_col_name, old_col_name)
        if column_name_mapping
        else old_col_name
    )


def process_data(
    file_path,
    y_columns,
    column_name_mapping=None,
    output_folder="data/processed",
):
    """
    Process, optionally melt, and normalize dataset, and save it as a JSON file.

    Parameters:
    - file_path (str): The path to the input CSV file.
    - y_columns (list of str): List of column names to be normalized.
    - output_folder (str, optional): The path to the folder where the output JSON file will be saved. Defaults to "data/processed".
    - value_vars (list of str, optional): List of column names that will be melted. Defaults to None.
    - var_name (str, optional): The name to assign to the 'variable' column after melting. Defaults to None.
    - value_mapping (dict, optional): A mapping from original values to desired values in the melted column. Defaults to None.

    Returns:
    - output_path (str): The path where the output JSON file is saved.
    """

    # Load the data
    data = pd.read_csv(file_path)

    # Select data for Norway
    norway_data = data[data["Entity"] == "Norway"].copy()

    # Drop unwanted columns
    norway_data = norway_data.drop(columns=["Entity", "Code"])

    # Replace NaN values with 0
    norway_data.fillna(0, inplace=True)

    # create an empty dict for processed data
    processed_data = {}

    # iterate through each row in the dataframe
    processed_data = {}
    for index, row in norway_data.iterrows():
        year = row["Year"]
        if year not in processed_data:
            processed_data[year] = {"Year": int(year)}
        for col in norway_data.columns:
            if col != "Year":
                # gets the new column name or uses the old one if none is given
                new_col_name = get_new_column_name(col, column_name_mapping)
                processed_data[year][new_col_name] = row[col]

    # Convert data to a list
    processed_data_list = list(processed_data.values())

    # Sort the data list by the 'Year' field
    processed_data_list.sort(key=lambda x: x["Year"])

    # Create a new filename and save as JSON
    file_name = "pd_" + os.path.basename(file_path).replace(".csv", ".json")
    output_path = os.path.join(output_folder, file_name)
    with open(output_path, "w") as f:
        json.dump(processed_data_list, f, indent=4)

    return output_path


# Preprocessing data

# -------------pd_3 set up-------------#


y_columns_3 = {
    "Other renewables (including geothermal and biomass) electricity generation - TWh",
    "Solar generation - TWh",
    "Wind generation - TWh",
    "Hydro generation - TWh",
}

column_name_mapping_3 = {
    "Other renewables (including geothermal and biomass) electricity generation - TWh": "Other Renewables",
    "Solar generation - TWh": "Solar",
    "Wind generation - TWh": "Wind",
    "Hydro generation - TWh": "Hydro",
}

pd_3 = process_data(
    "data/raw/modern-renewable-energy-consumption.csv",
    y_columns_3,
    column_name_mapping=column_name_mapping_3,
)

# -------------pd_4 set up-------------#

y_columns_4 = [
    "Annual CO₂ emissions from other industry",
    "Annual CO₂ emissions from flaring",
    "Annual CO₂ emissions from cement",
    "Annual CO₂ emissions from gas",
    "Annual CO₂ emissions from oil",
    "Annual CO₂ emissions from coal",
]

column_name_mapping_4 = {
    "Annual CO₂ emissions from other industry": "Other industry",
    "Annual CO₂ emissions from flaring": "Flaring",
    "Annual CO₂ emissions from cement": "Cement",
    "Annual CO₂ emissions from gas": "Gas",
    "Annual CO₂ emissions from oil": "Oil",
    "Annual CO₂ emissions from coal": "Coal",
}

pd_4 = process_data("data/raw/co2-by-source.csv", y_columns_4, column_name_mapping_4)
