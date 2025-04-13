import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./layouts/RootLayouts";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index={true} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
