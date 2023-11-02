import os
import pandas as pd


def load_data(file_name):
    file_path = os.path.join("data/processed", file_name)
    return pd.read_json(file_path, orient="records")


# ------------------- Cached data -------------------#
# energy data
energy_data = load_data("pd_modern-renewable-energy-consumption.json")

# temperature data
temp_data = load_data(
    "pd_cru-x0.5_timeseries_tas_timeseries_annual_1901-2022_mean_historical_cru_ts4.07_mean.json"
)

# co2 data
co2_data = load_data("pd_co2-by-source.json")

# forest data
forest_data = load_data("pd_forest-area-km.json")
