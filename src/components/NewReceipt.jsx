// src/components/NewReceipt.jsx

import { useForm, Controller } from "react-hook-form";
import { createReceipt } from "../api/config";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const years = [2023, 2024, 2025, 2026, 2027];

const NewReceipt = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      cedula: "",
      celular: "",
      isPaid: false,
      month: currentMonth,
      year: currentYear.toString(),
      amount: 150.75,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createReceipt(data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 space-y-4 bg-white shadow-lg rounded-lg"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="cedula"
          className="block text-sm font-medium text-gray-700"
        >
          Cedula
        </label>
        <Controller
          name="cedula"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Cedula"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="celular"
          className="block text-sm font-medium text-gray-700"
        >
          Celular
        </label>
        <Controller
          name="celular"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Celular"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          )}
        />
      </div>

      <div className="flex items-center">
        <Controller
          name="isPaid"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          )}
        />
        <label htmlFor="isPaid" className="ml-2 text-sm text-gray-700">
          Cancelado
        </label>
      </div>

      <div>
        <label
          htmlFor="month"
          className="block text-sm font-medium text-gray-700"
        >
          Mes
        </label>
        <Controller
          name="month"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Año
        </label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Monto
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="0.01"
              placeholder="Amount"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Crear nuevo recibo
      </button>
    </form>
  );
};

export default NewReceipt;
