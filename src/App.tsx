import { LanguageProvider } from "@/context/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/store";
import { router } from "@/config/route";
import { ThemeProvider } from "@/context/ThemeContext";
import { RouterProvider } from "react-router";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
