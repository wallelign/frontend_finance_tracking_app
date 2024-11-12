# Currency Balance Tracker

A React application built using Vite and Tailwind CSS to track income, expenses, and balances in both USD and ETB. This project displays monthly income and expenses, and provides a way to view past records with search functionality.

## Features

- **Balance View**: Displays balances in USD and ETB, with automatic conversion from USD to ETB.
- **Monthly Income and Expense Tracking**: Shows income and expenses for the current month and resets at the end of each month for the upcoming month.
- **Past Records View**: Allows users to view past income and expense records by clicking a "View All" button and provides search functionality for specific months.

## Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/wallelign/frontend_finance_tracking_app.git
cd frontend_finance_tracking_app
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up Environment Variables

To connect to the currency conversion API, you need to create a `.env` file in the root of your project and add the following environment variables:

```env
VITE_API_URL=https://api.currencyfreaks.com/latest
VITE_API_KEY="your_api_key"
```

- **VITE_API_URL**: The URL of the API for currency conversion.
- **VITE_API_KEY**: Your API key for currencyfreaks.com.

> **Note**: Replace `"your_api_key"` with your actual API key from currencyfreaks.com.

### 4. Run the Project

Use the following command to start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5174/`.

## Usage

1. **Balance View**: View balances in both USD and ETB. The conversion is handled automatically based on the API data.
2. **Monthly Tracking**: The app displays income and expenses for the current month and resets at the beginning of each new month.
3. **View Past Records**: To view income and expenses from previous months, click the "View All" button.
4. **Search**: Use the search functionality to quickly locate income and expense records by month.

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Acknowledgments

Special thanks to [currencyfreaks.com](https://currencyfreaks.com/) for providing the currency conversion API.

---

