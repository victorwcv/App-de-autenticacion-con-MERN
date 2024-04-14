import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/* Define the Header component */
export default function Header() {
  /* Get current user data from Redux store */
  const { currentUser } = useSelector((state) => state.user);
  /* Get current location */
  const location = useLocation();

   /* Return JSX for the Header component */
  return (
    <div className="fixed top-0 left-0 w-full bg-blue-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl h-14 mx-auto  px-3">
        {/* Logo */}
        <Link to={"/"}>
          <h1 className="font-semibold text-xl text-neutral-950">App de Autenticación</h1>
        </Link>
         {/* Navigation links */}
        <ul className="flex gap-4">
          <Link to={"/"} className={location.pathname === "/" ? "active" : ""}>
            <li
              className={`text-neutral-600 hover:text-neutral-950 ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Bienvenido
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              className={`text-neutral-600 hover:text-neutral-950 ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              Explora{" "}
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="User photo"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li
                className={`text-neutral-600 hover:text-neutral-950 ${
                  location.pathname === "/sign-up"
                    ? "active"
                    : location.pathname === "/sign-in"
                    ? "active"
                    : ""
                }`}
              >
                Registrarse
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
