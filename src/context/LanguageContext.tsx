import React, { createContext, useContext, useState } from "react";
type LanguageType = "ru" |"en";

interface LanguageContextType {
    language: LanguageType;
    toggleLanguage: () => void;
    t: typeof translations.ru;
} 
const LanguageContext = createContext<LanguageContextType | null>(null); 

const translations = {
  ru: {
    addBtn: "Добавить задачу",
    title: "Мои дела",
    dell: "Удалить",
    delete: "❌"
  },
  en: {
    addBtn: "Add Task",
    title: "My Todos",
    dell: "Delete",
    delete: "❌"
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<LanguageType>("ru");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "ru" ? "en" : "ru"));
    };
    const t = translations[language]
    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t}}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage должен использоваться внутри LanguageProvider")
    }
    return context;
}