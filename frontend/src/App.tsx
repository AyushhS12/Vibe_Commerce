import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './style/styles.css'
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthProvider";
function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={1800} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
