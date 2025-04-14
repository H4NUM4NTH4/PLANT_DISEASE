import { useState } from "react";
import CropSelector from "./CropSelector";
import ImageUploader from "./ImageUploader";
import ResultsSection from "./ResultsSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CropType = "rice" | "wheat" | "corn" | "potato" | "sugarcane";

const API_URL = "http://127.0.0.1:5000/predict";

const Analyzer = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleCropSelect = (crop: CropType) => {
    setSelectedCrop(crop);
    setAnalysisResult(null);
  };

  const handleImageSelect = (file: File) => {
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysisResult(null);
    } else {
      setImageFile(null);
      setSelectedImage(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedCrop || !imageFile) {
      toast({
        title: "Missing information",
        description: selectedCrop ? "Please upload an image" : "Please select a crop type",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("crop", selectedCrop);
    formData.append("image", imageFile);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setAnalysisResult(result);
        toast({
          title: result.isHealthy ? "Healthy Crop" : `Disease Detected`,
          description: result.isHealthy
            ? "Your crop appears to be healthy."
            : `${result.disease} detected with ${result.confidence}% confidence.`,
          variant: result.isHealthy ? "default" : "destructive",
        });
      } else {
        throw new Error(result.error || "Failed to analyze the image.");
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setSelectedImage(null);
    setImageFile(null);
    setSelectedCrop(null);
  };

  return (
    <div id="analyzer" className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          {!analysisResult ? (
            <div className="space-y-6">
              <CropSelector selectedCrop={selectedCrop} onSelectCrop={handleCropSelect} />

              {selectedCrop && (
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  isAnalyzing={isAnalyzing}
                />
              )}

              {selectedCrop && selectedImage && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-forest hover:bg-forest-dark dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <ResultsSection data={analysisResult} cropType={selectedCrop || ""} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;