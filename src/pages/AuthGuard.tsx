import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, Navigate } from "react-router";
import { reducerUser, useRegisterState } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AuthGuardProps {
  children: React.ReactNode;
  onlyPublic?: boolean;
}

export const AuthGuard = ({ children, onlyPublic = false }: AuthGuardProps) => {
  const { isAuthenticated } = useRegisterState();

  if (onlyPublic && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  if (!onlyPublic && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const Registr = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useRegisterState();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await dispatch(reducerUser(data as Record<string, string>)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-dvh bg-gray-100 p-4 py-24 transition-colors duration-300 dark:bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-2xl transition-colors duration-300 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="absolute top-4 right-4 cursor-pointer rounded-xl bg-gray-100 p-2.5 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle dark mode"
        >
          <span className="block dark:hidden">🌙</span>
          <span className="hidden dark:block">☀️</span>
        </button>

        <h1 className="text-center text-4xl font-bold text-gray-800 transition-colors dark:text-white">
          Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-sm flex-col gap-8"
          aria-label="user form"
        >
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            <span className="mb-2 block font-semibold transition-colors">
              Login
            </span>
            <Input name="login" type="text" required />
          </label>

          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            <span className="mb-2 block font-semibold transition-colors">
              Password
            </span>
            <Input name="password" type="password" required />
          </label>

          <Button
            size="md"
            disabled={isAuthenticated}
            type="submit"
            variant="primary"
            className="self-end"
          >
            {isAuthenticated ? "Регистрация..." : "Зарегистрироваться"}
          </Button>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-500 dark:bg-red-950/50 dark:text-red-400">
              {error}
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?{" "}
          <NavLink
            to="/"
            className="font-semibold text-teal-500 transition-colors hover:underline dark:text-teal-400"
          >
            Войти
          </NavLink>
        </p>
      </div>
    </main>
  );
};
