// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
// import MainDashBoard from "./App.tsx";
import * as Pages from "./index.ts";
import * as routes from "./routes.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {GoogleOAuthProvider} from  "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: routes.MAINDASHBOARD,
    element: <Pages.App />,
    children: [
      {
        path: routes.CHATBOT,
        element: <Pages.ChatBot />,
        children: [
          {
            path: routes.CHATPAGE,
            element: <Pages.ChattingPage />,
          },
        ],
      },
      {
        path: routes.DASHBOARD,
        element: <Pages.Dashboard />,
      },
    ],
  },
  {
    path: routes.LOGIN, // Add this route
    element: <Pages.Login />,
  },
  // {
  //   path:'/chatbot',
  //   element:<ChatBot/>
  // }
]);
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="735728164257-p5p9ohe9so7t6bkr6gj10vdgfuu8vkc2.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
