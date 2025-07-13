# React Class Component Search App

This project is a small React application built using **class components** and demonstrates the use of an **Error Boundary**, **search functionality with localStorage**, and **API integration** with loading and error states.

---

## 🚀 Features

- Built with **React** and **Vite**
- Uses **Class Components** (no hooks)
- Custom **Error Boundary** with fallback UI
- Dynamic **Search Input** with LocalStorage persistence
- API data fetch with **loading spinner** and **error handling**
- Fully styled using **Tailwind CSS**

---

## 📦 Project Structure

- **Search Section** (Top):
  - Input field and a "Search" button
  - Pre-filled from `localStorage` (if saved)
  - User can submit a trimmed search term to fetch results

- **Results Section** (Bottom):
  - Displays search results (product card)
  - If empty input → fetch all items
  - If no results → shows a "no items found" image/message

- **Error Handling**:
  - Application wrapped in a custom `ErrorBoundary`
  - Fallback UI shown if a render error occurs
  - Includes a button (`ErrorButton`) to simulate an error for testing

- **Loading State**:
  - Displays a spinner during API requests

---

## 🧪 Testing Functionality

- To test the error boundary:
  1. Click the “Throw Error” button in the UI
  2. The app will crash and show the fallback error message
  3. Check the console to see the reported error

- To test error from API:
  1. Modify the API endpoint (e.g., change `search` to `seawwrch`)
  2. Observe the error message in the UI

---

## 🔧 Technologies Used

- React (Class Components)
- Vite
- Tailwind CSS
- TypeScript
- [DummyJSON API](https://dummyjson.com/)

---

```

```
