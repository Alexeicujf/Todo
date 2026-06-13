import { ListTodos } from "../components/to-do/ListTodos";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../ui/Button";
import { NavLink } from "react-router";
import { useTodos } from "../store/slices/TodosSlice";
import { CreateTodo } from "@/components/to-do/CreateTodo";


export function HomePage() {
 const todos = useTodos();
const {theme, toggleTheme} = useTheme();
 

  return (
    <div  className={`${theme === 'dark' ? 'dark' : ''} bg-white text-black dark:bg-[#121212] dark:text-white max-w-[400px] w-full mx-auto my-[50px] p-5 rounded-lg shadow-lg`}
    id="HomePage">  
      <NavLink to={"/about"}>О себе</NavLink>
      
      <h1>Все задачи</h1>
      
      <Button cursor="pointer" size="sm" variant="success"  onClick={toggleTheme}>{theme === "light" ? "☀️":"🌕"}</Button>
      <LanguageSwitcher/>
      <CreateTodo/>
    <ListTodos todos={todos}/> 
   {/*компонент здесь*/}
    </div>
  ); // Для каждого компоненда нужно прописать html/jsx
}
//типизация и интерфейсы, сделать смену темы через контекст(свел/черн)// электрон для приложения 
//