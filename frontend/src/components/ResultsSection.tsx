import { CheckCircle, XCircle, Info, AlertCircle, Leaf, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

interface DiseaseInfo {
  description: string;
  treatment: string[];
  prevention: string[];
  organic_pesticides: string[];
}

interface ResultData {
  disease: string;
  confidence: number;
  isHealthy: boolean;
  description: string;
  treatment: string[];
  prevention: string[];
  organic_pesticides?: string[];
  imageUrl?: string;
}

interface ResultsSectionProps {
  data: ResultData | null;
  cropType: string;
  onReset: () => void;
}

const ResultsSection = ({ data, cropType, onReset }: ResultsSectionProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  if (!data) return null;

  // Get translated disease information
  const getTranslatedDiseaseInfo = (diseaseKey: string): DiseaseInfo | null => {
    try {
      // Format the disease key to match the translation file structure
      // Convert "Red Rot" to "Sugarcane___Red_Rot" format
      const formattedKey = `${cropType.charAt(0).toUpperCase() + cropType.slice(1)}___${
        diseaseKey.split(' ').join('_')
      }`;
      
      console.log('Looking up disease with key:', formattedKey);
      
      // Get the disease translations
      const translatedDisease = t(`diseases.${formattedKey}`, { returnObjects: true });
      console.log('Translated disease info:', translatedDisease);

      // Validate if we got a proper translation object with all required fields
      if (
        typeof translatedDisease === 'object' &&
        translatedDisease !== null &&
        'description' in translatedDisease &&
        'treatment' in translatedDisease &&
        'prevention' in translatedDisease &&
        'organic_pesticides' in translatedDisease
      ) {
        return translatedDisease as DiseaseInfo;
      }
      
      console.log('Translation validation failed for disease:', formattedKey);
      return null;
    } catch (error) {
      console.error('Error getting disease translation:', error);
      return null;
    }
  };

  const diseaseInfo = data.isHealthy ? null : getTranslatedDiseaseInfo(data.disease);

  // Fallback function to get content with translation priority
  const getTranslatedContent = (key: keyof DiseaseInfo): any => {
    try {
      // First try to get the disease-specific translation
      if (diseaseInfo && diseaseInfo[key]) {
        return diseaseInfo[key];
      }

      // If disease-specific translation is not available, try to get from general translations
      const formattedKey = `${cropType.charAt(0).toUpperCase() + cropType.slice(1)}___${
        data.disease.split(' ').join('_')
      }`;
      
      const generalKey = `diseases.${formattedKey}.${key}`;
      console.log('Trying general translation key:', generalKey);
      
      const generalTranslation = t(generalKey, { returnObjects: true });
      if (generalTranslation && typeof generalTranslation === 'object' && key in generalTranslation) {
        return generalTranslation[key];
      }

      // Fallback to original data if no translation is found
      return data[key];
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return data[key];
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 dark:text-green-400";
    if (confidence >= 70) return "text-amber dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const getProgressColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-600 dark:bg-green-500";
    if (confidence >= 70) return "bg-amber dark:bg-amber-500";
    return "bg-red-500 dark:bg-red-400";
  };

  const generatePDF = async () => {
    try {
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set margins and dimensions
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pageWidth - (margin * 2);
      const headerHeight = 40;

      // Track vertical position
      let yPosition = margin;

      // 1. Header Section with agricultural theme
      const colors = [
        { r: 220, g: 242, b: 220 }, // Light green
        { r: 198, g: 246, b: 213 }  // Slightly darker green
      ];
      
      for (let i = 0; i < headerHeight; i++) {
        const ratio = i / headerHeight;
        const color = {
          r: Math.round(colors[0].r + (colors[1].r - colors[0].r) * ratio),
          g: Math.round(colors[0].g + (colors[1].g - colors[0].g) * ratio),
          b: Math.round(colors[0].b + (colors[1].b - colors[0].b) * ratio)
        };
        pdf.setFillColor(color.r, color.g, color.b);
        pdf.rect(0, i, pageWidth, 1, 'F');
      }

      // Report title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(26);
      pdf.setTextColor(34, 97, 67); // Darker green
      pdf.text("Crop Analysis Report", margin, yPosition + 10);

      // Generated by and date
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(47, 133, 90); // Medium green
      pdf.text("Generated by FieldGuardian AI", pageWidth - margin - 60, yPosition);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 60, yPosition + 7);

      yPosition = headerHeight + margin;

      // 2. Report Summary Section
      pdf.setFillColor(249, 250, 251); // Light gray background
      pdf.setDrawColor(229, 231, 235); // Gray border
      pdf.roundedRect(margin, yPosition, contentWidth, 35, 3, 3, 'FD');
      
      // Summary title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 41, 55); // Dark gray
      pdf.text("Disease Analysis", margin + 5, yPosition + 8);
      
      // Summary content
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(75, 85, 99); // Medium gray
      const summaryText = data.isHealthy ? "No Disease Detected" : data.disease;
      const summaryLines = pdf.splitTextToSize(summaryText, contentWidth - 10);
      pdf.text(summaryLines, margin + 5, yPosition + 18);

      yPosition += 45;

      // 3. Crop Diagnosis Details
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 41, 55);
      pdf.text("Analysis Details", margin, yPosition);
      yPosition += 15;

      // Create diagnosis table
      const tableData = [
        ['Crop Type', cropType.charAt(0).toUpperCase() + cropType.slice(1)],
        ['Status', data.isHealthy ? "No Disease Detected" : data.disease],
        ['Confidence', `${data.confidence}%`],
        ['Analysis Quality', data.confidence > 80 ? 'Good' : data.confidence > 60 ? 'Moderate' : 'Fair']
      ];

      // Draw table
      const cellPadding = 5;
      const rowHeight = 10;
      const colWidth = contentWidth / 2;

      // Table headers and content
      tableData.forEach((row, rowIndex) => {
        // Alternate row background
        if (rowIndex % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, yPosition, contentWidth, rowHeight, 'F');
        }

        pdf.setDrawColor(229, 231, 235);
        pdf.line(margin, yPosition, margin + contentWidth, yPosition);

        // Field name (left column)
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(31, 41, 55);
        pdf.text(row[0], margin + cellPadding, yPosition + 7);

        // Value (right column)
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(75, 85, 99);
        pdf.text(row[1], margin + colWidth + cellPadding, yPosition + 7);

        yPosition += rowHeight;
      });
      pdf.line(margin, yPosition, margin + contentWidth, yPosition);

      yPosition += 20;

      // 4. Description Section
      if (!data.isHealthy) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(31, 41, 55);
        pdf.text("Description", margin, yPosition);
        yPosition += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        const descriptionLines = pdf.splitTextToSize(data.description, contentWidth);
        pdf.text(descriptionLines, margin, yPosition);
        yPosition += (descriptionLines.length * 5) + 12;

        // Create two-column layout for Treatment and Prevention
        const columnWidth = (contentWidth - 10) / 2;
        const leftColumnX = margin;
        const rightColumnX = margin + columnWidth + 10;
        const startY = yPosition;
        let leftColumnY = yPosition;
        let rightColumnY = yPosition;

        // Left Column: Treatment Recommendations
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(31, 41, 55);
        pdf.text("Treatment Recommendations", leftColumnX, leftColumnY);
        leftColumnY += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        data.treatment.forEach((item, index) => {
          const bulletPoint = `${index + 1}. ${item}`;
          const lines = pdf.splitTextToSize(bulletPoint, columnWidth - 5);
          pdf.text(lines, leftColumnX, leftColumnY);
          leftColumnY += (lines.length * 5) + 3;
        });

        // Right Column: Prevention Measures
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(31, 41, 55);
        pdf.text("Prevention Measures", rightColumnX, rightColumnY);
        rightColumnY += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        data.prevention.forEach((item, index) => {
          const bulletPoint = `${index + 1}. ${item}`;
          const lines = pdf.splitTextToSize(bulletPoint, columnWidth - 5);
          pdf.text(lines, rightColumnX, rightColumnY);
          rightColumnY += (lines.length * 5) + 3;
        });

        // Update yPosition to the maximum of both columns
        yPosition = Math.max(leftColumnY, rightColumnY) + 10;

        // Add organic pesticides if available
        if (data.organic_pesticides && data.organic_pesticides.length > 0) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(31, 41, 55);
          pdf.text("Recommended Organic Solutions", margin, yPosition);
          yPosition += 8;

          // Display organic pesticides in two columns
          const pesticidesPerColumn = Math.ceil(data.organic_pesticides.length / 2);
          let leftY = yPosition;
          let rightY = yPosition;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(75, 85, 99);

          data.organic_pesticides.forEach((item, index) => {
            const bulletPoint = `${index + 1}. ${item}`;
            const lines = pdf.splitTextToSize(bulletPoint, columnWidth - 5);
            
            if (index < pesticidesPerColumn) {
              // Left column
              pdf.text(lines, leftColumnX, leftY);
              leftY += (lines.length * 5) + 3;
            } else {
              // Right column
              pdf.text(lines, rightColumnX, rightY);
              rightY += (lines.length * 5) + 3;
            }
          });

          yPosition = Math.max(leftY, rightY) + 5;
        }

        // Add tip note with reduced spacing
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(8);
        pdf.setTextColor(107, 114, 128);
        pdf.text("Note: These recommendations may vary based on your region and specific conditions.", margin, yPosition);
      }

      // 7. Footer with reduced margin
      pdf.setDrawColor(229, 231, 235);
      pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.text("Generated by FieldGuardian AI - Plant Disease Detection System", margin, pageHeight - 8);
      pdf.text('Page 1 of 1', pageWidth - margin - 20, pageHeight - 8);

      // Save PDF
      pdf.save(`crop-analysis-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <>
      <div ref={reportRef} className="hidden">
        <div className="p-8 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-forest rounded-md flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">FieldGuardian</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Report Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {data.isHealthy ? t('result.noDisease') : `${t('result.disease')}: ${data.disease}`}
            </h2>
            <p className="text-gray-600">Crop Type: {cropType.charAt(0).toUpperCase() + cropType.slice(1)}</p>
          </div>

          {data.imageUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Uploaded Image</h3>
              <img src={data.imageUrl} alt="Crop Image" className="max-w-full h-auto rounded-lg shadow-md" />
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('result.title')}</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{t('result.confidence')}</span>
                <span className={`font-medium ${getConfidenceColor(data.confidence)}`}>
                  {data.confidence}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(data.confidence)}`} 
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('result.description')}</h3>
            <p className="text-gray-700">{diseaseInfo?.description || data.description}</p>
          </div>

          {!data.isHealthy && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('result.treatment')}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {diseaseInfo?.treatment?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('result.prevention')}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {diseaseInfo?.prevention?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {diseaseInfo?.organic_pesticides && diseaseInfo.organic_pesticides.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('result.organicPesticides')}</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {diseaseInfo.organic_pesticides.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              {t('result.footer')}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto animate-fade-in">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className={`p-4 ${
            data.isHealthy 
              ? 'bg-green-50 dark:bg-green-900/30' 
              : 'bg-red-50 dark:bg-red-900/30'
          } border-b dark:border-gray-700`}>
            <div className="flex items-center gap-3">
              {data.isHealthy ? (
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-800/50 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {data.isHealthy ? t('result.noDisease') : data.disease}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {cropType ? `${cropType.charAt(0).toUpperCase() + cropType.slice(1)}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {/* Confidence score */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{t('result.confidence')}</span>
                <span className={`text-sm font-medium ${getConfidenceColor(data.confidence)}`}>
                  {data.confidence}%
                </span>
              </div>
              <Progress 
                value={data.confidence} 
                className={`h-2 bg-gray-100 dark:bg-gray-700 ${getProgressColor(data.confidence)}`}
              />
            </div>

            {/* Description */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-sm">
              <div className="flex gap-2">
                <Info className="h-4 w-4 text-forest dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">{getTranslatedContent('description')}</p>
              </div>
            </div>

            {!data.isHealthy && (
              <>
                {/* Treatment */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{t('result.treatment')}</h3>
                  <ul className="space-y-1.5 text-sm">
                    {getTranslatedContent('treatment')?.slice(0, 3).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-forest dark:bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-[10px] font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{t('result.prevention')}</h3>
                  <ul className="space-y-1.5 text-sm">
                    {getTranslatedContent('prevention')?.slice(0, 3).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Organic Pesticides */}
                {getTranslatedContent('organic_pesticides') && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{t('result.organicPesticides')}</h3>
                    <ul className="space-y-1.5 text-sm">
                      {getTranslatedContent('organic_pesticides')?.slice(0, 3).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Leaf className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="border-forest text-forest hover:bg-forest/5 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
              onClick={onReset}
            >
              Try Another
            </Button>
            
            <Button 
              size="sm"
              className="bg-forest hover:bg-forest-dark dark:bg-green-700 dark:hover:bg-green-800 text-white flex items-center gap-2"
              onClick={generatePDF}
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsSection;