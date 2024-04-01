import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="E-mail"
          id="email"
          className="bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-gray-100 p-3 rounded-lg"
        />
        <button className="bg-gray-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex gap-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
