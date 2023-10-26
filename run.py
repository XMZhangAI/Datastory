# This will run the data wrangling code from pur data sources - runs only once when the flask app is initiliazed
import data_processing.data_wrangling  # ourworldindata
import data_processing.wb_processing  # World bank data

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
