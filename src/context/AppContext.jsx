import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";
  const backendUrl = "https://caremate-backend.onrender.com";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currency,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// import { createContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; 

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const navigate = useNavigate();
//   const logoutTimer = useRef(null);
//   const logoutCalled = useRef(false);

//   const currency = "$";
//   const backendUrl = "http://localhost:4000";

//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || false);
//   const [userData, setUserData] = useState(false);

//   const getDoctorsData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         console.log(data.message);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const logout = () => {
//     if (logoutCalled.current) return;
//     logoutCalled.current = true;

//     toast.info("Session expired. Please login again.");
//     localStorage.removeItem("token");
//     setToken(false);
//     setUserData(false);
//     navigate("/login");
//   };

//   const setupAutoLogout = (token) => {
//     if (!token) return;
//     try {
//       const decoded = jwtDecode(token);
//       const expiryTime = decoded.exp * 1000;
//       const timeLeft = expiryTime - Date.now();

//       if (timeLeft <= 0) {
//         logout();
//         return;
//       }

//       if (logoutTimer.current) clearTimeout(logoutTimer.current);

//       logoutTimer.current = setTimeout(() => {
//         logout();
//       }, timeLeft);
//     } catch (error) {
//       console.error("JWT decode error:", error);
//       logout();
//     }
//   };

//   useEffect(() => {
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401 && !logoutCalled.current) {
//           logout();
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => axios.interceptors.response.eject(interceptor);
//   }, []);

//   useEffect(() => {
//     logoutCalled.current = false;

//     if (token) {
//       setupAutoLogout(token);
//       loadUserProfileData();
//     } else {
//       if (logoutTimer.current) clearTimeout(logoutTimer.current);
//       setUserData(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   const value = {
//     doctors,
//     getDoctorsData,
//     currency,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
