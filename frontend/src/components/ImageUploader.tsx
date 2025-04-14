import { useState, useRef, useEffect } from "react";
import { UploadCloud, X, Image as ImageIcon, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  isAnalyzing: boolean;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ImageUploader = ({ onImageSelect, selectedImage, isAnalyzing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Start camera when showCamera is true
  useEffect(() => {
    if (showCamera) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showCamera]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      toast({
        title: t('upload.cameraError.title'),
        description: t('upload.cameraError.description'),
        variant: "destructive",
      });
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            onImageSelect(file);
            setShowCamera(false);
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast({
        title: t('upload.invalidFile.title'),
        description: t('upload.invalidFile.description'),
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: t('upload.fileTooLarge.title'),
        description: t('upload.fileTooLarge.description'),
        variant: "destructive",
      });
      return;
    }

    onImageSelect(file);
  };

  const handleRemoveImage = () => {
    onImageSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleCamera = () => {
    setShowCamera(!showCamera);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-forest dark:text-green-400 mb-4 text-center">
        {t('upload.title')}
      </h2>

      {showCamera ? (
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                onClick={toggleCamera}
              >
                {t('upload.cancel')}
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={captureImage}
              >
                <Camera className="mr-2 h-4 w-4" />
                {t('upload.capture')}
              </Button>
            </div>
          </div>
        </div>
      ) : !selectedImage ? (
        <div
          className={`border-2 border-dashed ${
            isDragging 
              ? "border-forest bg-forest/5 dark:border-green-400 dark:bg-green-900/20" 
              : "border-gray-300 dark:border-gray-600"
          } rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
          <UploadCloud className="h-10 w-10 mb-2 text-forest dark:text-green-400 opacity-70" />
          <p className="text-forest-dark dark:text-green-300 font-medium text-sm">
            {t('upload.dragDrop')}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t('upload.or')}</p>
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-forest text-forest hover:bg-forest/5 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              {t('upload.browseFiles')}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-forest text-forest hover:bg-forest/5 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
              onClick={(e) => {
                e.stopPropagation();
                toggleCamera();
              }}
            >
              <Camera className="mr-2 h-4 w-4" />
              {t('upload.takePhoto')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="relative">
            <img
              src={selectedImage}
              alt={t('upload.selectedImageAlt')}
              className="w-full h-56 object-cover"
            />
            {!isAnalyzing && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <X className="h-4 w-4 text-red-500 dark:text-red-400" />
              </button>
            )}
          </div>
          
          {!isAnalyzing && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-forest text-forest hover:bg-forest/5 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 flex-1"
                onClick={triggerFileInput}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {t('upload.changeImage')}
              </Button>
              <Button
                size="sm"
                className="bg-forest hover:bg-forest-dark dark:bg-green-700 dark:hover:bg-green-800 text-white flex-1"
                onClick={() => {
                  handleRemoveImage();
                  toggleCamera();
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                {t('upload.retakePhoto')}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;