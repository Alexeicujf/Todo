import { useState } from "react";
import { CreateTodoModal } from "./CreateTodoModal";
import {
  Todo,
  removeTodoAsync,
  checkTodoAsyns,
} from "@/store/slices/TodosSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { Delete } from "../Delete";

export function ItemTodo({ item }: { item: Todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 transition-colors hover:bg-gray-100 dark:border-gray-800/60 dark:bg-[#1a1a1a] dark:hover:bg-[#222]">
      {/* Левая часть: Чекбокс и текст */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={() =>
            dispatch(checkTodoAsyns({ id: item.id, check: !item.check }))
          }
          className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-all ${
            item.check
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-transparent text-transparent hover:border-blue-500 dark:border-gray-600"
          }`}
        >
          <span className="text-xs leading-none font-bold select-none">✓</span>
        </button>

        <span
          onClick={handleOpenModal}
          className={`flex-1 cursor-pointer truncate text-sm font-medium transition-colors ${
            item.check
              ? "text-gray-400 line-through dark:text-gray-600"
              : "text-gray-800 hover:text-blue-500 dark:text-gray-200"
          }`}
        >
          {item.title}
        </span>
      </div>

      {/* Правая часть: Чистая обёртка для удаления без лишних стилей */}
      <div className="flex shrink-0 items-center justify-center">
        <Delete
          id={item.id}
          isIcon
          onDelete={(id) => dispatch(removeTodoAsync(id))}
        />
      </div>

      <CreateTodoModal todo={item} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
