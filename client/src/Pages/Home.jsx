/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import Card from "../components/Card";
import axios from "axios";
import toast from "react-hot-toast";
function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const serverurl = import.meta.env.VITE_DEVELOPEMENT_SERVER;
    console.log(serverurl);
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_DEVELOPEMENT_SERVER}/api/v1/post`,
          Headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          setAllPosts(response.data.data.reverse());
        }
      } catch (err) {
        console.log(err);
        toast.error("There was an issue with uploading posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }
    return <h2 className="mt-5 text-[#6449ff] text-xl uppercase">{title}</h2>;
  };

  const handlSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchedResults(
      allPosts.filter(
        (post) =>
          post.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          post.prompt.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold  dark:text-white text-[#222328] text-[32px]">
          Explore the Community Gallery
        </h1>
        <p className="mt-2 dark:text-[#e6e6e6] text-[#666e75] text-[15px] max-w-[600px] ">
          Discover a variety of creative and beautiful images brought to life by
          you and other friends through stability.ai.
          <span className="text-sm ml-3 underline text-gray-400">
            Free to download
          </span>
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handlSearchChange}
        />
      </div>

      <div className="mt-10 font-semibold">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
