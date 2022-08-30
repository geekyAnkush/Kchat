import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const set = async () => {
      let temp = await JSON.parse(localStorage.getItem("kchat-user"));
      setUser(temp);
    };
    set();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/setAvatar"
          element={user ? <SetAvatar /> : <Navigate to="/login" />}
        />
        {/* <Route path="/setAvatar" element={<SetAvatar />} /> */}
        {/* <Route path="/" element={<Chat />} /> */}
        <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
