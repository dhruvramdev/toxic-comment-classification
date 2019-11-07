from flask import Flask, request
import pickle

with open('../pickles/model.pickle', 'rb') as file:
    model_dict = pickle.load(file)
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/detect', methods=['POST'])
def detect():
    try :
        sentence = request.json
        sentence = sentence.get('sentence', "")
        sentence = [sentence]
        input_to_model = model_dict["transform"].transform(sentence)
        result = {}

        for key in model_dict["models"]:
            model = model_dict["models"][key]
            result[key] = int(model.predict(input_to_model)[0])

        print(result)
        print(type(result['toxic']))

        return {
            "success": True,
            "result": result
        }
    except Exception as err:
        print(err)
        return {
            "success" : False
        }