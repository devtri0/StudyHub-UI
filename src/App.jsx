import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./layouts/RootLayouts";
import Home from "./pages/Home";
import Tutors from "./pages/Tutors";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/tutors" element={<Tutors />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
