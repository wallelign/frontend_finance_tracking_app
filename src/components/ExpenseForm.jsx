import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      amount,
      currency,
      description,
      date,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        setSuccessMessage(true);
        setErrorMessage(false);
        console.log("expense data submitted successfully");

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate("/expenses");
        }, 2000);
      } else {
        setSuccessMessage(false);
        setErrorMessage(true);
        console.error("Failed to submit expense data");
      }
    } catch (error) {
      setSuccessMessage(false);
      setErrorMessage(true);
      console.error("Error submitting expense data:", error);
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
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="max-w-sm mx-auto py-2">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select currency
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCurrency(e.target.value)}
            name="currency"
            value={currency}
            required
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
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            {Loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <div className="px-6 pt-3">
          <span className="text-yellow-600">
            {successMessage && "You have successfully saved expense!"}
          </span>
          <span className="text-red-600">{errorMessage && "Error!"}</span>
        </div>
      </form>
    </div>
  );
}
