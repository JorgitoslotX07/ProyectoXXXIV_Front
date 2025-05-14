import type { FC } from "react";
import { Link } from "react-router-dom";

export const ProductosCatalogComponent: FC = () => {
  const products = [
    {
      id: 1,
      name: "Ford Mustang",
      description: "Coupe, Red, 2022",
      price: 35000,
      imageUrl: "https://picsum.photos/id/133/1500/1000",
      calificaciones: [4, 5, 4, 4, 5],
      caracteristicas: ["V8 Engine", "Convertible", "Bluetooth", "Apple CarPlay", "Leather Seats"],
    },
    {
      id: 2,
      name: "Tesla Model 3",
      description: "Sedan, White, 2023",
      price: 42000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [5, 5, 5, 4, 5],
      caracteristicas: ["Electric", "Autopilot", "Touchscreen", "Glass Roof", "Minimalistic Interior"],
    },
    {
      id: 3,
      name: "BMW X5",
      description: "SUV, Black, 2021",
      price: 58000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 4, 4, 5, 5],
      caracteristicas: ["All-wheel Drive", "Luxury Interior", "Sunroof", "Heated Seats", "Apple CarPlay"],
    },
    {
      id: 4,
      name: "Audi A4",
      description: "Sedan, Blue, 2020",
      price: 33000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 4, 3, 4, 4],
      caracteristicas: ["Turbocharged", "Leather Seats", "Heated Steering Wheel", "Sunroof", "Bluetooth"],
    },
    {
      id: 5,
      name: "Chevrolet Camaro",
      description: "Convertible, Yellow, 2022",
      price: 37000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 3, 4, 5, 5],
      caracteristicas: ["V8 Engine", "Sporty Design", "Leather Seats", "Convertible", "Touchscreen"],
    },
    {
      id: 6,
      name: "Toyota Supra",
      description: "Coupe, Silver, 2023",
      price: 44000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [5, 4, 5, 5, 4],
      caracteristicas: ["Turbocharged", "Sporty Handling", "Leather Seats", "Bluetooth", "Touchscreen"],
    },
    {
      id: 7,
      name: "Jeep Wrangler",
      description: "Off-road, Green, 2021",
      price: 40000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 5, 4, 4, 4],
      caracteristicas: ["Off-road Capability", "4WD", "Removable Roof", "Bluetooth", "Touchscreen"],
    },
    {
      id: 8,
      name: "Mercedes-Benz C-Class",
      description: "Sedan, White, 2022",
      price: 52000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [5, 5, 5, 5, 5],
      caracteristicas: ["Luxury Interior", "Heated Seats", "Apple CarPlay", "Panoramic Sunroof", "Leather Upholstery"],
    },
    {
      id: 9,
      name: "Porsche Cayman",
      description: "Sports, Red, 2023",
      price: 67000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [5, 5, 5, 5, 4],
      caracteristicas: ["Sports Performance", "Leather Seats", "Bluetooth", "Navigation System", "Sunroof"],
    },
    {
      id: 10,
      name: "Volkswagen Golf GTI",
      description: "Hatchback, Gray, 2020",
      price: 29000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 4, 4, 3, 5],
      caracteristicas: ["Turbocharged", "Sporty Handling", "Bluetooth", "Apple CarPlay", "Sunroof"],
    },
  ];
  

      

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-800 font-medium">{products.length} Products</p>
        <a href="#" className="text-sm text-gray-700 hover:underline">
          Show [A Cambiar ^^] products
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <Link to="/catalog/carDetail" state={product}>
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover h-full w-full"

              />
            </div>
            
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.description}</p>
            
            <p className="mt-2 font-bold">{product.price} €</p>
          </div>
          </Link>
        ))}
      </div>

    </>
  );
};
