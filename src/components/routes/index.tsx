import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import { lazy } from "react";

const Home = lazy(() => import("./home"));
const FOF = lazy(() => import("./FOF"));
const Register = lazy(() => import("./register"));
const StatusCheck = lazy(() => import("./StatusCheck"));
const AuthGuard = lazy(() => import("../AuthGuard"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      {
        path: "status-check",
        element: (
          <AuthGuard>
            <StatusCheck />
          </AuthGuard>
        ),
      },
      { path: "*", element: <FOF /> },
    ],
  },
]);

export default routes;
