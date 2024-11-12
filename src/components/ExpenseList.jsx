import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function ExpenseList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch current month's expense data
  const fetchExpenseData = async () => {
    const response = await fetch("http://localhost:5000/api/expense/current");
    if (!response.ok) {
      throw new Error("Failed to fetch expense data");
    }
    return response.json();
  };

  // // Fetch yearly expense data for totals
  // const fetchYearlyExpenseData = async () => {
  //   const response = await fetch("http://localhost:5000/api/expense");
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch yearly expense data");
  //   }
  //   return response.json();
  // };

  const {
    data: expenses = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenseData"],
    queryFn: fetchExpenseData,
  });

  const { data: yearlyExpenses = [] } = useQuery({
    queryKey: ["yearlyExpenseData"],
    // queryFn: fetchYearlyExpenseData,
  });

  const filteredExpenses = expenses.filter((expense) => {
    const source = expense.source || "";
    const description = expense.description || "";
    return (
      source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpenses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expense/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("expense deleted successfully!");
          refetch();
        } else {
          alert("Failed to delete expense.");
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Error deleting expense.");
      }
    }
  };

  // Calculate monthly total by currency
  const monthlyTotal = filteredExpenses.reduce(
    (acc, item) => {
      if (item.currency === "ETB") {
        acc.etb += item.amount;
      } else if (item.currency === "USD") {
        acc.usd += item.amount;
      }
      return acc;
    },
    { etb: 0, usd: 0 }
  );

  // Calculate yearly total by currency
  const yearlyTotal = yearlyExpenses.reduce(
    (acc, item) => {
      if (item.currency === "ETB") {
        acc.etb += item.amount;
      } else if (item.currency === "USD") {
        acc.usd += item.amount;
      }
      return acc;
    },
    { etb: 0, usd: 0 }
  );

  return (
    <>
      <h1 className="font-sans font-semibold text-xl ml-6 mt-2">
        Current Month expenses
      </h1>
      <div className="flex justify-between items-center mt-4 mx-4">
        <input
          type="text"
          placeholder="Search by source or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <div>
          <a
            href="expenses/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Add expense
          </a>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : error ? (
        <p className="text-center mt-4 text-red-500">Error fetching data</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3">
                  Source
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((expense) => (
                <tr
                  key={expense._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {expense.date &&
                      new Date(expense.date).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">{expense.amount}</td>
                  <td className="px-6 py-4">{expense.currency}</td>
                  <td className="px-6 py-4">{expense.source}</td>
                  <td className="px-6 py-4">{expense.description}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`expenses/edit/${expense._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-4"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4 self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="  flex justify-between">
        <div className=" mt-2">
          <a
            href="expenses/all"
            className=" underline text-base font-serif  text-yellow-500 py-2 px-4"
          >
            View all expenses
          </a>
        </div>

        <div className="flex justify-end text-base font-serif font-bold mt-5 underline px-2 py-1">
          Total Monthly expense: {monthlyTotal.etb} ETB{" "}
          {monthlyTotal.usd && ` | ${monthlyTotal.usd} USD`}
        </div>
      </div>
    </>
  );
}

export default ExpenseList;
