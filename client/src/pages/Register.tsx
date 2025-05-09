import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks.ts";
import {fetchRegister} from "../../redux/slices/authSlice";
import {useForm} from "react-hook-form";
import React from "react";
import {RegisterValuesType} from "../types.ts";
// import {useForm} from "react-hook-form";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: RegisterValuesType) => {
      const data = await dispatch(fetchRegister(values));

      // console.log(data);

      if (!data.payload) {
        alert('Registration failed');
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
  }

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
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text"
            placeholder="username"
            {...register("fullName", { required: "Enter your username" })}
          />
          {errors.fullName?.message}
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
            type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;