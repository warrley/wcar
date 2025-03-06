import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { CarDetail } from "./pages/car";
import { Dasboard } from "./pages/dashboard";
import { New } from "./pages/new";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Private } from "./routes/Private";

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
        element: <Private><Dasboard/></Private> 
      },
      {
        path: "/dashboard/new",
        element: <Private><New/></Private> 
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