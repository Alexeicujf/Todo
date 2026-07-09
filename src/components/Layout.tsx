import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { ItemList } from "./list/ItemList";
import { useList, List, getListsAsync } from "../store/slices/ListsSlice";
import { CreateListTrigger } from "./list/CreateListTrigger";
import { AppDispatch, RootState } from "@/store";

export function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useList();

  const authState = useSelector((state: RootState) => {
    return (state as unknown as { auth: { id?: number } }).auth;
  });

  useEffect(() => {
    dispatch(getListsAsync());
  }, [dispatch]);

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

        <div className="flex w-full flex-col gap-1 overflow-y-auto">
          {authState.id &&
            lists?.map((item: List) => <ItemList key={item.id} item={item} />)}
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
