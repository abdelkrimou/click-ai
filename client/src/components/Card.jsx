/* eslint-disable react/prop-types */
import { useState } from "react";
import { downloadImage } from "../utils";
import { TiHeartFullOutline } from "react-icons/ti";
import { MdOutlineDownloading } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
function Card({ _id, name, photo, prompt, likes }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  async function handleLike() {
    try {
      setIsLiked((prev) => !prev);
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_DEVELOPEMENT_SERVER}/api/v1/post/${_id}`,
        Headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      setLikeCount(response.data.data.likes);
      toast.success("Liked ♥");
    } catch (err) {
      console.log("Error liking the post:", err);
      setIsLiked((prev) => !prev);
      toast.error("Please try again !");
    }
  }
  return (
    <div className="rounded-xl group  relative shadow-card hover:shadow-cardhover card">
      <div
        onClick={isLiked ? undefined : handleLike}
        className="absolute hover:scale-[1.2] top-2 cursor-pointer transition-all duration-200 ease-in-out flex gap-1 justify-center items-center z-40 right-2 text-2xl text-white"
      >
        {likeCount > 0 && <span className="text-[13px]">+{likeCount}</span>}
        <TiHeartFullOutline
          className={`text-[32px] transition-all duration-200 ease-in-out ${
            isLiked ? "text-red-500 scale-[1.1]" : "text-white"
          }`}
        />
      </div>
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
