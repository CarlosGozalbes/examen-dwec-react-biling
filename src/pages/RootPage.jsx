import { Outlet } from "react-router-dom";
import Header from "../components/Header";


const RootPage = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800">
     <Header/>
      <main className="flex-1 ">
        <Outlet />
      </main>
    
    </div>
  );
};

export default RootPage;
