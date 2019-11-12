import pickle
import json
with open('./pickles/model.pickle', 'rb') as file:
    model_dict = pickle.load(file)

print("Please Enter the sentence. ")
sentence = input().strip()
sentence = [sentence]
input_to_model = model_dict["transform"].transform(sentence)
result = {}

for key in model_dict["models"]:
    model = model_dict["models"][key]
    result[key] = int(model.predict(input_to_model)[0])

print(json.dumps(result, indent=4))