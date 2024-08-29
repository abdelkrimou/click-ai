import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Logo from "./components/Logo";
import NavBtn from "./components/NavBtn";
import PageNotFound from "./Pages/PageNotFound";
import { IoIosArrowUp } from "react-icons/io";
function App() {
  return (
    <BrowserRouter>
      <header className="w-full dark:bg-[#1f2125] border-b bg-white sm:px-8 px-4 py-4  dark:border-b-[#373737] ">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed transition-all ease-in-out hover:scale-[1.1] text-2xl cursor-pointer bottom-8 text-white hover:opacity-100 bg-red-500 opacity-60 z-50 flex justify-center items-center right-8 w-[50px] h-[50px] rounded-full "
        >
          <IoIosArrowUp />
        </div>
        <div className="max-w-[1200px] m-auto flex flex-wrap gap-4 justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <NavBtn />
        </div>
      </header>
      <main className="pb-16 sm:px-8 px-4 py-8 w-full dark:bg-[#1a1b1f] bg-[#f9fafe] min-h-[calc(100vh-88px-87px)]">
        <div className="max-w-[1200px] m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
      <footer className=" dark:text-white dark:bg-[#1f2125] border-t dark:border-t-[#373737] px-4  text-[16px] py-4">
        <div className="flex gap-3 flex-wrap flex-row justify-between items-center max-w-[1200px] m-auto">
          <Logo />
          <p className=" font-light text-end w-fit text-[#666e75] ml-auto">
            © {new Date().getFullYear()} by Abdelkrim Ouaaddi (wakam).
          </p>
        </div>
      </footer>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          duration: 5000,
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontFamily: "Inter, sans-serif",
            maxWidth: "600px",
            padding: "16px 24px",
            backgroundColor: "#f9fafe",
            color: "#000000",
            borderRadius: "10px",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
