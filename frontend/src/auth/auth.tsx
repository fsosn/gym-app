import { API_ENDPOINTS } from "../config.tsx";
import axios from "axios";
import Cookies from "js-cookie";

interface Auth {
    isAuthenticated: boolean;
    role: string | null;
    userId: string | null;
    email: string | null;
    signIn: (
        email: string,
        password: string,
        callback: (data: { userId: string; token: string }) => void,
        onFailure: (message: string) => void
    ) => Promise<void>;
    signOut: (callback: () => void) => void;
    register: (
        userData: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        },
        onSuccess: () => void,
        onFailure: (message: string) => void
    ) => Promise<void>;
    authenticateFromCookie: () => Promise<void>;
}

const auth: Auth = {
    isAuthenticated: false,
    role: null,
    userId: null,
    email: null,

    signIn: async (
        email: string,
        password: string,
        callback: (data: { userId: string; token: string }) => void,
        onFailure: (message: string) => void
    ): Promise<void> => {
        try {
            const response = await axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`,
                { email, password }
            );

            if (response.status !== 200) {
                onFailure(response.data.message);
                return;
            }

            const token = response.data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const getRoleResponse = await axios.get(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DETAILS}`
            );

            const userId = getRoleResponse.data.id;
            const resRole = getRoleResponse.data.role;

            auth.isAuthenticated = true;
            auth.role = resRole;
            auth.userId = userId;

            const userData = { token, userId, resRole };
            Cookies.set("userData", JSON.stringify(userData), {
                secure: true,
                sameSite: "strict",
            });

            callback({ userId, token });
        } catch (e) {
            onFailure("Please check your credentials and try again");
            console.error("Authentication failed: ", e);
        }
    },

    signOut: (callback: () => void): void => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${null}`;
        auth.isAuthenticated = false;
        auth.userId = null;
        auth.email = null;
        Cookies.remove("userData");
        callback();
        window.location.reload();
    },

    register: async (
        userData: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        },
        onSuccess: () => void,
        onFailure: (message: string) => void
    ): Promise<void> => {
        try {
            const response = await axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.REGISTER}`,
                {
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                }
            );
            if (response.status === 201) {
                onSuccess();
            } else {
                onFailure(
                    response.data.message ||
                        "Registration failed. Please try again."
                );
            }
        } catch (error) {
            console.error("Error during registration:", error);

            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message;
                onFailure(errorMessage);
            } else {
                onFailure("An unknown error occurred.");
            }
        }
    },

    authenticateFromCookie: async (): Promise<void> => {
        const userDataString = Cookies.get("userData");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const token = userData.token;
            try {
                const response = await axios.get(
                    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DETAILS}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                auth.isAuthenticated = true;
                auth.role = response.data.role;
                auth.userId = response.data.id;
                auth.email = response.data.email;
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
            } catch (error) {
                console.error(
                    "Error during authentication from cookie:",
                    error
                );
                Cookies.remove("userData");
                auth.isAuthenticated = false;
                auth.role = null;
                auth.userId = null;
                auth.email = null;
            }
        }
    },
};

export { auth };
