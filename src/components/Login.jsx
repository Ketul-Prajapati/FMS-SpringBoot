import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Admin");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg relative">
        <img
          className="mx-auto mb-6 w-40 z-10"
          src="https://upload.wikimedia.org/wikipedia/en/b/bf/Msu_baroda_logo.png"
          alt="CSConnect"
          />
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">{selected} Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="loginid" className="block text-gray-600">
              {selected} Login ID
            </label>
            <input
              type="number"
              id="loginid"
              required
              className="mt-2 px-3 py-2 block w-full rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              {...register("loginid")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-2 px-3 py-2 block w-full rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 flex w-full justify-center text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login <FiLogIn className="ml-2 mt-1" />
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <button
            className={`mr-8 text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Student" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Student")}
          >
            Student
          </button>
          <button
            className={`mr-8 text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Faculty" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Faculty")}
          >
            Faculty
          </button>
          <button
            className={`text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Admin" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Admin")}
          >
            Admin
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Made with {" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Himil, Ketul, Preet, and Manav
          </p>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;