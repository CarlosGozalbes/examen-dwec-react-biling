import { useContext, useState } from "react";
import { addGaleria, queryDocuments } from "../firebase/examenReactCarlosApi";
import Swal from "sweetalert2";
import {Spinner} from '../components/Spinner'
import { Navigate, useNavigate } from "react-router-dom";
import { ImagesContext } from "../context/galeria";
import Header from "../components/Header";

/* import useJsonImageURL from "../hooks/useJsonImageUrl"; */
function HomePage() {
  /*  const { loading, galleryData, error, getImageURLs } = useJsonImageURL() */
  const [URL, setURL] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const navigate = useNavigate()
  const {galeria, setGaleria} = useContext(ImagesContext)
  const handleSearch = async (e) => {
    e.preventDefault();
    const galerias = await queryDocuments(URL);
    if (galerias.length === 0) {
      console.log("hola");
      const { isConfirmed } = await Swal.fire({
        title: "URL No encontrada",
        text: "¿Quieres añadir esta URL?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (isConfirmed) {
        /*  const data = {
                URL: URL,
                favoritas: [],
                imagenes:[]
            } */
        try {
          setLoading(true);
          const response = await fetch(URL);
          if (!response.ok) {
            throw new Error("Error fecheando: " + response);
          }
          const data = await response.json();
          setGalleryData(data.results);
          console.log(galleryData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }

        if (galleryData.length > 0) {
          const getImageURLs = () => {
            const imageUrls = [];
            /* galleryData.forEach((data) => { 
                imageUrls.push(data.image)
            }) */
            const findImageKey = (obj) => {
              if (Array.isArray(obj)) {
                obj.forEach((item) => findImageKey(item));
              } else if (typeof obj === "object" && obj !== null) {
                Object.keys(obj).forEach((key) => {
                  if (key === "image" /* && (obj[key].endsWith(".jpg") || obj[key].endsWith(".png") || obj[key].endsWith(".jpeg") ) */) {
                    imageUrls.push(obj[key]);
                  } else {
                    findImageKey(obj[key]);
                  }
                });
              }
            };

            findImageKey(galleryData);
            console.log(imageUrls);
            return imageUrls;
          };

          const imagenes = getImageURLs();

          console.log(imagenes);
          const arrayfavoritas = Array(imagenes.length).fill(false);
          const dataPost = {
                URL:URL,
                favoritas:arrayfavoritas,
                imagenes:imagenes
              
          }
          console.log(dataPost);
           await addGaleria(dataPost)
        } else {
          setError("URL no devuelve json y no ha sido añadida a tu colección");
        }
      } else {
        setURL("")
      }
    } else {
        setGaleria(galerias[0])
        navigate('/gallery')
    }
   
  };
  return (
    <>
    {loading ? (
      <Spinner/>
    ) :(
       <form className="max-w-md mx-auto mt-10" onSubmit={handleSearch}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" value={URL} onChange={(e) => setURL(e.target.value)}   placeholder="url" required id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div> 
    {error && <div className="text-amber-400	">{error}</div>}
</form>
    )}
   

     
    </>
  );
}

export default HomePage;
