import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-6 h-6 bg-forest dark:bg-green-700 rounded-md flex items-center justify-center">
            <Leaf className="h-3 w-3 text-white" />
          </div>
          <span className="ml-2 text-sm font-medium text-forest dark:text-green-400">
            FieldGuardian 
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} サンジュ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;