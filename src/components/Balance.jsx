import React from "react";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Balance() {
  if (!API_URL || !API_KEY) {
    throw new Error("API_URL or API_KEY environment variables are missing");
  }

  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/balance");
      if (!response.ok) throw new Error("Failed to fetch balance data");
      return response.json();
    },
  });

  const {
    data: exchangeData,
    isLoading: exchangeLoading,
    error: exchangeError,
  } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch exchange rate");
      return response.json();
    },
  });

  if (balanceLoading || exchangeLoading) return <div>Loading...</div>;
  if (balanceError) return <div>Error: {balanceError.message}</div>;
  if (exchangeError) return <div>Error: {exchangeError.message}</div>;

  const usdToEtbRate = parseFloat(exchangeData.rates.ETB);
  const convertedUsdToEtb = balanceData.usdBalance * usdToEtbRate;
  const totalBalanceInETB = balanceData.etbBalance + convertedUsdToEtb;

  return (
    <div className="flex justify-center mt-6">
      <div className="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center py-5 px-12">
          <span className="text-lg font-bold text-green-600 pr-4">
            Balance: {balanceData.etbBalance} ETB
          </span>{" "}
          |
          <span className="text-lg font-bold text-yellow-500 pl-4">
            {balanceData.usdBalance} USD
          </span>
        </div>
        <div className="flex justify-center py-3 px-12">
          <span className="text-lg font-bold text-blue-600">
            Total Balance in ETB: {totalBalanceInETB.toFixed(2)} ETB
          </span>
        </div>
      </div>
    </div>
  );
}
