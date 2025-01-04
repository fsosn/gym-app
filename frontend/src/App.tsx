import { ThemeProvider } from "@/components/theme/theme-provider";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/auth/RequireAuth";
import WorkoutPage from "@/pages/WorkoutPage";
import { WorkoutLog } from "@/components/workout/workout_log/WorkoutLog";
import { RoutineForm } from "@/components/routine/RoutineForm";
import { Toaster } from "@/components/ui/toaster";
import HistoryPage from "./pages/HistoryPage";
import { FinishedWorkout } from "./components/history/FinishedWorkout";

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
                    path="/workout"
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
                />
                <Route
                    path="/routine/:routineId"
                    element={
                        <RequireAuth>
                            <RoutineForm />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <RequireAuth>
                            <HistoryPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/workout/:workoutId"
                    element={
                        <RequireAuth>
                            <FinishedWorkout />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/sign-up" element={<RegisterForm />} />
            </Routes>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
