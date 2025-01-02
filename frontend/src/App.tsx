import "./App.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./auth/RequireAuth";
import WorkoutPage from "./pages/WorkoutPage";
import { WorkoutLog } from "./components/workout/WorkoutLog";
import { RoutineForm } from "./components/workout/routine/RoutineForm";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route
                    path="/"
                    index
                    element={
                        <RequireAuth>
                            <WorkoutPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/workout-log"
                    element={
                        <RequireAuth>
                            <WorkoutLog />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/routine"
                    element={
                        <RequireAuth>
                            <RoutineForm />
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/routine/:routineId"
                    element={
                        <RequireAuth>
                            <RoutineForm />
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
