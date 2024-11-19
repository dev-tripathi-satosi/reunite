from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

DATA_FILE = "assets/additional/data.json"

os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

@app.route('/',methods=('GET', 'POST'))
def main():
  return render_template("index.html")



@app.route('/submit-form', methods=['POST'])
def submit_form():
    form_data = request.json

    # Load existing data
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = []
    else:
        data = []

    # Add new form data
    data.append(form_data)

    # Save updated data
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

    return jsonify({"message": "Form data saved successfully!"}), 200

# Endpoint to fetch all data
@app.route('/get-data', methods=['GET'])
def get_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = []
    else:
        data = []

    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
