import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import DarkModeToggle from "./DarkModeToggle";

function NavBtn() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create-post";
  return (
    <>
      <div
        to="/create-post"
        className="font-inter sm:ml-auto sm:w-fit w-full  items-center order-3 tracking-wide text-md font-light text-[16px] bg-[#6469ff] hover:bg-[#585efc] text-white rounded-md "
      >
        {!isCreatePage ? (
          <Link
            to="/create-post"
            className=" flex items-center  sm:justify-start justify-center gap-3 sm:px-5 p-3"
          >
            <FaPlus className="inline-block" /> Create
          </Link>
        ) : (
          <Link
            to="/"
            className=" flex items-center min-w-[200px] gap-3 justify-center p-3"
          >
            <GrGallery className="inline-block" /> Browse Gallery
          </Link>
        )}
      </div>
      <DarkModeToggle />
    </>
  );
}

export default NavBtn;
