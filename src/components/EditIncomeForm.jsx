import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditIncomeForm() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/income/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch income data");
        }
        const data = await response.json();
        setCurrency(data?.currency || "");
        setAmount(data?.amount || "");
        setDescription(data?.description || "");
        setDate(data?.date || "");
        setSource(data?.source || "");
      } catch (error) {
        console.error("Error fetching income data:", error);
        setErrorMessage("Could not load income data.");
      }
    };

    fetchIncomeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      currency,
      description,
      date,
      amount,
      source,
    };

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(`http://localhost:5000/api/income/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage("Income updated successfully!");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to update income.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating income.");
      setLoading(false);
      console.error("Error updating income:", error);
    }
  };

  return (
    <div className="py-6 flex justify-center w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[400px]">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="currency"
          >
            Select Currency
          </label>
          <select
            id="currency"
            className="bg-gray-50 border rounded w-full p-2 text-gray-700"
            onChange={(e) => setCurrency(e.target.value)}
            name="currency"
            value={currency}
          >
            <option value="" disabled>
              Select Currency
            </option>
            <option value="ETB">ETB</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="source"
          >
            Source
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="source"
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>

        <div className="px-6 pt-3">
          {successMessage && (
            <span className="text-green-600">{successMessage}</span>
          )}
          {errorMessage && <span className="text-red-600">{errorMessage}</span>}
        </div>
      </form>
    </div>
  );
}
