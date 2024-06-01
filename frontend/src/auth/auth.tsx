import { API_ENDPOINTS } from "../config.tsx";
import axios from "axios";

interface Auth {
  isAuthenticated: boolean;
  role: string | null;
  userId: string | null;
  signIn: (
    email: string,
    password: string,
    callback: (data: { userId: string; token: string }) => void
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
}

const auth: Auth = {
  isAuthenticated: false,
  role: null,
  userId: null,

  signIn: async (
    email: string,
    password: string,
    callback: (data: { userId: string; token: string }) => void
  ): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`,
        { email, password }
      );

      if (response.status !== 200) {
        alert(response.data.message);
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

      callback({ userId, token });
    } catch (e) {
      alert("Authentication failed");
      console.error("Authentication failed: ", e);
    }
  },

  signOut: (callback: () => void): void => {
    const token = null;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    auth.isAuthenticated = false;
    auth.userId = null;
    window.location.reload();
    callback();
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
          response.data.message || "Registration failed. Please try again."
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
};

export { auth };
