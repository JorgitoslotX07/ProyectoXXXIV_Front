export type State = {
  user: string | null;
  setUser: (user: string) => void;
  token: string | null;
  setToken: (user: string) => void;
};
