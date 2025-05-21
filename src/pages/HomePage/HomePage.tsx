import { type FC } from "react";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";

export const HomePage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  return (
    <>
      <SearchFastComponent
        onClickOptionsPerfil={onClickOptionsPerfil}
        onLoginClick={onLoginClick}
      />
      <div className="mt-20 px-10">
        <NoticiasComponent />
      </div>

      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div>
    </>
  );
};
