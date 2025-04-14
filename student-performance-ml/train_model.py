import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Dummy data
data = {
    'attendance': [90, 75, 60, 85, 95, 40, 65, 55, 80, 70],
    'test_score': [88, 70, 60, 85, 90, 45, 65, 50, 75, 68],
    'behavior': [9, 7, 6, 8, 10, 4, 6, 5, 8, 6],
    'performance': ['High', 'Medium', 'Low', 'High', 'High', 'Low', 'Medium', 'Low', 'High', 'Medium']
}

df = pd.DataFrame(data)

X = df[['attendance', 'test_score', 'behavior']]
y = df['performance']

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

joblib.dump(model, 'student_model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')
print("Model trained and saved!")
