import { ListTodos } from "../components/to-do/ListTodos";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../ui/Button";
import { NavLink, useParams } from "react-router";
import { useTodos, Todo } from "../store/slices/TodosSlice";
import { CreateTodo } from "@/components/to-do/CreateTodo"; 
import { useMemo } from "react";

export function ListPage() { 
    const todos = useTodos();
    const { t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { listId } = useParams();
    
    const todosFiltered = useMemo(() => {
        return todos.filter((item: Todo) => String(item.list) === String(listId))
    }, [todos, listId]) 
    
    return (
        <div className={`${theme === 'dark' ? 'dark' : ''} bg-white text-gray-900 dark:bg-[#121212] dark:text-white max-w-[550px] w-full mx-auto my-[40px] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all flex flex-col gap-5`}>  
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <NavLink to={"/about"} className="text-sm font-medium text-blue-500 hover:underline">
                    О себе →
                </NavLink>
                <div className="flex items-center gap-2">
                    <Button cursor="pointer" size="sm" variant="success" onClick={toggleTheme}>
                        {theme === "light" ? "☀️" : "🌕"}
                    </Button>
                    <LanguageSwitcher />
                </div>
            </div>
          
            <h1 className="text-2xl font-bold tracking-tight px-1">{t.title}</h1>
            
            <div className="w-full">
                <CreateTodo listId={listId} />
            </div>

            <div className="w-full flex-1">
                <ListTodos todos={todosFiltered} /> 
            </div>
        </div>
    )
  }