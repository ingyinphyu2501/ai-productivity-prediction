from flask import Flask, render_template, request, jsonify
import os
import joblib

app = Flask(__name__)

MODEL_PATH = os.path.join(app.root_path, "models", "random_forest_model.pkl")
rf_model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

@app.route('/')
def home():
    return render_template('index.html', active='home')

@app.route('/descriptive')
def descriptive():
    return render_template('descriptive.html', active='descriptive')

@app.route('/preprocessing')
def preprocessing():
    return render_template('preprocessing.html', active='preprocessing')

@app.route('/association-rules')
def association_rules():
    return render_template('association_rules.html', active='association_rules')

@app.route('/model')
def model():
    return render_template('model.html', active='model')

@app.route('/evaluation')
def evaluation():
    return render_template('evaluation.html', active='evaluation')

@app.route('/api/predict', methods=['POST'])
def predict():
    if rf_model is None:
        return jsonify({'error': 'Model file not found.'}), 500

    try:
        import pandas as pd

        data = request.get_json()
        input_data = pd.DataFrame([data])

        prediction = rf_model.predict(input_data)[0]
        probabilities = rf_model.predict_proba(input_data)[0]

        return jsonify({
            'class': int(prediction),
            'probabilities': [float(p) for p in probabilities]
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)