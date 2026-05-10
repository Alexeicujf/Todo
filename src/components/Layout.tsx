import { NavLink, Outlet } from "react-router";
import { ItemList } from "./ItemList"; // Твой компонент для текста списка
import { useList } from "../store/slices/ListsSlice";
import { CreateList } from "./CreateList";
import { Delete } from "./Delete";
import { useDispatch } from "react-redux";
import { removeList } from "../store/slices/ListsSlice";

export function Layout() {
  const lists = useList();
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#121212]">
      <div className="w-72 bg-gray-50 dark:bg-[#1c1c1c] border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-6">
        
        <div className="flex flex-col gap-4">
          <CreateList />
          
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-2 rounded-lg transition-all ${
                isActive ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-200 text-gray-600 dark:text-gray-400"
              }`
            }
          >
            🏠 {"Все задачи"}
          </NavLink>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <nav className="flex flex-col gap-1 overflow-y-auto">
          {lists?.map((item: any) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center group w-full"
            >
              <NavLink
                to={`/list/${item.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg flex-1 transition-all ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "hover:bg-gray-100 text-gray-600 dark:text-gray-400"
                  }`
                }
              >
                <div className="relative flex items-center justify-center min-w-[16px]">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-500" />
                  
                </div>

                <ItemList item={item} />
              </NavLink>

              <Delete 
                id={item.id} 
                isIcon 
                onDelete={(id) => dispatch(removeList(id))} 
              />
            </div>
          ))}
        </nav>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}