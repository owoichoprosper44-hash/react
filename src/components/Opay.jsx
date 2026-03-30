import React, { useState } from 'react';

const Dashboard = () => {
  const [balance, setBalance] = useState(50000); // Initial balance
  const [cards, setCards] = useState([
    { id: 1, number: "**** **** **** 1234", type: "Visa", holder: "John Doe" },
    { id: 2, number: "**** **** **** 5678", type: "MasterCard", holder: "Jane Doe" },
  ]);
  const [newCard, setNewCard] = useState({ number: "", type: "", holder: "" });

  const handleAddCard = () => {
    if (newCard.number && newCard.type && newCard.holder) {
      setCards([...cards, { ...newCard, id: cards.length + 1 }]);
      setNewCard({ number: "", type: "", holder: "" });
      alert("Card added successfully!");
    } else {
      alert("Please fill in all card details.");
    }
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    alert("Card deleted successfully!");
  };

  return (
    <div className="bg-gray-100 h-screen font-sans">
      {/* Header */}
      <header className="bg-green-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button className="bg-white text-green-500 px-4 py-1 rounded">Profile</button>
      </header>

      {/* Balance Overview */}
      <main className="p-4">
        <div className="bg-white p-6 rounded shadow mb-6 text-center">
          <h2 className="text-lg font-bold text-gray-700">Your Balance</h2>
          <p className="text-3xl font-bold text-green-500">₦{balance.toLocaleString()}</p>
        </div>

        {/* Card Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-bold mb-4">Your Cards</h3>
          <ul className="space-y-4">
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <p className="text-sm font-bold">{card.type}</p>
                  <p className="text-sm text-gray-600">{card.number}</p>
                  <p className="text-sm text-gray-600">{card.holder}</p>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Add New Card */}
          <div className="mt-6">
            <h4 className="text-md font-bold mb-2">Add New Card</h4>
            <div className="space-y-4">
              <input
                type="text"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value }
                  
                  )
                }
                placeholder="Card Number"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({ ...newCard, type: e.target.value })
                }
                placeholder="Card Type (e.g., Visa, MasterCard)"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={newCard.holder}
                onChange={(e) =>
                  setNewCard({ ...newCard, holder: e.target.value })
                }
                placeholder="Cardholder Name"
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleAddCard}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white fixed bottom-0 w-full flex justify-around items-center p-2 shadow-md">
        <button className="text-green-500 flex flex-col items-center">
          <span className="text-lg">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="text-gray-500 flex flex-col items-center">
          <span className="text-lg">💳</span>
          <span className="text-xs">Cards</span>
        </button>
        <button className="text-gray-500 flex flex-col items-center">
          <span className="text-lg">⚙️</span>
          <span className="text-xs">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
