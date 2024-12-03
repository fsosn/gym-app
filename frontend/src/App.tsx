import "./App.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./auth/RequireAuth";
import WorkoutPage from "./pages/WorkoutPage";
import { WorkoutLog } from "./components/workout/WorkoutLog";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route
                    path="/"
                    index
                    element={
                        <RequireAuth>
                            {/* <WorkoutPage /> */}
                            <WorkoutLog />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/sign-up" element={<RegisterForm />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
