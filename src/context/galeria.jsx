import { createContext, useState } from "react";
/* import ImagesContext from "./ImagesContext"; */
export const ImagesContext = createContext()


// eslint-disable-next-line react/prop-types
const ImagesProvider = ({ children }) => {
  const [galeria, setGaleria] = useState({});
  /* function eliminarTarea() {} */
  return (
    <ImagesContext.Provider value={{ galeria, setGaleria }}>
      <>{children}</>
    </ImagesContext.Provider>
  );
};

export default ImagesProvider;
