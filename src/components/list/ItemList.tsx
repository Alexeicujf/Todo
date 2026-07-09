import { NavLink } from "react-router";
import { List, removeListAsync } from "@/store/slices/ListsSlice";
import { CreateListModal } from "./CreateListModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

export const ItemList = ({ item }: { item: List }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeListAsync(item.id));
  };

  return (
    <>
      <div className="group flex w-full min-w-0 items-center justify-between rounded-lg pr-2 transition-all hover:bg-gray-100 dark:hover:bg-[#242424]">
        <NavLink
          to={`/app/list/${item.id}`}
          className={({ isActive }) =>
            `flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 transition-all ${
              isActive
                ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-950/40"
                : "text-gray-600 dark:text-gray-400"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`h-4 w-4 shrink-0 rounded-full border-2 border-blue-500 transition-all ${
                  isActive ? "bg-blue-500" : "bg-transparent"
                }`}
              />
              <span
                onClick={handleOpen}
                className="block flex-1 truncate text-left text-sm font-medium text-gray-900 hover:underline dark:text-white"
              >
                {item.title || "Без названия"}
              </span>
            </>
          )}
        </NavLink>

        <button
          onClick={handleDelete}
          className="ml-2 shrink-0 cursor-pointer rounded bg-gray-200/50 p-1 px-2 py-0.5 text-xs font-semibold text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:hover:bg-red-950/30"
          title="Удалить список"
        >
          Удалить
        </button>
      </div>

      <CreateListModal list={item} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
