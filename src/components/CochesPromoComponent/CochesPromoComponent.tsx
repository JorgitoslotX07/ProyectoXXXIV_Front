import type { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  modoClaro: boolean;
}

export const CochesPromoComponent: FC<Props> = ({ modoClaro }) => {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      name: "Ford Mustang",
      description: "Coupe, Red, 2022",
      price: 35000,
      imageUrl: "https://picsum.photos/id/133/1500/1000",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      description: "Sedan, White, 2023",
      price: 42000,
      imageUrl: "https://picsum.photos/id/133/185/128",
    },
    {
      id: 3,
      name: "BMW X5",
      description: "SUV, Black, 2021",
      price: 58000,
      imageUrl: "https://picsum.photos/id/133/185/128",
    },
    {
      id: 4,
      name: "Audi A4",
      description: "Sedan, Blue, 2020",
      price: 33000,
      imageUrl: "https://picsum.photos/id/133/185/128",
    },
  ];

  return (
    <div className="px-4 py-10">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{
          color: modoClaro ? "#FFD700" : "#C4B5FD",
          // textShadow: modoClaro
          //   ? "1px 1px 4px rgba(0,0,0,0.4)"
          //   : "1px 1px 4px rgba(196, 181, 253, 0.4)",
        }}
      >
        {t("promo.title")}
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product, index) => (
          <Link to="/catalog/carDetail" state={product} key={index}>
            <div
              className={`p-4 rounded-lg shadow-lg transition-shadow duration-300 w-64 ${
                modoClaro ? "bg-gray-100" : "bg-[#1F2937]"
              }`}
            >
              <div
                className={`h-40 mb-4 rounded overflow-hidden flex items-center justify-center ${
                  modoClaro ? "bg-gray-300" : "bg-[#374151]"
                }`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3
                className={`font-semibold text-base ${
                  modoClaro ? "text-[#111827]" : "text-[#FBCFE8]"
                }`}
              >
                {product.name}
              </h3>
              <p
                className={`text-sm line-clamp-2 ${
                  modoClaro ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {product.description}
              </p>

              <p
                className={`mt-2 font-bold ${
                  modoClaro ? "text-green-700" : "text-[#A7F3D0]"
                }`}
              >
                {product.price} €
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
