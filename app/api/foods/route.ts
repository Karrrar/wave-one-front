import { NextResponse } from "next/server";

export async function GET() {
  const items = [
    { id: 1, name: "Pizza", image: "img/pizza.png", price: 16000 },
    { id: 2, name: "Burger", image: "img/burger.png", price: 3500 },
    { id: 3, name: "Quzi", image: "img/quzi.png", price: 25000 },
    { id: 4, name: "Pasta", image: "img/pasta.png", price: 18000 },
    { id: 5, name: "Salad", image: "img/salad.png", price: 7000 },
    { id: 6, name: "Dolma", image: "img/dolma.png", price: 25000 },
  ];

  return NextResponse.json(items);
}
