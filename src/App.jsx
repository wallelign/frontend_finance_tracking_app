import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import IncomeForm from "./components/IncomeForm";
import EditIncomeForm from "./components/editIncomeForm";
import Balance from "./components/Balance";
import ExpenseForm from "./components/ExpenseForm";
import EditExpenseForm from "./components/EditExpenseForm";
import AllIncome from "./components/AllIncome";
import AllExpense from "./components/allExpense";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="incomes/add" element={<IncomeForm />} />
          <Route path="incomes/edit/:id" element={<EditIncomeForm />} />
          <Route path="balance" element={<Balance />} />
          <Route path="incomes" element={<AllIncome />} />

          {/* expense */}
          <Route path="expenses/add" element={<ExpenseForm />} />
          <Route path="expenses/edit/:id" element={<EditExpenseForm />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="expenses/all" element={<AllExpense />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
