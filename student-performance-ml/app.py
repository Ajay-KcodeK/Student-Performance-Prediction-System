from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load('student_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    attendance = data.get('attendancePercentage', 0)
    test_score = data.get('averageTestScore', 0)
    behavior = data.get('behaviorScore', 0)

    prediction = model.predict([[attendance, test_score, behavior]])
    predicted_label = label_encoder.inverse_transform(prediction)

    return jsonify({'prediction': predicted_label[0]})

if __name__ == '__main__':
    app.run(debug=True)
