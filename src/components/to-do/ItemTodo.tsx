import { useState } from "react";
import { CreateTodoModal } from "./CreateTodoModal";
import { Todo, removeTodo, checkTodo } from "@/store/slices/TodosSlice";
import { useDispatch } from "react-redux";
import { Delete } from "../Delete";

export function ItemTodo({ item }: { item: Todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
   <div className="flex items-center justify-between w-full py-2.5 px-3 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] rounded-xl border border-gray-100 dark:border-gray-800/60 transition-colors gap-3">
    
    {/* Левая часть: Чекбокс и текст */}
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <button 
        onClick={() => dispatch(checkTodo(item.id))}
        className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
          item.check 
            ? "bg-blue-500 border-blue-500 text-white" 
            : "bg-transparent border-gray-300 dark:border-gray-600 hover:border-blue-500 text-transparent"
        }`}
      >
        <span className="text-xs font-bold leading-none select-none">✓</span>
      </button>

      <span 
        onClick={handleOpenModal} 
        className={`text-sm font-medium cursor-pointer transition-colors truncate flex-1 ${
          item.check 
            ? "text-gray-400 line-through dark:text-gray-600" 
            : "text-gray-800 dark:text-gray-200 hover:text-blue-500"
        }`}
      >
        {item.title}
      </span>
    </div>

    {/* Правая часть: Чистая обёртка для удаления без лишних стилей */}
    <div className="flex items-center justify-center shrink-0">
      <Delete 
        id={item.id} 
        isIcon 
        onDelete={(id) => dispatch(removeTodo(id))} 
      />
    </div>

    <CreateTodoModal todo={item} isOpen={isOpen} onClose={handleCloseModal} />
  </div>
  )
}