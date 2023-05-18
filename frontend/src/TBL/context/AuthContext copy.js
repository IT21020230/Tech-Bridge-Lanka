import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     dispatch({ type: "LOGIN", payload: user });
  //   }
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("user"));
        if (user) {
          await dispatch({ type: "LOGIN", payload: user });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   const fetchUser = async (token) => {
//     try {
//       if (token) {
//         const userData = await myAccount(token);
//         if (!userData) {
//           navigate("/login-register");
//         } else {
//           await setUser(userData);
//           await setRole(user.role);
//         }
//       } else {
//         navigate("/login-register");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchUser(token);
// }, []);
