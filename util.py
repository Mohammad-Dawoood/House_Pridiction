import json
import pickle
import numpy as np
import warnings
warnings.simplefilter('ignore')

__city = None
__area = None
__data_columns = None
__model = None

def get_predicted_price(city,area,sqft,bhk,park,ac,wifi,lift,security):
    try:
        city_index = __data_columns.index(city.lower())
    except:
        city_index = -1

    try:
        area_index = __data_columns.index(area.lower())
    except:
        area_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bhk
    x[2] = park
    x[3] = ac
    x[4] = wifi
    x[5] = lift
    x[6] = security
    if city_index >= 0:
        x[city_index] = 1
    if area_index >= 0:
        x[area_index] = 1
    return round(__model.predict([x])[0],2)

def get_city_names():
    return __city
def get_area_names():
    return __area


def load_saved_artifacts():
    print('Loading saved Artifacts... start')
    global __city
    global __area
    global __data_columns
    global __model

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __city = __data_columns[7:13]
        __area = __data_columns[13:]
    with open("./artifacts/indian_house_price_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    print('loading saved artifacts... done')

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_city_names())
    print(get_area_names())
    print("Banglore Price is : ",get_predicted_price('banglore','Amruthahalli',2000, 3,1,0,0,1,1))
    print("Chennai Price is : ",get_predicted_price('Chennai', 'Karapakkam', 2000, 2,0,0,0,0,0))
    print("Delhi Price is : ",get_predicted_price('Delhi', 'Mundka', 2000, 2,0,0,0,0,0))
    print("Hyderabad Price is : ",get_predicted_price('Hyderabad', 'Rajendra Nagar', 2000, 2,0,0,0,0,0))
    print("Mumbai Price is : ",get_predicted_price('Mumbai', 'Mira Road East', 2000, 2,0,0,0,0,0))
    print("Kolkata Price is : ",get_predicted_price('Kolkata', 'New Town', 2000, 3,0,0,0,0,0))

