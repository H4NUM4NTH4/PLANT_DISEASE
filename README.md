# Plant Disease Detection System

A full-stack application that uses AI to detect plant diseases from images. The system provides real-time disease detection, treatment recommendations, and prevention measures in multiple languages.

## Features

- 🌱 **AI-Powered Disease Detection**: Uses advanced machine learning to identify plant diseases
- 🌐 **Multilingual Support**: Available in English, Hindi, and Kannada
- 🎨 **Dark/Light Mode**: User-friendly interface with theme support
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📊 **Detailed Reports**: Provides comprehensive disease information and treatment recommendations
- 🔒 **Privacy-Focused**: All processing happens securely in the cloud

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- React I18next for translations
- Vite for build tooling

### Backend
- Python
- FastAPI
- TensorFlow for ML model
- MongoDB for database

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/H4NUM4NTH4/PLANT_DISEASE.git
cd PLANT_DISEASE
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:
Create `.env` files in both frontend and backend directories with necessary configurations.

### Running Locally

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

The application can be deployed using:
- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Plant disease dataset providers
- Open-source community
- Contributors and maintainers

## Contact

For any queries or support, please open an issue in the repository.