
import { AlertTriangle, Send, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FarmersGuide = () => {
  const preventionSteps = [
    {
      title: "Crop Rotation",
      description: "Alternate different crop types in the same area across growing seasons to prevent disease buildup in soil.",
    },
    {
      title: "Proper Spacing",
      description: "Plant crops with adequate space between them to promote air circulation and reduce humidity.",
    },
    {
      title: "Water Management",
      description: "Water at the base of plants and avoid overhead irrigation to keep foliage dry and prevent fungal growth.",
    },
    {
      title: "Regular Monitoring",
      description: "Inspect crops weekly for early signs of disease to catch and address issues before they spread.",
    },
    {
      title: "Soil Health",
      description: "Maintain balanced soil nutrients and pH levels to strengthen plant immune systems naturally.",
    },
    {
      title: "Quality Seeds",
      description: "Use certified disease-resistant seed varieties appropriate for your region and climate.",
    },
  ];

  const fieldChecklist = [
    "Inspect plants weekly for discoloration, spots, or unusual growth",
    "Monitor soil moisture levels consistently",
    "Check for pest presence on leaves and stems",
    "Document any unusual findings with photos",
    "Keep records of weather conditions",
    "Note any treatments applied and their effectiveness",
  ];

  return (
    <div id="guide" className="py-16 bg-amber/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest mb-4">Farmer's Guide to Crop Disease Prevention</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical steps to prevent crop diseases and protect your harvest before problems arise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prevention Steps */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-forest-dark mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-amber" />
              Prevention Best Practices
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preventionSteps.map((step, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-5 hover:border-forest/20 transition-colors">
                  <h4 className="text-lg font-medium text-forest-dark mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-forest-dark mb-4 flex items-center">
                <Send className="h-5 w-5 mr-2 text-forest" />
                When to Contact an Expert
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs">!</span>
                  </div>
                  <span className="text-gray-700">Disease symptoms persist despite treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs">!</span>
                  </div>
                  <span className="text-gray-700">Rapid spread across multiple plants</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs">!</span>
                  </div>
                  <span className="text-gray-700">Unusual symptoms not matching common diseases</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs">!</span>
                  </div>
                  <span className="text-gray-700">Significant yield loss or plant death</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Field Checklist */}
          <div className="lg:col-span-1">
            <div className="bg-forest text-white rounded-2xl shadow-md p-8 sticky top-24">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-amber" />
                Weekly Field Checklist
              </h3>
              
              <ul className="space-y-4">
                {fieldChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md border-2 border-amber flex items-center justify-center flex-shrink-0">
                      <span className="text-amber text-xs">{index + 1}</span>
                    </div>
                    <span className="text-forest-light/90">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-forest-dark rounded-xl">
                <p className="text-forest-light/90 text-sm">
                  Pro Tip: Take photos of the same plants weekly to track subtle changes over time. 
                  This helps identify issues before they become severe.
                </p>
              </div>
              
              <button className="mt-6 w-full bg-amber text-forest-dark font-medium py-3 rounded-xl hover:bg-amber-light transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Checklist PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmersGuide;
