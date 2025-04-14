import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToAnalyzer = () => {
    const analyzerSection = document.getElementById('analyzer');
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-20 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-forest dark:text-green-400 mb-6">
          {t('hero.title')}
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {t('hero.description')}
        </p>
        
        <Button 
          onClick={scrollToAnalyzer}
          className="bg-forest hover:bg-forest-dark dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg"
        >
          {t('hero.button')}
        </Button>
        
        <div className="mt-12 flex justify-center animate-bounce">
          <ArrowDownCircle className="h-6 w-6 text-forest dark:text-green-400 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
