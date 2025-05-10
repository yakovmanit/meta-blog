import {useForm} from "react-hook-form";
import {LoginValuesType} from "../types.ts";
import {fetchLogin} from "../../redux/slices/authSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Navigate} from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => Boolean(state.auth.data));

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: LoginValuesType) => {
    const data = await dispatch(fetchLogin(values));

    // console.log(data);

    if (!data.payload) {
      alert('Registration failed');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="mx-auto sm:max-w-2/3 md:max-w-1/2">
      <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            {...register("email", { required: "Enter your email" })}
          />
          {errors.email?.message}
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
            {...register("password", { required: "Enter your password" })}
          />
          {errors.password?.message}
          {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;