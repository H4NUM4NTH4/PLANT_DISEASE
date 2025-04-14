import { Wheat, Search, Upload, LineChart, Shield, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Search className="h-8 w-8 text-forest" />,
      title: t('features.accurateDetection.title'),
      description: t('features.accurateDetection.description'),
    },
    {
      icon: <Upload className="h-8 w-8 text-forest" />,
      title: t('features.easyUpload.title'),
      description: t('features.easyUpload.description'),
    },
    {
      icon: <Shield className="h-8 w-8 text-forest" />,
      title: t('features.earlyPrevention.title'),
      description: t('features.earlyPrevention.description'),
    },
    {
      icon: <LineChart className="h-8 w-8 text-forest" />,
      title: t('features.detailedReports.title'),
      description: t('features.detailedReports.description'),
    },
    {
      icon: <Wheat className="h-8 w-8 text-forest" />,
      title: t('features.multiCropSupport.title'),
      description: t('features.multiCropSupport.description'),
    },
    {
      icon: <Check className="h-8 w-8 text-forest" />,
      title: t('features.researchBacked.title'),
      description: t('features.researchBacked.description'),
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest mb-4">{t('features.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mb-3 bg-forest/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-forest-dark">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
