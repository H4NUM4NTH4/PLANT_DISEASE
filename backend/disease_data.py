DISEASE_DATA = {
    "Rice___Brown_Spot": {
        "description": "Brown lesions on leaves, reducing grain filling and leading to poor yield.",
        "prevention": ["Use nitrogen fertilizer correctly", "Avoid prolonged leaf wetness"],
        "treatment": ["Use azoxystrobin-based fungicides", "Apply potassium fertilizers"],
        "organic_pesticides": ["Neem seed extract", "Trichoderma-based biofungicide"]
    },
    "Rice___Leaf_Blast": {
        "description": "Fungal infection causing spindle-shaped lesions, leading to leaf collapse.",
        "prevention": ["Maintain optimal plant spacing", "Apply silicon fertilizers"],
        "treatment": ["Use tricyclazole fungicides", "Drain flooded fields"],
        "organic_pesticides": ["Bacillus subtilis spray", "Garlic-chili extract"]
    },
    "Rice___Neck_Blast": {
        "description": "Affects rice panicles, causing them to turn black and dry, leading to yield loss.",
        "prevention": ["Use balanced fertilization", "Avoid excessive nitrogen"],
        "treatment": ["Apply tricyclazole fungicides", "Remove infected panicles"],
        "organic_pesticides": ["Neem cake extract", "Asafoetida-based spray"]
    },
    "Wheat___Brown_Rust": {
        "description": "A fungal disease causing reddish-brown pustules on wheat leaves, reducing grain quality.",
        "prevention": ["Use resistant wheat varieties", "Apply balanced fertilizers"],
        "treatment": ["Spray propiconazole fungicide", "Increase potassium levels"],
        "organic_pesticides": ["Sulfur dust", "Garlic oil solution"]
    },
    "Wheat___Yellow_Rust": {
        "description": "Yellowish pustules on wheat leaves leading to reduced photosynthesis and yield loss.",
        "prevention": ["Avoid late sowing", "Ensure proper plant nutrition"],
        "treatment": ["Use tebuconazole fungicides", "Apply foliar sulfur sprays"],
        "organic_pesticides": ["Bordeaux mixture", "Neem seed oil"]
    },
    "Corn___Common_Rust": {
        "description": "A fungal disease causing orange to brown pustules on leaves, reducing photosynthesis.",
        "prevention": ["Plant resistant varieties", "Use proper crop rotation", "Avoid overhead irrigation"],
        "treatment": ["Apply fungicides like mancozeb", "Remove infected plant debris"],
        "organic_pesticides": ["Neem oil spray", "Copper-based fungicides"]
    },
    "Corn___Gray_Leaf_Spot": {
        "description": "Grayish lesions on leaves that expand and merge, leading to reduced crop yield.",
        "prevention": ["Ensure good air circulation", "Rotate crops regularly"],
        "treatment": ["Use foliar fungicides", "Increase nitrogen levels moderately"],
        "organic_pesticides": ["Baking soda solution", "Garlic oil spray"]
    },
    "Corn___Northern_Leaf_Blight": {
        "description": "A fungal disease causing elongated grayish lesions on corn leaves, reducing yield.",
        "prevention": ["Plant resistant hybrids", "Avoid excessive nitrogen use"],
        "treatment": ["Use triazole-based fungicides", "Destroy infected leaves"],
        "organic_pesticides": ["Neem extract spray", "Bordeaux mixture"]
    },
    "Potato___Early_Blight": {
        "description": "Dark concentric spots on leaves that can spread and cause defoliation.",
        "prevention": ["Use certified disease-free seeds", "Ensure proper drainage"],
        "treatment": ["Apply chlorothalonil fungicide", "Remove infected leaves"],
        "organic_pesticides": ["Compost tea spray", "Copper sulfate"]
    },
    "Potato___Late_Blight": {
        "description": "A severe fungal disease causing water-soaked lesions, leading to crop destruction.",
        "prevention": ["Rotate potato crops", "Plant resistant varieties"],
        "treatment": ["Use metalaxyl-based fungicides", "Destroy infected tubers"],
        "organic_pesticides": ["Bordeaux mixture", "Neem oil"]
    },
    "Sugarcane___Bacterial_Blight": {
        "description": "Bacterial infection in sugarcane causing leaf streaks, reducing sugar production.",
        "prevention": ["Plant disease-free sugarcane", "Avoid overhead irrigation"],
        "treatment": ["Use copper bactericides", "Remove infected canes"],
        "organic_pesticides": ["Bacillus-based biopesticides", "Chitosan spray"]
    },
    "Sugarcane___Red_Rot": {
        "description": "A severe fungal disease in sugarcane causing reddish discoloration inside stems.",
        "prevention": ["Use resistant sugarcane varieties", "Avoid mechanical injuries"],
        "treatment": ["Apply lime sulfur solution", "Destroy infected canes"],
        "organic_pesticides": ["Neem leaf extract", "Fungus-based biocontrol agents"]
    }
}

def get_disease_info(disease_name: str, crop_type: str):
    """Get disease information based on disease name and crop type"""
    # Handle cases where disease_name might already include the crop prefix
    if disease_name.startswith(f"{crop_type.capitalize()}___"):
        key = disease_name
    else:
        key = f"{crop_type.capitalize()}___{disease_name.replace(' ', '_')}"
    
    return DISEASE_DATA.get(key, {
        "description": "No detailed information available for this disease.",
        "prevention": ["Consult local agricultural extension for specific advice"],
        "treatment": ["Use appropriate fungicides/pesticides for this crop"],
        "organic_pesticides": ["Neem oil can be used as a general organic treatment"]
    })