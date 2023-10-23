import pandas as pd
import os

# Last inn data
file_path = "data/raw/cru-x0.5_timeseries_tas_timeseries_annual_1901-2022_mean_historical_cru_ts4.07_mean.xlsx"
data = pd.read_excel(file_path)

# Vis de første radene i dataene for å forstå strukturen
print(data.head())


# get data in correct format
long_data = data.melt(
    id_vars=["code", "name"], var_name="Year", value_name="Temperature"
)

# clean year values
long_data["Year"] = long_data["Year"].str.split("-").str[0]

# convert year to int
long_data["Year"] = long_data["Year"].astype(int)

# Probably not necessary
norway_temp_data = long_data[long_data["code"] == "NOR"]

# drop unused features
norway_temp_data = norway_temp_data.drop(columns=["code", "name"])

# sanity test
print(norway_temp_data.head())


# Normalize specified columns using Value/Max Value
# antar at norway_data er DataFrame-navnet ditt
max_val = norway_temp_data["Temperature"].max()
min_val = norway_temp_data["Temperature"].min()

# Normaliserer Temperature-kolonnen
norway_temp_data["Normalized Temperature"] = (
    norway_temp_data["Temperature"] - min_val
) / (max_val - min_val)

print(norway_temp_data.head())

# drop unused features
norway_temp_data = norway_temp_data.drop(columns=["Temperature"])
print(norway_temp_data.head())

# Create a new filename and save as JSON
file_name = "pd_" + os.path.basename(
    "data/raw/cru-x0.5_timeseries_tas_timeseries_annual_1901-2022_mean_historical_cru_ts4.07_mean.xlsx"
).replace(".xlsx", ".json")
output_path = os.path.join("data/processed", file_name)
norway_temp_data.to_json(output_path, orient="records")
