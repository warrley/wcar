import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { CarDetail } from "./pages/car";
import { Dasboard } from "./pages/dashboard";
import { New } from "./pages/new";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/:id",
        element: <CarDetail/>
      },
      {
        path: "/dashboard",
        element: <Dasboard/>
      },
      {
        path: "/dashboard/new",
        element: <New/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

const App = () => {
  return (
    <RouterProvider router={routes}/>
  )
};

export default App;