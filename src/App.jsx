import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdataOrder";
import AppLayout from "./ui/AppLayout";
const router = createBrowserRouter([
  {
    //no path
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, //step 2
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction, //for Form component
      },
      {
        path: "/order/:orderID",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader, // fetching some data
        action: updateOrderAction, //for fetcher.Form component(works for <Order/> )
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
