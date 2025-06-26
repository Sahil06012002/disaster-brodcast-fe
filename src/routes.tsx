import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import DisasterList from "./pages/DisasterList";
import DisasterDetail from "./pages/DisasterDetail";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "/app",
        element: <DisasterList />,
      },
      {
        path: "/app/disasters",
        element: <HomePage />,
      },
      {
        // path: "/app/register-disaster",
        // element: <RegisterDisasterForm />,
      },
      {
        path: "/app/disaster-detail",
        element: <DisasterDetail />,
      },
      {
        path: "/app/about",
        element: <About></About>,
      },
    ],
  },
]);

export default router;
