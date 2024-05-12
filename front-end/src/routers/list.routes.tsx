import { Navigate, createBrowserRouter } from "react-router-dom";
import { Home } from "../screens";
import { About } from "../screens/about/About";
import { Terms } from "../screens/terms/Terms";

export const routesList = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '*',
    element: <Navigate to={'/home'} />,
  },
]);
