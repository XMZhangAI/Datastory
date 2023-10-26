import os
import pandas as pd


def load_data(file_name):
    file_path = os.path.join("data/processed", file_name)
    return pd.read_json(file_path, orient="records")


# ------------------- Cached data -------------------#
# energy data
wind_data = load_data("pd_Wind.json")

# temperature data
temp_data = load_data(
    "pd_cru-x0.5_timeseries_tas_timeseries_annual_1901-2022_mean_historical_cru_ts4.07_mean.json"
)

# co2 data
co2_data = load_data("pd_annual-co2-emissions-per-country.json")

# forest data
forest_data = load_data("pd_forest-area-km.json")
