import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function AllIncome() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch current month's income data
  const fetchIncomeData = async () => {
    const response = await fetch("http://localhost:5000/api/income");
    if (!response.ok) {
      throw new Error("Failed to fetch income data");
    }
    return response.json();
  };
  const {
    data: incomes = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["incomeData"],
    queryFn: fetchIncomeData,
  });

  const { data: yearlyIncomes = [] } = useQuery({
    queryKey: ["yearlyIncomeData"],
    // queryFn: fetchYearlyIncomeData,
  });

  const filteredIncomes = incomes.filter((income) => {
    const source = income.source || "";
    const description = income.description || "";
    return (
      source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIncomes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage);

  const totalIncome = filteredIncomes.reduce(
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
  const yearlyTotal = yearlyIncomes.reduce(
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
        Current Month Incomes
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
            href="incomes/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Add Income
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
              </tr>
            </thead>
            <tbody>
              {currentItems.map((income) => (
                <tr
                  key={income._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {income.date && new Date(income.date).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">{income.amount}</td>
                  <td className="px-6 py-4">{income.currency}</td>
                  <td className="px-6 py-4">{income.source}</td>
                  <td className="px-6 py-4">{income.description}</td>
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

      <div className="flex justify-end text-base font-serif font-bold mt-5 underline px-2 py-1">
        Total Income: {totalIncome.etb} ETB{" "}
        {totalIncome.usd && ` | ${totalIncome.usd} USD`}
      </div>
    </>
  );
}

export default AllIncome;
