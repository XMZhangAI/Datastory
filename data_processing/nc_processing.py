import xarray as xr

# data from: https://surfobs.climate.copernicus.eu/dataaccess/access_eobs.php#datafiles

# open file
data = xr.open_dataset(
    "data/raw/tg_ens_mean_0.25deg_reg_v27.0e.nc"
)  # had to delete since it took to much space

# show features
print(data.data_vars)

# show info
print(data.values())

# Conclusion
# To get the temperature data in this way would be really complicated. I have sent a mail to metrologisk institutt to see if they can help me.
