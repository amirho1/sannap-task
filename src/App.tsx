import { RouterProvider } from "react-router";
import routes from "./components/routes";
import { config } from "./lib/config";

export default function App() {
  // !Checking for env
  if (!config.baseURL) console.error(`
    ******************************************
                BASE URL MISSING
    ******************************************
    `);
  return <RouterProvider router={routes} />;
}
