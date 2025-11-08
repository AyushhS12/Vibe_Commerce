import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './style/styles.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes like Cart, Login, Signup */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
