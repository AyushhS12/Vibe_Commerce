import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number; // added to track cart quantity
}
const API_URL = import.meta.env.VITE_API_URL as string
function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items (either from API or localStorage)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Option 1: If cart is stored in localStorage
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          setCartItems(parsedCart);
          const totalPrice = parsedCart.reduce(
            (sum: number, item: Product) => sum + item.price * (item.quantity || 1),
            0
          );
          setTotal(totalPrice);
        } else {
          // Option 2: If you fetch from backend (comment this out if not needed)
          const res = await fetch(API_URL + "/api/cart", { credentials: "include" });
          const data = await res.json();
          if(data.err){
            console.log(data.err)
            toast.error(data.err)
            throw new Error(data.err)
          }
          setCartItems(data.products || []);
          const totalPrice = (data.products || []).reduce(
            (sum: number, item: Product) => sum + item.price * (item.quantity || 1),
            0
          );
          setTotal(totalPrice);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const totalPrice = updatedCart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotal(totalPrice);
  };

  const handleCheckout = () => {
    toast.success("Checkout successful! 🎉 (Mock)");
    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading your cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-3xl font-semibold mb-8 text-center">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 sm:mt-0 px-4 py-2 text-sm text-red-600 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">
              Total: ₹{total.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
