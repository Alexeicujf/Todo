import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosAsync } from "@/store/slices/TodosSlice";
import { AppDispatch } from "@/store";
import { ItemTodo } from "./ItemTodo";
import type { Todo } from "../../store/slices/TodosSlice";

interface ListTodosProps {
  todos: Todo[];
}

export function ListTodos({ todos }: ListTodosProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  if (!Array.isArray(todos)) {
    return null;
  }

  return (
    // ИСПРАВЛЕНО: Заменили пустой фрагмент <> на <div> с классом сетки
    <div className="flex w-full flex-col gap-2">
      {todos.map((item) => (
        <ItemTodo key={item.id} item={item} />
      ))}
    </div>
  );
}
