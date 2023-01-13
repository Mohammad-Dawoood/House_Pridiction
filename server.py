from flask import Flask, request, jsonify
import util
app = Flask(__name__)

@app.route('/get_city_names')
def get_city_names():
    response = jsonify({
        'city': util.get_city_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_area_names')
def get_area_names():
    response = jsonify({
        'city': util.get_area_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price',methods=['POST'])
def predict_home_price():
    sqft = float(request.form['sqft'])
    city = request.form['city']
    area = request.form['area']
    bhk = int(request.form['bhk'])
    park = int(request.form['park'])
    ac = int(request.form['ac'])
    wifi = int(request.form['wifi'])
    lift = int(request.form['lift'])
    security = int(request.form['security'])

    response = jsonify({
        'estimated_price': util.get_predicted_price(city,area,sqft,bhk,park,ac,wifi,lift,security)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    print('starting python flask server for home price prediction...')
    util.load_saved_artifacts()
    app.run()
