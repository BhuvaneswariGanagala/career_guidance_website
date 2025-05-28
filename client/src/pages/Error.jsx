import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <section
      id="error-page"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      <div className="text-center bg-white shadow-lg rounded-xl p-8 max-w-md">
        <h2 className="text-7xl font-bold text-red-600 mb-4">404</h2>
        <h4 className="text-2xl font-semibold mb-2 text-gray-800">
          Sorry! Page not found
        </h4>
        <p className="text-gray-600 mb-6">
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it, and we'll
          look into it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return Home
          </NavLink>
          <NavLink
            to="/contact"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Report Problem
          </NavLink>
        </div>
      </div>
    </section>
  );
};
