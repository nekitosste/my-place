import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import Place from "./views/Place";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import AddressForm from "./views/AddressForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/place", element: <Place /> },
      { path: "/newplace", element: <AddressForm key="addressUpdate" /> },
      { path: "/place/:id", element: <AddressForm key="addressUpdate" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/", element: <Navigate to="/place" /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
