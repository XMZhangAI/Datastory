import pandas as pd

# import os

# print("Current working directory:", os.getcwd())
# load in data
filepath = "data/modern-renewable-energy-consumption.csv"
data = pd.read_csv(filepath)
# process data
processed_data = data[data["Entity"] == "Norway"]
melted_data = pd.melt(
    processed_data,
    id_vars=["Year"],
    value_vars=[
        "Other renewables (including geothermal and biomass) electricity generation - TWh",
        "Solar generation - TWh",
        "Wind generation - TWh",
        "Hydro generation - TWh",
    ],
    var_name="Energy Type",
    value_name="TWh",
)

# # store processed data
# melted_data.to_csv(
#     "data/processed_data_modern-renewable-energy-consumption.csv", index=False
# )

# store processed data as JSON
melted_data.to_json(
    "data/processed_data_modern-renewable-energy-consumption.json",
    orient="records",
    lines=True,
)
