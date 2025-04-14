import { Leaf, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest dark:bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-forest dark:text-green-400">{t('app.title')}</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  {t('nav.about')} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px]">
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-semibold">{t('about.title')}</div>
                  <div className="text-sm text-muted-foreground">{t('about.description')}</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-semibold">{t('about.neuralNetworks.title')}</div>
                  <div className="text-sm text-muted-foreground">{t('about.neuralNetworks.description')}</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-semibold">{t('about.privacy.title')}</div>
                  <div className="text-sm text-muted-foreground">{t('about.privacy.description')}</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-[#1a1b1e] border-none text-white p-6 [&>button]:hidden">
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">About</h2>
                    <SheetClose className="text-white rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                      <X className="h-6 w-6" />
                    </SheetClose>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">{t('about.title')}</h3>
                      <p className="text-sm text-gray-300 mt-1">{t('about.description')}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{t('about.neuralNetworks.title')}</h3>
                      <p className="text-sm text-gray-300 mt-1">{t('about.neuralNetworks.description')}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{t('about.privacy.title')}</h3>
                      <p className="text-sm text-gray-300 mt-1">{t('about.privacy.description')}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="text-sm text-gray-300">settings</div>
                    <div className="space-y-6 mt-4">
                      <div>
                        <div className="text-sm text-gray-300">Language</div>
                        <LanguageToggle />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Theme</div>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;