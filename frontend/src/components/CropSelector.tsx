import { CheckCircle, Leaf, Wheat, Sprout, Flower } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type CropType = "rice" | "wheat" | "corn" | "potato" | "sugarcane";

interface CropSelectorProps {
  selectedCrop: CropType | null;
  onSelectCrop: (crop: CropType) => void;
}

const CropSelector = ({ selectedCrop, onSelectCrop }: CropSelectorProps) => {
  const { t } = useTranslation();

  const crops: { id: CropType; name: string; icon: React.ReactNode }[] = [
    { id: "rice", name: t('crops.rice'), icon: <Leaf className="h-5 w-5" /> },
    { id: "wheat", name: t('crops.wheat'), icon: <Wheat className="h-5 w-5" /> },
    { id: "corn", name: t('crops.corn'), icon: <Sprout className="h-5 w-5" /> },
    { id: "potato", name: t('crops.potato'), icon: <Flower className="h-5 w-5 rotate-180" /> },
    { id: "sugarcane", name: t('crops.sugarcane'), icon: <Leaf className="h-5 w-5 rotate-45" /> },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-xl font-semibold text-forest dark:text-green-400 mb-4 text-center">
        {t('cropSelector.title')}
      </h2>
      
      <div className="flex flex-wrap justify-center gap-3">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onSelectCrop(crop.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
              selectedCrop === crop.id
                ? "border-forest bg-forest/10 dark:border-green-400 dark:bg-green-900/20 shadow-sm"
                : "border-gray-200 dark:border-gray-700 hover:border-forest/50 dark:hover:border-green-400/50 hover:bg-forest/5 dark:hover:bg-green-900/10"
            )}
          >
            {selectedCrop === crop.id && (
              <CheckCircle className="h-4 w-4 text-forest dark:text-green-400" />
            )}
            <div className="p-1.5 rounded-full bg-forest/10 dark:bg-green-900/20">
              {crop.icon}
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {crop.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CropSelector;