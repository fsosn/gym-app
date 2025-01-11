import { ThemeProvider } from "@/components/theme/theme-provider";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/auth/RequireAuth";
import WorkoutPage from "@/pages/WorkoutPage";
import { WorkoutLog } from "@/components/workout/workout_log/WorkoutLog";
import { RoutineForm } from "@/components/routine/RoutineForm";
import { Toaster } from "@/components/ui/toaster";
import HistoryPage from "./pages/HistoryPage";
import { FinishedWorkout } from "./components/history/FinishedWorkout";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import { ExerciseProvider } from "./contexts/ExerciseContext";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/sign-up" element={<RegisterForm />} />

                <Route
                    element={
                        <RequireAuth>
                            <ExerciseProvider>
                                <Outlet />
                            </ExerciseProvider>
                        </RequireAuth>
                    }
                >
                    <Route
                        path="/"
                        element={<Navigate to="/workout" replace />}
                    />
                    <Route path="/workout" element={<WorkoutPage />} />
                    <Route path="/workout-log" element={<WorkoutLog />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route
                        path="/workout/:workoutId"
                        element={<FinishedWorkout />}
                    />
                    <Route path="/routine" element={<RoutineForm />} />
                    <Route
                        path="/routine/:routineId"
                        element={<RoutineForm />}
                    />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
