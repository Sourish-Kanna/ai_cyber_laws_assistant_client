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
      {
        path: routes.USER_PROFILE,
        element: <Pages.UserProfile />,
      },
      {
        path: routes.CYBERNEWS,
        element: <Pages.CyberNews />,
      },
      {
        path: routes.CYBERHEALTH,
        element: <Pages.CyberHealth />,
      },
      {
        path: routes.COMMUNITY_TAB,
        element: <Pages.CommunityTab />,
      },
    ],
  },
  {
    path: routes.LOGIN,
    element: <Pages.Login />,
  },
  {
    path: routes.LOGOUT,
    element: <Pages.Logout />,
  },
  {
    path: routes.REGISTER,
    element: <Pages.Register />,
  },
  // {
  //   path:'/chatbot',
  //   element:<ChatBot/>
  // }
]);
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
