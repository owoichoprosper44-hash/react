import { useState } from "react";

export default function App() {
  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Sneakers", price: 60 },
  ];

  const [cart, setCart] = useState([]);

  
  const addToCart = (product) => {
    const itemExists = cart.find((item) => item.id === product.id);

   

    

    

    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const changeQty = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🛒 Add To Cart Website
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>

          {cart.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQty(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => changeQty(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <hr className="my-4" />
          <h3 className="text-lg font-bold">Total: ${total}</h3>
        </div>
      </div>
    </div>
  );
}
