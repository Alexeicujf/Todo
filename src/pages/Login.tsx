import { useLoginState, LoginUser } from "@/store/slices/UserLoginSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { UserRegister } from "@/store/slices/UserRegisterSlice";
import { NavLink, useNavigate } from "react-router";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useLoginState();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await dispatch(LoginUser(data as unknown as UserRegister)).unwrap();
      navigate("/app");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-dvh bg-gray-100 p-4 py-24">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-center text-4xl font-bold">Sign In</h1>

        <form
          onSubmit={handleSubmit}
          className="flex min-w-sm flex-col gap-8"
          aria-label="user form"
        >
          <label className="block text-sm font-medium text-gray-600">
            <span className="mb-2 block font-semibold">Login</span>
            <input
              name="login"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 font-light shadow-sm"
            />
          </label>

          <label className="block text-sm font-medium text-gray-600">
            <span className="mb-2 block font-semibold">Password</span>
            <input
              name="password"
              type="password"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 font-light shadow-sm"
            />
          </label>

          <button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer self-end rounded-xl bg-teal-500 px-6 py-2 text-white transition-colors hover:bg-teal-600"
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>

        <p className="text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-teal-500 hover:underline"
          >
            Зарегистрироваться
          </NavLink>
        </p>
      </div>
    </main>
  );
};
