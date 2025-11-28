"use client";
import { useState, useEffect } from "react";

type FoodItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type FavoriteItem = {
  id: number;
  food_id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
};

export default function FoodMenu() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load foods & favorites from API
  useEffect(() => {
    async function load() {
      const foodsRes = await fetch("http://localhost:4000/foods");
      const favRes = await fetch("http://localhost:4000/favorites");

      setFoods(await foodsRes.json());
      setFavorites(await favRes.json());
      setLoading(false);
    }
    load();
  }, []);

  // Add item to favorites
  async function addToFavorites(food: FoodItem) {
    const res = await fetch("http://localhost:4000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ food_id: food.id }),
    });

    const updated = await res.json();

    // Refresh list
    const favRes = await fetch("http://localhost:4000/favorites");
    setFavorites(await favRes.json());
  }

  // Update quantity
  async function updateQty(id: number, qty: number) {
    if (qty < 1) return;

    await fetch(`http://localhost:4000/favorites/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty }),
    });

    const favRes = await fetch("http://localhost:4000/favorites");
    setFavorites(await favRes.json());
  }

  // Remove favorite
  async function removeFavorite(id: number) {
    await fetch(`http://localhost:4000/favorites/${id}`, {
      method: "DELETE",
    });

    setFavorites(favorites.filter((f) => f.id !== id));
  }

  const totalPrice = favorites.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Menu</h1>

      {/* Foods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((item) => (
          <div key={item.id} className="border rounded-xl shadow-sm p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">IQD {item.price}</p>

            <button
              onClick={() => addToFavorites(item)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Favorite Foods</h2>

        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between border p-4 rounded-lg mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg">{f.name}</h3>
                  <p>
                    IQD {f.price} × {f.qty} ={" "}
                    <strong>IQD {f.price * f.qty}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(f.id, f.qty - 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                  -
                </button>
                <span>{f.qty}</span>
                <button
                  onClick={() => updateQty(f.id, f.qty + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                  +
                </button>

                <button
                  onClick={() => removeFavorite(f.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded ml-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        <div className="text-right text-xl font-bold">
          Total: IQD {totalPrice}
        </div>
      </div>
    </div>
  );
}
