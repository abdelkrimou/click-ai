/* eslint-disable react/prop-types */
import { downloadImage } from "../utils";
import { MdOutlineDownloading } from "react-icons/md";
function Card({ _id, name, photo, prompt }) {
  return (
    <div className="rounded-xl group  relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover group-hover:scale-[1.015] transition-all ease-in-out duration-300 opacity-95 group-hover:opacity-100 rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden  absolute bottom-0 left-0 right-0 bg-[#10131fd7] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex gap-2 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full uppercase object-cover bg-pink-500 flex  items-center justify-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <MdOutlineDownloading className="invert active:rotate-[360deg] text-3xl opacity-70 hover:opacity-100 mr-1 hover:scale-[1.04] transition-all ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
