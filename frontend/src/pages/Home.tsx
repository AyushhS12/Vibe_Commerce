
import { Link } from 'react-router-dom';

// --- SVG ICONS (Helper Components) ---
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

function Home() {
  // const [email, setEmail] = useState('');

  // const handleNewsletterSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Newsletter submitted:', email);
  //   setEmail('');
  //   // Here you would call your API to subscribe the user
  // };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      {/* --- HEADER --- */}
      <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <div className="shrink-0">
              <Link to="/" className="text-2xl font-bold gradient-text">
                Vibe Commerce
              </Link>
            </div>
            {/* Center: Navigation */}
            <nav className="hidden md:flex md:space-x-8">
              <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</Link>
              <Link to="/new" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">New Arrivals</Link>
              <Link to="/categories" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Categories</Link>
            </nav>
            {/* Right: Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <SearchIcon />
              </button>
              <Link to="/cart" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <ShoppingCartIcon />
              </Link>
              <Link to="/auth" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <UserIcon />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-12">
            {/* Left: Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 dark:text-white">
                Find Your <span className="gradient-text">Vibe.</span>
              </h1>
              <p className="max-w-xl mx-auto md:mx-0 text-lg text-gray-600 dark:text-gray-400 mb-8">
                Discover curated collections that match your unique style. From minimalist tech to bold streetwear, Vibe Commerce is where your inspiration comes to life.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
              >
                Shop All Collections
              </Link>
            </div>
            {/* Right: Image */}
            <div className="flex justify-center">
              <img 
                src="https://placehold.co/600x600/6366F1/FFFFFF?text=Vibe&font=raleway" 
                alt="Stylish product" 
                className="rounded-lg shadow-2xl w-full max-w-md"
              />
            </div>
          </div>
        </section>

        {/* --- All sections below are removed for a minimal page --- */}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Vibe Commerce. All rights reserved.
          </p>
        </div>
      </footer>

      {/* This style is for the gradient text, which is easier to manage here */}
      <style>{`
          .gradient-text {
              background: linear-gradient(to right, #4F46E5, #818CF8);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
          }
      `}</style>
    </div>
  );
}

export default Home;