import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./layouts/RootLayouts";
import Home from "./pages/Home";
import Tutors from "./pages/Tutors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/tutors" element={<Tutors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
