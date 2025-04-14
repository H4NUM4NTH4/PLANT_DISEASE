from PIL import Image
import numpy as np
import io

def preprocess_image(image_bytes, target_size=(224, 224)):
    """Preprocess the uploaded image for model prediction"""
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0
    return np.expand_dims(image_array, axis=0)

def load_model(crop_type: str):
    """Load the appropriate model based on crop type"""
    model_path = f"models/{crop_type}_disease_model.h5"  # Update path as needed
    try:
        from tensorflow.keras.models import load_model
        return load_model(model_path)
    except Exception as e:
        raise ValueError(f"Could not load model for {crop_type}: {str(e)}")

def predict_disease(model, image_array):
    """Make prediction using the loaded model"""
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions)
    confidence = np.max(predictions)
    return predicted_class, float(confidence)