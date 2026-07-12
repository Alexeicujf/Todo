import { useEffect, useMemo } from "react";
import { ListTodos } from "@/components/to-do/ListTodos";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import { NavLink, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Todo, getTodosAsync } from "@/store/slices/TodosSlice";
import { CreateTodo } from "@/components/to-do/CreateTodo";

interface ListSliceState {
  lists: Array<{ id: number; title: string; description: string }>;
}

export function ListPage() {
  const { listId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch, listId]);

  const todos = useSelector((state: RootState) => {
    const rawTodos = (state as unknown as { todos: unknown }).todos;
    if (rawTodos && typeof rawTodos === "object" && "todos" in rawTodos) {
      return (rawTodos as { todos: Todo[] }).todos;
    }
    return (rawTodos as Todo[]) || [];
  });

  const currentListTitle = useSelector((state: RootState) => {
    const listState = (state as unknown as { list: ListSliceState }).list;
    const currentList = listState?.lists?.find(
      (l) => String(l.id) === String(listId)
    );
    return currentList ? currentList.title : "Загрузка...";
  });

  const { theme, toggleTheme } = useTheme();

  const todosFiltered = useMemo(() => {
    const filtered = todos.filter((item: Todo) => {
      const itemTargetList = item.list ? parseInt(String(item.list), 10) : 0;
      const currentUrlList = listId ? parseInt(String(listId), 10) : 0;

      return itemTargetList === currentUrlList;
    });

    return filtered;
  }, [todos, listId]);

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} mx-auto my-[40px] flex w-full max-w-[550px] flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 text-gray-900 shadow-xl transition-all dark:border-gray-800 dark:bg-[#121212] dark:text-white`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <NavLink
          to={"/about"}
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          О себе →
        </NavLink>
        <div className="flex items-center gap-2">
          <Button
            cursor="pointer"
            size="sm"
            variant="success"
            onClick={toggleTheme}
          >
            {theme === "light" ? "☀️" : "🌕"}
          </Button>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="px-1">
        <span className="text-xs font-semibold tracking-wider text-blue-500 uppercase">
          Текущий список:
        </span>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {currentListTitle}
        </h1>
      </div>

      <div className="w-full">
        <CreateTodo listId={listId} />
      </div>

      <div className="w-full flex-1">
        <ListTodos todos={todosFiltered} />
      </div>
    </div>
  );
}
