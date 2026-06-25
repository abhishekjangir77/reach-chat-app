import Navbar from "./component/Navbar";
import { Routes, Route, useActionData, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers , socket} = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    console.log("App - Online users:", onlineUsers)
    console.log("App - Socket:", socket?.connected)
}, [onlineUsers, socket])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10  animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
