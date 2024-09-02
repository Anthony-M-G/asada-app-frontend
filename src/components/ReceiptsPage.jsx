import { useEffect, useState } from "react";
import { getAllReceipts } from "../api/config.js";
import { useAuth } from "../context/AuthContext.jsx";
import { updateReceipt, logout, generatePdf } from "../api/config.js";
import { Link } from "react-router-dom";
function ReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      const receipts = await getAllReceipts();
      setReceipts(receipts);
    };
    fetchReceipts();
  }, []);
  const onTogglePaid = async (id) => {
    try {
      const res = await updateReceipt(id);
      setIsPaid(res.isPaid);
      console.log(res);
      setIsPaid(!isPaid);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchReceipts = async () => {
      const receipts = await getAllReceipts();
      setReceipts(receipts);
    };
    fetchReceipts();
  }, [isPaid]);
  const logOut = async () => {
    try {
      const response = await logout();
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const createPdf = async (id) => {
    try {
      const response = await generatePdf(id);
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    isAuthenticated && (
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-semibold text-center my-4 text-white">{`Bienvenido ${user.username}`}</h1>
        <h3
          className="text-xl font-semibold my-4 text-white"
          onClick={() => logOut()}
        >
          Salir
        </h3>
        <h3 className="text-xl font-semibold my-4 text-white">
          <Link to={"/add-user"}>Nuevo Recibo</Link>
        </h3>
        <table className="min-w-full max-w-xl bg-white table-auto">
          <thead>
            <tr>
              <th className="py-2 px-2 sm:px-4 border-b">Nombre</th>
              <th className="py-2 px-2 sm:px-4 border-b">Cédula</th>
              <th className="py-2 px-2 sm:px-4 border-b">Celular</th>
              <th className="py-2 px-2 sm:px-4 border-b">Cancelado</th>
              <th className="py-2 px-2 sm:px-4 border-b">Mes</th>
              <th className="py-2 px-2 sm:px-4 border-b">Año</th>
              <th className="py-2 px-2 sm:px-4 border-b">Monto</th>
              <th className="py-2 px-2 sm:px-4 border-b">Fecha</th>
              <th className="py-2 px-2 sm:px-4 border-b">Generar PDF</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt._id} className="text-center">
                <td className="py-2 px-2 sm:px-4 border-b">{receipt.name}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{receipt.cedula}</td>
                <td className="py-2 px-2 sm:px-4 border-b">
                  {receipt.celular}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b">
                  <button
                    onClick={() => onTogglePaid(receipt._id, receipt.isPaid)}
                    className={`py-1 px-2 sm:px-4 rounded ${
                      receipt.isPaid
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {receipt.isPaid ? "Cancelado" : "Pendiente"}
                  </button>
                </td>
                <td className="py-2 px-2 sm:px-4 border-b">{receipt.month}</td>
                <td className="py-2 px-2 sm:px-4 border-b">{receipt.year}</td>
                <td className="py-2 px-2 sm:px-4 border-b">
                  {receipt.amount.toFixed(2)} colones
                </td>
                <td className="py-2 px-2 sm:px-4 border-b">
                  {new Date(receipt.date).toLocaleDateString("en-CA")}
                </td>
                <td className="py-2 px-2 sm:px-4 border-b">
                  <button
                    onClick={() => createPdf(receipt._id)}
                    className={
                      "py-1 px-2 sm:px-4 rounded bg-blue-600 hover:bg-blue-500 text-white"
                    }
                  >
                    Generar pdf
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default ReceiptsPage;
