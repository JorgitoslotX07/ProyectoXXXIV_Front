import type { UsuarioCompleto } from "./Usuario";
import type { Vehiculo } from "./Vehiculo";

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: SortInfo;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageProps<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}


export function createEmptyPage<T>(): PageProps<T> {
  // Como esos campos son comunes, los inicializamos aquí “a mano”.
  return {
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
    size: 0,
    content: [] as T[],
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    numberOfElements: 0,
    pageable: {
      offset: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      pageNumber: 0,
      pageSize: 0,
      paged: true,
      unpaged: false,
    },
    empty: true,
  };
}
