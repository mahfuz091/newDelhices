import { createContext, useContext } from "react";

const Context = createContext({});
export const useRootContext = () => {
  return useContext(Context);
};

export default Context;
