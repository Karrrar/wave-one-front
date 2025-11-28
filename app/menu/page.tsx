"use client";
import { useState } from "react";

type FoodItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type FavoriteItem = FoodItem & {
  qty: number;
};

export default function FoodMenu() {
  const items: FoodItem[] = [
    { id: 1, name: "Pizza", image: "img/pizza.png", price: 16000 },
    { id: 2, name: "Burger", image: "img/burger.png", price: 3500 },
    { id: 3, name: "Quzi", image: "img/quzi.png", price: 25000 },
    { id: 4, name: "Pasta", image: "img/pasta.png", price: 18000 },
    { id: 5, name: "Salad", image: "img/salad.png", price: 7000 },
    { id: 6, name: "Dolma", image: "img/dolma.png", price: 25000 },
  ];

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  function addToFavorites(item: FoodItem) {
    const existing = favorites.find((f) => f.id === item.id);

    if (existing) {
      // Increase quantity if already added
      setFavorites(
        favorites.map((f) => (f.id === item.id ? { ...f, qty: f.qty + 1 } : f))
      );
    } else {
      // Add new item
      setFavorites([...favorites, { ...item, qty: 1 }]);
    }
  }

  function removeFromFavorites(id: number) {
    setFavorites(favorites.filter((f) => f.id !== id));
  }

  function updateQty(id: number, qty: number) {
    if (qty <= 0) {
      removeFromFavorites(id);
      return;
    }

    setFavorites(favorites.map((f) => (f.id === id ? { ...f, qty } : f)));
  }

  const totalPrice = favorites.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Menu</h1>

      {/* Food Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">IQD{item.price}</p>

            <button
              onClick={() => addToFavorites(item)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Favorite Items */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Favorite Foods</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorites yet.</p>
        ) : (
          <div className="space-y-4">
            {favorites.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{f.name}</h3>
                    <p className="text-gray-600">
                      IQD{f.price} × {f.qty} ={" "}
                      <span className="font-bold">IQD{f.price * f.qty}</span>
                    </p>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(f.id, f.qty - 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                  >
                    -
                  </button>
                  <span className="px-3">{f.qty}</span>
                  <button
                    onClick={() => updateQty(f.id, f.qty + 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromFavorites(f.id)}
                    className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right text-xl font-bold mt-6">
              Total: IQD{totalPrice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
