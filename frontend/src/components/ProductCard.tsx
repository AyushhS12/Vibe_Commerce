import type React from "react";
import { Link } from "react-router-dom";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);


interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, rating }) => {
  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-64 w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">{name}</h3>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">{price}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < rating} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};