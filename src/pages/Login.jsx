// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const { backendUrl, token, setToken } = useContext(AppContext);
//   const [state, setState] = useState("Sign Up");
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       if (state == "Sign Up") {
//         const { data } = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           password,
//           email,
//         });
//         if (data.success) {
//           localStorage.setItem("token", data.token);
//           setToken(data.token);
//         } else {
//           toast.error("Email already taken. Choose another email.");
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/user/login", {
//           password,
//           email,
//         });
//         if (data.success) {
//           localStorage.setItem("token", data.token);
//           setToken(data.token);
//           toast.success(`Welcome ${data.name}`);
//           // toast.success(`😊 Hello ${user.name}! Book your next checkup in seconds.`);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token]);
//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-zinc-600 text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           Please {state === "Sign Up" ? "sign up" : "sign in"} to book
//           appointment
//         </p>
//         {state === "Sign Up" && (
//           <div className="w-full">
//             <p>Full Name</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer"
//         >
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         {state === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-primary underline cursor-pointer"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create a new account?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-primary underline cursor-pointer"
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup"); // use 'signup' or 'login'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (mode === "signup") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
          resetForm();
        } else {
          toast.error(data.message || "Email already taken.");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(`Welcome ${data.name || ""}`);
          resetForm();
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // or your protected route
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {mode === "signup" ? "Create Account" : "Login"}
        </p>
        <p>Please {mode === "signup" ? "sign up" : "sign in"} to book appointment</p>

        {mode === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer"
        >
          {mode === "signup" ? "Create Account" : "Login"}
        </button>

        {mode === "signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setMode("signup")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
