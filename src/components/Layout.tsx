import { NavLink, Outlet } from "react-router";
import { ItemList } from "./list/ItemList";
import { useList, List } from "../store/slices/ListsSlice";
import { Delete } from "./Delete";
import { useDispatch } from "react-redux";
import { removeList } from "../store/slices/ListsSlice";
import { CreateListTrigger } from "./list/CreateListTrigger";

export function Layout() {
  const lists = useList();
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#121212]">
      <aside className="flex w-72 flex-col gap-6 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-[#1c1c1c]">
        <div className="flex flex-col gap-4">
          <CreateListTrigger />
          <NavLink
            to="/app"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg p-2 transition-all ${
                isActive
                  ? "bg-blue-100 font-medium text-blue-700"
                  : "text-gray-600 hover:bg-gray-200 dark:text-gray-400"
              }`
            }
          >
            🏠 Все задачи
          </NavLink>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col gap-1 overflow-y-auto">
          {lists?.map((item: List) => (
            <div
              key={item.id}
              className="group flex w-full items-center justify-between rounded-lg px-2 transition-all hover:bg-gray-100 dark:hover:bg-[#242424]"
            >
              <ItemList item={item} />
              <Delete
                id={item.id}
                isIcon
                onDelete={(id) => dispatch(removeList(id))}
              />
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
