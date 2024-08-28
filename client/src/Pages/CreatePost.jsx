import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
//import { preview } from "../assets";
import { FaImages } from "react-icons/fa";
import { getRandomPrompt } from "../utils";
import { useState } from "react";
import FormField from "../components/FormField";
import toast from "react-hot-toast";
function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await axios({
          method: "POST",
          url: `${import.meta.env.VITE_DEVELOPEMENT_SERVER}/api/v1/post`,
          Headers: { "Content-Type": "application/json" },
          data: form,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please provide prompt and name ");
    }
  }
  async function generateImage() {
    if (form.prompt.length > 10) {
      try {
        setGeneratingImg(true);
        const response = await axios.post(
          `${
            import.meta.env.VITE_DEVELOPEMENT_SERVER
          }/api/v1/stability/generate-image`,
          {
            prompt: form.prompt,
          }
        );
        setForm({
          ...form,
          photo: `data:image/png;base64,${response.data.image}`,
        });
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast.error(
        "Please provide a prompt or you can click on [surprise me] button"
      );
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSurpriseMe() {
    const randromPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randromPrompt });
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold dark:text-white text-[#222328] text-[32px]">
          Create Your Own Art
        </h1>
        <p className="mt-2  dark:text-[#e6e6e6] text-[#666e75] text-[15px] max-w-[600px] ">
          Make unique and eye-catching images with stability.ai and share your
          creations with the community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            disabled={loading || generatingImg}
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            disabled={loading || generatingImg}
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gra-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 w-[400px]  h-[400px] flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain "
              />
            ) : (
              <FaImages className="dark:text-white w-[200px] h-[200px] text-gray-400" />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center dark:bg-[rgba(245,245,245,0.6)] bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5 ">
          <button
            disabled={loading || generatingImg}
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {generatingImg ? "Generating ..." : "Generate"}
          </button>
        </div>
        <div className="mt-10 ">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want , you can share it with
            others in the community.
          </p>
          <button
            disabled={loading || generatingImg}
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md w-full text-sm sm:w-auto px-5 py-2.5 "
          >
            {loading ? "Sharing ..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
