import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      cursor="pointer"
      size="sm"
      variant="success"
      onClick={toggleLanguage}
    >
      {language === "ru" ? "Change to English 🇺🇸" : "Переключить на Русский 🇷🇺"}
    </Button>
  );
};
