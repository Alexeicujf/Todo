import { ListTodos } from "@/components/to-do/ListTodos";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CreateTodo } from "@/components/to-do/CreateTodo";
import { Todo } from "@/store/slices/TodosSlice";

interface ListSliceState {
  activeListId?: string | number;
  lists?: Array<{ id: string | number }>;
}

export function HomePage() {
  const todos = useSelector((state: RootState) => {
    const rawTodos = (state as unknown as { todos: unknown }).todos;
    if (rawTodos && typeof rawTodos === "object" && "todos" in rawTodos) {
      return (rawTodos as { todos: Todo[] }).todos;
    }
    return (rawTodos as Todo[]) || [];
  });

  const defaultListId = useSelector((state: RootState) => {
    const listState = (state as unknown as { list: ListSliceState }).list;
    if (listState?.activeListId) return String(listState.activeListId);
    if (listState?.lists && listState.lists.length > 0) {
      return String(listState.lists[0].id);
    }
    return undefined;
  });

  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} mx-auto my-[50px] w-full max-w-[400px] rounded-lg bg-white p-5 text-black shadow-lg dark:bg-[#121212] dark:text-white`}
      id="HomePage"
    >
      <NavLink to={"/about"}>О себе</NavLink>

      <h1>Все задачи</h1>

      <Button
        cursor="pointer"
        size="sm"
        variant="success"
        onClick={toggleTheme}
      >
        {theme === "light" ? "☀️" : "🌕"}
      </Button>
      <LanguageSwitcher />
      {defaultListId ? (
        <CreateTodo listId={defaultListId} />
      ) : (
        <div className="my-2 px-1 text-sm text-red-500">
          Создайте хотя бы один список слева перед добавлением задач
        </div>
      )}
      <ListTodos todos={todos} />
    </div>
  );
}
