import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ChatBot from "./pages/chatBot.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import "./index.css";
import MainDashBoard from "./App.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainDashBoard />,
    children: [
      {
        path:'/chatbot',
        element:<ChatBot/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
    ],
  },
  // {
  //   path:'/chatbot',
  //   element:<ChatBot/>
  // }
])
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
