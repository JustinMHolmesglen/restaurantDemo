import { useContext, useDebugValue } from "react";
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
    const { user } = useContext(AuthContext)
    // useDebugValue(user?.id ? "Logged In" : "Logged Out");
    useDebugValue(user, user => user?.id ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
  }

  export default useAuth;