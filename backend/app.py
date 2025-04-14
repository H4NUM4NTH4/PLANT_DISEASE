from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import preprocess_image, load_model, predict_disease
from disease_data import get_disease_info
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024
app.config['UPLOAD_FOLDER'] = 'uploads'

# Class names must match training order exactly
CLASS_NAMES = {
    "rice": ["Rice___Brown_Spot", "Rice___Healthy", "Rice___Leaf_Blast", "Rice___Neck_Blast"],
    "wheat": ["Wheat___Brown_Rust", "Wheat___Healthy", "Wheat___Yellow_Rust"],
    "corn": ["Corn___Common_Rust", "Corn___Healthy", "Corn___Gray_Leaf_Spot", "Corn___Northern_Leaf_Blight"],
    "potato": ["Potato___Early_Blight", "Potato___Healthy", "Potato___Late_Blight"],
    "sugarcane": ["Sugarcane___Bacterial_Blight", "Sugarcane___Healthy", "Sugarcane___Red_Rot"]
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files or 'crop' not in request.form:
        return jsonify({"error": "Missing image file or crop type"}), 400
    
    try:
        # Get inputs
        image_file = request.files['image']
        crop_type = request.form['crop']
        
        if crop_type not in CLASS_NAMES:
            return jsonify({"error": "Invalid crop type"}), 400
        
        # Preprocess image
        image_bytes = image_file.read()
        image_array = preprocess_image(image_bytes)
        
        # Load model and predict
        model = load_model(crop_type)
        class_idx, confidence = predict_disease(model, image_array)
        
        # Process results
        predicted_class = CLASS_NAMES[crop_type][class_idx]
        is_healthy = "Healthy" in predicted_class
        
        if is_healthy:
            response = {
                "isHealthy": True,
                "confidence": round(confidence * 100, 2),
                "description": "No signs of disease detected. Your plant appears healthy.",
                "treatment": [],
                "prevention": [
                    "Continue regular plant care practices",
                    "Monitor for early signs of disease",
                    "Maintain proper spacing between plants"
                ]
            }
        else:
            # Format disease name for display and data lookup
            disease_key = predicted_class
            display_name = predicted_class.split('___')[-1].replace('_', ' ')
            
            disease_info = get_disease_info(display_name, crop_type)
            response = {
                "isHealthy": False,
                "disease": display_name,
                "confidence": round(confidence * 100, 2),
                "description": disease_info["description"],
                "treatment": disease_info["treatment"],
                "prevention": disease_info["prevention"],
                "organic_pesticides": disease_info["organic_pesticides"]
            }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)