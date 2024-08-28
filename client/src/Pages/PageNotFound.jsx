import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function PageNotFound() {
  return (
    <div className="text-center">
      <h3 className="text-xl font-medium">Oops! Page Not Found</h3>
      <p className="max-w-[500px] m-auto mt-6 text-gray-500">
        We can't seem to find the page you are looking for. It might have been
        moved, deleted, or perhaps it never existed.
      </p>
      <Link to="/">
        <p className="mt-4 underline hover:scale-[1.02] transition-all duration-200 ease-in-out">
          Head back to our homepage and start fresh.
        </p>
      </Link>
      <p className="mt-5">
        or click here{" "}
        <Link
          to="/create-post"
          className="border  px-2 py-1 rounded-lg border-gray-400"
        >
          + Create
        </Link>{" "}
        to start generating images
      </p>
    </div>
  );
}

export default PageNotFound;
