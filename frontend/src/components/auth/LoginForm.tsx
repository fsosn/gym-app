import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { useContext, useState, FormEvent, ChangeEvent } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) {
      console.error("Auth context is not available");
      return;
    }
    try {
      await auth.signIn(
        email,
        password,
        () => {
          navigate(from, { replace: true });
        },
        (errorMessage: string) => {
          setShowAlert(true);
          setAlertTitle("Login failed");
          setAlertDescription(errorMessage);
        }
      );
    } catch (error) {
      console.error("Unexpected error during login", error);
      setShowAlert(true);
      setAlertTitle("Unexpected error");
      setAlertDescription("Please try again later.");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            {showAlert && (
              <div className="pt-4">
                <Alert className="max-w-xs" variant="destructive">
                  <AlertTitle>{alertTitle}</AlertTitle>
                  <AlertDescription>{alertDescription}</AlertDescription>
                </Alert>
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
