import { useContext } from "react";
import { ImagesContext } from "../context/galeria";
import { BsStar, BsStarFill } from "react-icons/bs";
import { editGaleria } from "../firebase/examenReactCarlosApi";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";

function GalleryPage() {
  const { galeria, setGaleria } = useContext(ImagesContext);
  
  const addToFavourite = (index) => {
    console.log("Adding to favorite:", index);
    const updatedGaleria = { ...galeria };
    updatedGaleria.favoritas[index] = true;
    console.log("Updated galeria:", updatedGaleria);
    editGaleria(galeria.id,updatedGaleria)
    setGaleria(updatedGaleria);
   
  };
  const removeFromFavourite = (index) => {
    const updatedGaleria = {...galeria};
    updatedGaleria.favoritas[index] = false;
    editGaleria(galeria.id,updatedGaleria)
    setGaleria(updatedGaleria);
  
  };
  return (
    <>
    
    <div className=" flex-grow bg-white  shadow dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-center w-full mx-auto max-w-screen-xl  md:flex md:items-center md:justify-between ">
        {galeria.imagenes?.map((element, i) => (
          <ImageCard 
          index={i}
          key={galeria.id + i} 
          element={element} 
          favorita={galeria.favoritas[i]} 
          addToFavourite={addToFavourite}  
          removeFromFavourite={removeFromFavourite} 
          />    
       ))}
        </div>
    </div>
      
    </>
  );
}

export default GalleryPage;
