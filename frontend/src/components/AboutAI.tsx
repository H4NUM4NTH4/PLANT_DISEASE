import { Brain, Server, Database, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutAI = () => {
  const { t } = useTranslation();

  return (
    <div id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest mb-4">{t('about.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="h-6 w-6 text-forest" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-dark mb-2">{t('about.neuralNetworks.title')}</h3>
                <p className="text-gray-600">
                  {t('about.neuralNetworks.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Server className="h-6 w-6 text-forest" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-dark mb-2">{t('about.cloudProcessing.title')}</h3>
                <p className="text-gray-600">
                  {t('about.cloudProcessing.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Database className="h-6 w-6 text-forest" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-dark mb-2">{t('about.dataDriven.title')}</h3>
                <p className="text-gray-600">
                  {t('about.dataDriven.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Lock className="h-6 w-6 text-forest" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-dark mb-2">{t('about.privacy.title')}</h3>
                <p className="text-gray-600">
                  {t('about.privacy.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt={t('about.imageAlt')} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay stats */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest to-transparent p-6">
              <div className="grid grid-cols-3 gap-4 text-white">
                <div className="text-center">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm">{t('about.stats.accuracy')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm">{t('about.stats.diseases')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm">{t('about.stats.cropTypes')}</p>
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -top-6 -right-6 glassmorphism rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <div className="h-1 w-10 bg-forest mb-1 rounded-full"></div>
                  <div className="h-1 w-16 bg-forest mb-1 rounded-full"></div>
                  <div className="h-1 w-8 bg-forest mb-1 rounded-full"></div>
                  <div className="h-1 w-12 bg-forest rounded-full"></div>
                </div>
                <div>
                  <p className="text-forest-dark font-medium text-sm">Neural processing</p>
                  <p className="text-xs text-gray-500">Feature extraction layer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAI;
