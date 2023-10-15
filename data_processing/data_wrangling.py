import pandas as pd

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

# Replace long energy type names with shorter ones
energy_type_mapping = {
    "Other renewables (including geothermal and biomass) electricity generation - TWh": "Other Renewables",
    "Solar generation - TWh": "Solar",
    "Wind generation - TWh": "Wind",
    "Hydro generation - TWh": "Hydro",
}

melted_data["Energy Type"] = melted_data["Energy Type"].replace(energy_type_mapping)

# Rename columns
melted_data.columns = ["Year", "Type", "Value"]

# store processed data as JSON
melted_data.to_json(
    "data/processed_data_modern-renewable-energy-consumption.json", orient="records"
)
