from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from model import predict_top_crops
import requests
from babel.numbers import format_currency
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

model = joblib.load('src/backend/model.pkl')
label_enc_crop = joblib.load('src/backend/label_enc_crop.pkl')
label_enc_month = joblib.load('src/backend/label_enc_month.pkl')

df_seasonal = pd.read_csv('src/dataset/augmented_crop_data.csv')

def get_weather_data(api_key, city):
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {'q': city, 'appid': api_key, 'units': 'metric'}
    response = requests.get(base_url, params=params)
    weather_data = response.json()
    
    if response.status_code == 200:
        main = weather_data['main']
        return {
            'temp': main['temp'],
            'humidity': main['humidity'],
            'precip': weather_data.get('rain', {}).get('1h', 0)
        }
    else:
        logging.error(f"Error retrieving weather data: {weather_data.get('message', 'Unknown error')}")
        return None

@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    data = request.json
    city = data.get('city')
    month = data.get('month')
    area = data.get('area', 1)  # Default to 1 hectare if missing

    logging.debug(f"Received data: city={city}, month={month}, area={area}")
    
    if not city or not month:
        return jsonify({"error": "City and month are required"}), 400

    weather_api_key = "656df056e407fd93b840d048945a7bbf"
    weather_data = get_weather_data(weather_api_key, city)
    logging.debug(f"Weather Data: {weather_data}")

    if not weather_data:
        return jsonify({"error": "Could not retrieve weather data"}), 500

    temp, humidity, precip = weather_data['temp'], weather_data['humidity'], weather_data['precip']
    logging.debug(f"Extracted Weather Params: temp={temp}, humidity={humidity}, precip={precip}")
    
    if temp is None or humidity is None or precip is None:
        logging.error("Missing weather parameters, cannot proceed with prediction.")
        return jsonify({"error": "Weather data missing required fields"}), 500

    msp_api_url = "https://api.data.gov.in/resource/1832c7b4-82ef-4734-b2b4-c2e3a38a28d3?api-key=579b464db66ec23bdd000001440aa332acc6499b45b3a17340d20fe5&format=json"
    response = requests.get(msp_api_url)
    price_data = response.json()
    logging.debug(f"Price Data Response: {price_data}")
    
    if 'records' not in price_data:
        logging.error("Error retrieving price data: No 'records' found in response")
        return jsonify({"error": "Could not retrieve crop price data"}), 500

    crop_prices = {
        f"{record['commodity']} ({record['variety']})": record.get('_2023_24', 'N/A')
        for record in price_data['records']
    }
    logging.debug(f"Extracted Crop Prices: {crop_prices}")

    # Predict top 3 crops
    top_crops = predict_top_crops(temp, humidity, precip, month, crop_prices)
    logging.debug(f"Top Crops: {top_crops}")

    if not top_crops:
        logging.error("Model returned no crops!")
        return jsonify({"error": "Prediction failed. Model returned invalid values"}), 500
    
    # Manually set the price per quintal for Wheat to 2533.34
    for crop_data in top_crops:
        if crop_data["crop"] == "Wheat":
            crop_data["price_per_quintal"] = 2533.34

    # Process each crop
    results = []
    for crop_data in top_crops:
        crop = crop_data["crop"]
        yield_per_hectare = crop_data["yield_per_hectare"]
        price_per_quintal = crop_data["price_per_quintal"]
        total_yield = yield_per_hectare * area

        # Calculate revenue if price is available
        if price_per_quintal != 'N/A' and isinstance(price_per_quintal, (int, float)):
            total_revenue = yield_per_hectare * area * price_per_quintal
            formatted_revenue = format_currency(total_revenue, 'INR', locale='en_IN').replace('₹', '').strip()
        else:
            formatted_revenue = 'N/A'

        # Format yield
        try:
            formatted_yield = format_currency(yield_per_hectare, 'INR', locale='en_IN').replace('₹', '').strip()
        except Exception as e:
            logging.error(f"Error formatting currency: {e}")
            return jsonify({"error": "Error formatting currency values"}), 500

        results.append({
            "crop": crop,
            "yield_per_hectare": formatted_yield,
            "price_per_quintal": price_per_quintal,
            "total_yield": total_yield,
            "total_revenue": formatted_revenue,
        })

    return jsonify({
        "best_crop": results[0],
        "second_best_crop": results[1],
        "third_best_crop": results[2],
    })

if __name__ == '__main__':
    app.run(debug=True)