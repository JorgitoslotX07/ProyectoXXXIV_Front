import type { FC } from "react";

export const ProductosCatalogComponent: FC = () => {
      const products = [
        {
          name: "Ford Mustang",
          description: "Coupe, Red, 2022",
          price: 35000,
        },
        {
          name: "Tesla Model 3",
          description: "Sedan, White, 2023",
          price: 42000,
        },
        {
          name: "BMW X5",
          description: "SUV, Black, 2021",
          price: 58000,
        },
        {
          name: "Audi A4",
          description: "Sedan, Blue, 2020",
          price: 33000,
        },
        {
          name: "Chevrolet Camaro",
          description: "Convertible, Yellow, 2022",
          price: 37000,
        },
        {
          name: "Toyota Supra",
          description: "Coupe, Silver, 2023",
          price: 44000,
        },
        {
          name: "Jeep Wrangler",
          description: "Off-road, Green, 2021",
          price: 40000,
        },
        {
          name: "Mercedes-Benz C-Class",
          description: "Sedan, White, 2022",
          price: 52000,
        },
        {
          name: "Porsche Cayman",
          description: "Sports, Red, 2023",
          price: 67000,
        },
        {
          name: "Volkswagen Golf GTI",
          description: "Hatchback, Gray, 2020",
          price: 29000,
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
        {products.map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>
            
            <h3 className="font-semibold text-sm">Product Name</h3>
            <p className="text-xs text-gray-500">Description, color, size</p>
            
            <p className="mt-2 font-bold">$95</p>
          </div>
        ))}
      </div>

    </>
  );
};
