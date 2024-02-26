import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import { ImagesContext } from "./context/galeria";
import RootPage from "./pages/RootPage";
function App() {
  const { galeria, setGaleria } = useContext(ImagesContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "/home", element: <HomePage /> },

        {
          element: (
            <ProtectedRoute isActive={!!galeria.URL} redirectPath="/home" />
          ),
          children: [{ path: "/gallery", element: <GalleryPage /> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
