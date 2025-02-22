// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
// import MainDashBoard from "./App.tsx";
import * as Pages from './index.ts'
import * as routes from "./routes.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: routes.MAINDASHBOARD,
    element: <Pages.App/>,
    children: [
      {
        path: routes.CHATBOT,
        element: <Pages.ChatBot />,
      },
      {
        path: routes.DASHBOARD,
        element: <Pages.Dashboard />,
      },
    ],
  },
  // {
  //   path:'/chatbot',
  //   element:<ChatBot/>
  // }
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
