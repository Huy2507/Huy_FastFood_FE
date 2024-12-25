import { useContext } from "react";
import AuthContext from "./AuthProvider.jsx"; // Import context

export const useAuth = () => {
    return useContext(AuthContext);
};
