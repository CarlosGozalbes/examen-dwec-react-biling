import {
    GoogleAuthProvider,
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  const examenCollection = collection(db, "ExamenReact-carlos");
  
  // ---------- Cargar productos ------------------
  
  export const getDocuments = async () => {
    try {
      const data = await getDocs(examenCollection);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error getting documents", error);
      throw error;
    }
  };

  export const queryDocuments = async (searchTerm) => {
    try {
        const q =  query(examenCollection, where("URL", "==", searchTerm));
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        console.error("Error getting documents", error);
        throw error;
      }
  }
  
  // ---------- Cargar un producto -------------
  export const getProductById = async (productId) => {
    try {
      const productDocRef = doc(examenCollection, productId);
      const productDoc = await getDoc(productDocRef);
      console.log("ProductDocRef -->", productDocRef);
      console.log("productDoc-->", productDoc);
      if (productDoc.exists()) {
        return { ...productDoc.data(), id: productDoc.id };
      } else {
        console.error("Producto no encontrado");
        return null;
        // o un throw error
      }
    } catch (error) {
      console.log("Error al obtener el producto", error);
      throw error;
    }
  };
  
  // ---------- Crear (ADD) entrada de productos ----------
  export const addGaleria = async (galeriaData) => {
    try {
      const docRef = await addDoc(examenCollection, galeriaData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding producto", error);
      throw error;
    }
  };
  
  // ------------ Actualizar un producto ------------
  
  export const editGaleria = async (id, newData) => {
    try {
      // crear una referencia al documento donde está esa iD
      const galeriaDocRef = doc(examenCollection, id);
      // actualizamos.
      await updateDoc(galeriaDocRef, newData);
    } catch (error) {
      console.log("Error updating product", error);
      throw error;
    }
  };
  
  // ---------- Eliminar entrada de productos ----------
  export const deleteProducto = async (id) => {
    try {
      const productDocRef = doc(examenCollection, id);
      await deleteDoc(productDocRef);
    } catch (error) {
      console.log("Error deleting product", error);
      throw error;
    }
  };
  
  // --- Validar la entrada con Google.
  
  export const signInWithGoogle = async (signInFirebase, setError, navigate) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      // Tipo de persistencia que tenemos con la sesión de google.
      // a nivel Local, a niver de session y sin persistencia. browserLocalPersistence
      // a nivel de session :
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      console.log("result--->", result);
      const user = result._tokenResponse;
      // setear mi estado con el usuario
      signInFirebase(user);
      console.log("usuario: -->", user);
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión con Google");
    }
  };
  
  // ------------ Cerrar sesión en Google ------------
  
  export const cerrarSesion = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.log("Error al iniciar sesión con Google", error);
      return false;
    }
  };
  