import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartHeader = ({ onCartClick }) => {
  const { getTotalItems } = useContext(CartContext);

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">ShopCart</h1>
          <button
            onClick={onCartClick}
            className="relative flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <AiOutlineShoppingCart size={24} />
            <span className="font-semibold">{getTotalItems()}</span>
            {getTotalItems() > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default CartHeader;
