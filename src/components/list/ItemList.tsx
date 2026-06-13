import { NavLink } from "react-router";
import { List } from "@/store/slices/ListsSlice";
import { CreateListModal } from "./CreateListModal";
import { useState } from "react";

export const ItemList = ({ item }: { item: List }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <NavLink 
                to={`/list/${item.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg flex-1 transition-all w-full ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-950/40" 
                      : "text-gray-600 dark:text-gray-400"
                  }`
                }
            >
                {({ isActive }) => (
                    <>
                        <div className={`w-4 h-4 rounded-full border-2 border-blue-500 shrink-0 transition-all ${
                            isActive ? "bg-blue-500" : "bg-transparent"
                        }`} />
                        <span onClick={handleOpen} className="flex-1 text-left hover:underline truncate">
                            {item.title}
                        </span>
                    </>
                )}
            </NavLink>

            <CreateListModal list={item} isOpen={isOpen} onClose={handleClose} />
        </>
    );
}