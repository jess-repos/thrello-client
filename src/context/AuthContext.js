import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router";

// const AUTH_API = "https://nodemcthrello.herokuapp.com/api/auth";
const AUTH_API = "http://localhost:7000/api/auth";

const AuthContext = createContext({
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const history = useHistory();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const userLocal = JSON.parse(localStorage.getItem("user"));
      if (userLocal) {
        let config = {
          headers: {
            token: userLocal.token,
          },
        };
        const { data } = await axios.post(AUTH_API + "/refresh", {}, config);
        // console.log(data.user);

        setUser(data.user);
        // history.push("/");
      }
      setLoading(false);
    };
    refresh();
  }, []);

  const login = async (username, password) => {
    let userObject = { username, password };
    try {
      const { data } = await axios.post(AUTH_API + "/login", userObject);
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { valid: true };
      } else {
        return { valid: false };
      }
      // history.push("/");
    } catch (err) {
      return { valid: false };
    }
  };

  const logout = () => {
    setUser();
    localStorage.removeItem("user");
  };

  const register = async (username, password) => {
    let userObject = { username, password };
    try {
      const { data } = await axios.post(AUTH_API + "/register", userObject);
      if (data.user) {
        // setUser(data.user);
        // localStorage.setItem("user", JSON.stringify(data.user));
        return { valid: true };
      } else {
        return { valid: false, message: data.message };
      }
      // history.push("/");
    } catch (err) {
      return { valid: false };
    }
  };
  const value = { user, login, logout, register };
  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
