import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  About,
  Continent,
  Countries,
  ErrorPage,
  Home,
  WorldFacts,
} from "./Pages";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "country",
        element: <Countries />,
      },
      {
        path: "continent",
        element: <Continent />,
      },
      {
        path: "worldfacts",
        element: <WorldFacts />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>,
);
