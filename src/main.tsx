import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [

//     ]
//   }
// ])
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
  // <RouterProvider router={router}>
  // <App />
  // </RouterProvider>
);
