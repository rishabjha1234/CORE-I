import React from "react";
import Home from "./component/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddToCart from "./component/AddToCart";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/addToCart",
      element: <AddToCart />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
