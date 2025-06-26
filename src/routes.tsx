import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RegisterDisasterForm from "./components/RegisterDisasterForm";
import Login from "./pages/Login";
import DisasterList from "./pages/DisasterList";
import DisasterDetail from "./pages/DisasterDetail";

const router = createBrowserRouter([
  // Login as the default route (no layout)
  {
    path: "/",
    element: <Login />,
  },
  // All other routes with layout
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "/app", // or use index: true
        element: <DisasterList />,
      },
      {
        path: "/app/disasters",
        element: <HomePage />,
      },
      {
        path: "/app/register-disaster",
        element: <RegisterDisasterForm />,
      },
      {
        path: "/app/disaster-detail",
        element: <DisasterDetail />,
      },
    ],
  },
]);

export default router;
