import { useEffect, type FC, useState } from "react";
import { SubCategoriasComponent } from "../../components/SubCategoriasComponent/SubCategoriasComponent";
import { FiltrersCatalogComponent } from "../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ProductosCatalogComponent } from "../../components/ProductosCatalogComponent/ProductosCatalogComponent";
import { PageVehiculos, type PageProps } from "../../interfaces/PageProps";
import type { FiltroVehiculo, Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet } from "../../utils/apiService";
import { PaginacionComponent } from "../../components/PaginacionComponent/PaginacionComponent";

const mockPageVehiculos: PageProps<Vehiculo> = {
  totalPages: 1,
  totalElements: 20,
  first: true,
  last: true,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 20,
  pageable: {
    offset: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
  },
  empty: false,
  content: [
    {
      id: 1,
      marca: "Toyota",
      modelo: "Corolla",
      imagen: null,
      kilometraje: 30000,
      ultimaRevision: "2024-06-10",
      autonomia: 500,
      estado: "DISPONIBLE",
      latitud: 41.1476,
      longitud: 1.1111,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 2,
      marca: "Ford",
      modelo: "Focus",
      imagen: null,
      kilometraje: 45000,
      ultimaRevision: "2023-12-01",
      autonomia: 480,
      estado: "EN_USO",
      latitud: 41.1188,
      longitud: 1.2445,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 3,
      marca: "Renault",
      modelo: "Clio",
      imagen: null,
      kilometraje: 12000,
      ultimaRevision: "2025-02-15",
      autonomia: 600,
      estado: "DISPONIBLE",
      latitud: 41.2001,
      longitud: 1.3291,
      localidad: "Salou",
      puertas: "TRES",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 4,
      marca: "Seat",
      modelo: "Ibiza",
      imagen: null,
      kilometraje: 22000,
      ultimaRevision: "2024-11-10",
      autonomia: 520,
      estado: "EN_MANTENIMIENTO",
      latitud: 41.1444,
      longitud: 1.1011,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 5,
      marca: "Tesla",
      modelo: "Model 3",
      imagen: null,
      kilometraje: 8000,
      ultimaRevision: "2025-01-20",
      autonomia: 750,
      estado: "DISPONIBLE",
      latitud: 41.1589,
      longitud: 1.2123,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 6,
      marca: "Kia",
      modelo: "Ceed",
      imagen: null,
      kilometraje: 35000,
      ultimaRevision: "2023-07-18",
      autonomia: 470,
      estado: "DISPONIBLE",
      latitud: 41.1956,
      longitud: 1.351,
      localidad: "Salou",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 7,
      marca: "Hyundai",
      modelo: "i30",
      imagen: null,
      kilometraje: 18000,
      ultimaRevision: "2024-09-12",
      autonomia: 490,
      estado: "EN_USO",
      latitud: 41.1302,
      longitud: 1.1447,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 8,
      marca: "Volkswagen",
      modelo: "Golf",
      imagen: null,
      kilometraje: 28000,
      ultimaRevision: "2024-03-25",
      autonomia: 510,
      estado: "DISPONIBLE",
      latitud: 41.1223,
      longitud: 1.2345,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 9,
      marca: "Opel",
      modelo: "Astra",
      imagen: null,
      kilometraje: 15000,
      ultimaRevision: "2025-05-01",
      autonomia: 530,
      estado: "DISPONIBLE",
      latitud: 41.1602,
      longitud: 1.1502,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 10,
      marca: "Peugeot",
      modelo: "208",
      imagen: null,
      kilometraje: 10000,
      ultimaRevision: "2025-03-08",
      autonomia: 550,
      estado: "EN_MANTENIMIENTO",
      latitud: 41.1804,
      longitud: 1.2987,
      localidad: "Salou",
      puertas: "TRES",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 11,
      marca: "Citroën",
      modelo: "C3",
      imagen: null,
      kilometraje: 32000,
      ultimaRevision: "2024-08-10",
      autonomia: 460,
      estado: "DISPONIBLE",
      latitud: 41.1777,
      longitud: 1.2777,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 12,
      marca: "Mazda",
      modelo: "3",
      imagen: null,
      kilometraje: 25000,
      ultimaRevision: "2024-04-15",
      autonomia: 490,
      estado: "DISPONIBLE",
      latitud: 41.1199,
      longitud: 1.2098,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 13,
      marca: "Honda",
      modelo: "Civic",
      imagen: null,
      kilometraje: 29000,
      ultimaRevision: "2024-10-03",
      autonomia: 500,
      estado: "EN_USO",
      latitud: 41.1555,
      longitud: 1.1888,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 14,
      marca: "BMW",
      modelo: "Serie 1",
      imagen: null,
      kilometraje: 21000,
      ultimaRevision: "2025-04-20",
      autonomia: 540,
      estado: "DISPONIBLE",
      latitud: 41.11,
      longitud: 1.22,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 15,
      marca: "Mercedes",
      modelo: "Clase A",
      imagen: null,
      kilometraje: 17000,
      ultimaRevision: "2025-02-28",
      autonomia: 560,
      estado: "EN_USO",
      latitud: 41.1256,
      longitud: 1.2655,
      localidad: "Salou",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 16,
      marca: "Audi",
      modelo: "A3",
      imagen: null,
      kilometraje: 22000,
      ultimaRevision: "2024-12-30",
      autonomia: 530,
      estado: "DISPONIBLE",
      latitud: 41.1854,
      longitud: 1.1952,
      localidad: "Tarragona",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 17,
      marca: "Skoda",
      modelo: "Fabia",
      imagen: null,
      kilometraje: 27000,
      ultimaRevision: "2023-10-10",
      autonomia: 450,
      estado: "EN_MANTENIMIENTO",
      latitud: 41.1901,
      longitud: 1.2702,
      localidad: "Salou",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 18,
      marca: "Nissan",
      modelo: "Leaf",
      imagen: null,
      kilometraje: 14000,
      ultimaRevision: "2025-05-10",
      autonomia: 600,
      estado: "DISPONIBLE",
      latitud: 41.1654,
      longitud: 1.2456,
      localidad: "Reus",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
    {
      id: 19,
      marca: "Fiat",
      modelo: "500",
      imagen: null,
      kilometraje: 11000,
      ultimaRevision: "2024-11-01",
      autonomia: 430,
      estado: "DISPONIBLE",
      latitud: 41.1455,
      longitud: 1.1987,
      localidad: "Tarragona",
      puertas: "TRES",
      tipo: "TURISMO",
      esAccesible: false,
    },
    {
      id: 20,
      marca: "Dacia",
      modelo: "Sandero",
      imagen: null,
      kilometraje: 20000,
      ultimaRevision: "2024-09-09",
      autonomia: 470,
      estado: "EN_USO",
      latitud: 41.1333,
      longitud: 1.1777,
      localidad: "Salou",
      puertas: "CINCO",
      tipo: "TURISMO",
      esAccesible: true,
    },
  ],
};

export const CatalogPage: FC = () => {
  const [vehiculos, setVehiculos] =
    useState<PageProps<Vehiculo>>(PageVehiculos);

  const [vehiculosFiltrados, setVehiculosFiltrados] =
    useState<PageProps<Vehiculo>>(PageVehiculos);

  const [filtrosActivos, setFiltrosActivos] = useState<
    Partial<Record<FiltroVehiculo, string | number | boolean>>
  >({});

  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [vehiculosVisibles, setVehiculosVisibles] =
    useState<PageProps<Vehiculo>>(PageVehiculos);

  function actualizarVehiculosVisibles() {
    const visibles = vehiculosFiltrados.content.slice(
      paginaActual * pageSize,
      (paginaActual + 1) * pageSize
    );

    setVehiculosVisibles({
      ...vehiculosFiltrados,
      content: visibles,
      number: paginaActual,
      totalPages: Math.ceil(vehiculosFiltrados.content.length / pageSize),
    });
  }


  useEffect(() => {
    const fetchAllPages = async () => {
      const pageSize = 20;
      let currentPage = 0;
      let totalPages = 1;
      let allData: Vehiculo[] = [];
      let lastResponse: PageProps<Vehiculo> | null = null;

      while (currentPage < totalPages) {
        // const response = await httpGet<PageProps<Vehiculo>>(
        //   `/vehiculos?page=${currentPage}&size=${pageSize}`
        // );
        const response = mockPageVehiculos;


        if (response) {
          allData = [...allData, ...response.content];
          totalPages = response.totalPages;
          currentPage++;
          lastResponse = response;
        } else {
          console.error("Fallo al obtener los datos de la página", currentPage);
          break;
        }
      }

      const allDataAsPage: PageProps<Vehiculo> = {
        ...lastResponse!,
        content: allData,
        totalElements: allData.length,
        totalPages: 1, // Ya no es relevante
        number: 0,
      };

      setVehiculos(allDataAsPage);
      setVehiculosFiltrados(allDataAsPage);
    };

    fetchAllPages();
  }, []);

  useEffect(() => {
    actualizarVehiculosVisibles();
  }, [paginaActual, pageSize, vehiculosFiltrados]);

  // useEffect(() => {
  //   const fetchAllPages = async () => {
  //     const pageSize = 20;
  //     let currentPage = 0;
  //     let totalPages = 1;
  //     let allData: Vehiculo[] = [];
  //     const lastResponse: PageProps<Vehiculo> | null = null;

  //     while (currentPage < totalPages) {
  //       const response = await httpGet<PageProps<Vehiculo>>(
  //         `/vehiculos?page=${currentPage}&size=${pageSize}`
  //       );

  //       if (response) {
  //         allData = [...allData, ...response.content];
  //         totalPages = response.totalPages;
  //         currentPage++;
  //       } else {
  //         console.error("Fallo al obtener los datos de la página", currentPage);
  //         break;
  //       }
  //     }

  //     const allDataAsPage: PageProps<Vehiculo> = {
  //       ...lastResponse!,
  //       content: allData,
  //       totalElements: allData.length,
  //       totalPages: 1, // Ya no es relevante
  //       number: 0,
  //     };

  //     setVehiculos(allDataAsPage);
  //     setVehiculosFiltrados(allDataAsPage);
  //   };

  //   fetchAllPages();
  // }, []);

  function actualizarFiltro(
    clave: FiltroVehiculo,
    valor: string | number | boolean
  ) {
    const nuevosFiltros = {
      ...filtrosActivos,
      [clave]: valor,
    };

    if (valor === "" || valor === null) {
      delete nuevosFiltros[clave];
    }

    setFiltrosActivos(nuevosFiltros);

    const contenidoFiltrado = vehiculos.content.filter((vehiculo) => {
      return Object.entries(nuevosFiltros).every(([clave, valor]) => {
        const propiedad = vehiculo[clave as keyof Vehiculo];

        switch (clave as FiltroVehiculo) {
          case "marca":
          case "modelo":
          case "estado":
          case "tipo":
          case "localidad":
            return typeof propiedad === "string"
              ? propiedad
                .toLowerCase()
                .includes((valor as string).toLowerCase())
              : false;
          case "esAccesible":
            return (
              vehiculo.esAccesible === (valor === true || valor === "true")
            );
          case "autonomiaMin":
            return vehiculo.autonomia >= (valor as number);
          case "autonomiaMax":
            return vehiculo.autonomia <= (valor as number);
          default:
            return true;
        }
      });
    });

    setVehiculosFiltrados({
      ...vehiculos,
      content: contenidoFiltrado,
    });

    actualizarVehiculosVisibles();
  }

  return (
    <>
      <div className="bg-[#111827]" >
        <div>
          <SubCategoriasComponent />
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 bg-[url('fondoCatalog.jpeg')] bg-cover bg-center opacity-20"
          ></div>
          <div className="relative z-10 text-white p-10">
            <div>
              <FiltrersCatalogComponent
                onFilterChange={actualizarFiltro}
                vehiculos={vehiculos}
                vertical={false}
              />
            </div>

            <div className="mt-3">
              <ProductosCatalogComponent vehiculos={vehiculosVisibles} />
            </div>
          </div>

          <div className="mt-10 px-10 pb-20">
            <PaginacionComponent
              currentPage={paginaActual}
              totalItems={vehiculosFiltrados.content.length}
              pageSize={pageSize}
              onPageChange={(p) => setPaginaActual(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPaginaActual(0);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
