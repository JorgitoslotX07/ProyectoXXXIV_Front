import CochesMapComponent from "../../components/CochesMapComponent/CochesMapComponent";

export const MapPage = () => {
  return (
    <div className="relative bg-[#111827]" >
      <div className="absolute inset-0 bg-[url('fondoMap.jpg')] bg-cover bg-center opacity-50"></div>
      <CochesMapComponent />
    </div>
  );
};
