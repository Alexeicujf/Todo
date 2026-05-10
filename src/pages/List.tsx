import { ListTodos } from "../components/ListTodos";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../ui/Button";
import { NavLink, useParams } from "react-router";
import { useTodos } from "../store/slices/TodosSlice";
import { CreateTodo } from "../components/CreateTodo";
import { useMemo } from "react";

export function ListPage() { 
    const todos = useTodos();
    const { t } = useLanguage();
    const {theme, toggleTheme} = useTheme();
    const {listId} = useParams();
    const todosFiltered =useMemo(() => {
       return todos.filter((item: any) => item.list === listId)
    },[todos, listId]) 
      return (
      <div  className={`${theme === 'dark' ? 'dark' : ''} bg-white text-black dark:bg-[#121212] dark:text-white max-w-[400px] w-full mx-auto my-[50px] p-5 rounded-lg shadow-lg`}
        id="HomePage">  
        <NavLink to={"/about"}>О себе</NavLink>
      
        <h1>{t.title}</h1>
         <></>
        <Button cursor="pointer" size="sm" variant="success"  onClick={toggleTheme}>{theme === "light" ? "☀️":"🌕"}</Button>
        <LanguageSwitcher/>
        <CreateTodo listId={listId}/>
        <ListTodos todos={todosFiltered}/> 
   {/*компонент здесь*/}
      </div>
  ); // Для каждого компоненда нужно прописать html/jsx
}
//типизация и интерфейсы, сделать смену темы через контекст(свел/черн)// электрон для приложения 
//