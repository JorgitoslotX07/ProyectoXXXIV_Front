import type { FC } from "react";
import { SubCategoriasComponent } from "../../components/SubCategoriasComponent/SubCategoriasComponent";
import { FiltrersCatalogComponent } from "../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ProductosCatalogComponent } from "../../components/ProductosCatalogComponent/ProductosCatalogComponent";

export const CatalogPage: FC = () => {


  return (
    <>

      <div className="mt-10 px-10">
        <SubCategoriasComponent />
      </div>

      <div className="mt-10 px-10">
        <FiltrersCatalogComponent />
      </div>

      <div className="mt-3 px-10">
        <ProductosCatalogComponent />
      </div>
{/* 
      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div> */}


    </>
  );
};
