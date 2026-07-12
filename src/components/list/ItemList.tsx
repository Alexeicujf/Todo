import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeListAsync, List } from "@/store/slices/ListsSlice";
import { AppDispatch } from "@/store";
import { NavLink } from "react-router";

export const ItemList = ({ item }: { item: List }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);

    setTimeout(() => {
      dispatch(removeListAsync(item.id));
    }, 300);
  };

  return (
    <div
      className={`transition-all duration-300 ${isDeleting ? "animate-fade-out" : ""}`}
    >
      <NavLink
        to={`/app/list/${item.id}`}
        className={({ isActive }) =>
          `flex items-center justify-between rounded-lg p-2 transition-all ${
            isActive
              ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
              : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
          }`
        }
      >
        <span className="truncate pr-2">🔹 {item.title}</span>
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded px-1.5 py-0.5 text-xs text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
        >
          Удалить
        </button>
      </NavLink>
    </div>
  );
};
