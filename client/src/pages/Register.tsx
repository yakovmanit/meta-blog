import {Link} from "react-router-dom";

const Register = () => {
  return (
    <div className="mx-auto sm:max-w-2/3 md:max-w-1/2">
      <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
        Register
      </h2>
      <div className="mb-2 md:mb-4">
        Have an account?
        <Link className="text-primary ml-1 font-semibold" to={'/login'}>
          Login
        </Link>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
          />
          {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;