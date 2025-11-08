import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useAuthGuard } from "../context/authContext";

// --- ICONS ---
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// --- PRODUCT INTERFACE ---
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const FAKE_STORE_API_URL = import.meta.env.VITE_FAKESTORE_API_URL as string;
const API_URL = import.meta.env.VITE_API_URL as string;

// --- MAIN COMPONENT ---
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const authGuard = useAuthGuard()
  const {value} = useAuth()

  // Fetch products on mount
  useEffect(() => {
    authGuard()
    setIsLoggedIn(value?.token?true:false)
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${FAKE_STORE_API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products.");
      }
    };
    fetchProducts();

    // Check login
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [authGuard, value?.token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info("Logged out successfully.");
  };

  const addToCart = async (product: Product) => {
    if (!isLoggedIn) {
      toast.warn("Please login before adding to cart");
      return;
    }
    try {
      // You can replace with your backend endpoint later
      await axios.post(API_URL + "/api/cart", { productId: product.id });
      toast.success(`${product.title} added to cart!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-10">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Vibe Commerce
        </h1>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <Link to="/cart" className="hover:text-indigo-600">
              <ShoppingCartIcon />
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toast.warn("Proifle page not available")}
                className="hover:text-indigo-600"
              >
                <UserIcon />
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => navigate("/auth",{state:"login"})}
                className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup",{state:"signup"})}
                className="px-4 py-1 text-sm border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Product Section */}
      <main className="p-6 grow">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Latest Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-contain bg-gray-100"
                />

                {/* Product Info */}
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Vibe Commerce. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
