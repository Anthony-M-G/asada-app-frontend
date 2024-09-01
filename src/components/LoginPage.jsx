import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function LogingPage() {
  const { register, handleSubmit } = useForm();
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { username, cedula, password } = data;
    await signIn(username, cedula, password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/receipts");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-2xl self-auto font-semibold text-center my-4 text-white">
        ASADA POCHOTE ADMIN
      </h1>

      <form
        className="bg-blue-200 gap-4 flex flex-col max-w-screen-md  p-10 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("username")}
          placeholder="Username"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          {...register("cedula")}
          placeholder="Cédula"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          className="bg-slate-800 text-white p-2 rounded hover:bg-slate-900 transition-colors duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
