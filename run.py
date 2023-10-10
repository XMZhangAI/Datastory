import data_processing.data_wrangling  # This will run the data wrangling code - runs only once when the server starts.

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
