import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import DarkModeToggle from "./DarkModeToggle";

function NavBtn() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create-post";
  console.log(isCreatePage);
  return (
    <div className="flex gap-2">
      <div
        to="/create-post"
        className="font-inter tracking-wide text-md font-light text-[16px] bg-[#6469ff] hover:bg-[#585efc] text-white rounded-md "
      >
        {!isCreatePage ? (
          <Link
            to="/create-post"
            className=" flex items-center gap-2  px-4 py-2"
          >
            <FaPlus className="inline-block" /> Create
          </Link>
        ) : (
          <Link to="/" className=" flex items-center gap-3 px-4 py-2">
            <GrGallery className="inline-block" /> Browse Gallery
          </Link>
        )}
      </div>
      <DarkModeToggle />
    </div>
  );
}

export default NavBtn;
