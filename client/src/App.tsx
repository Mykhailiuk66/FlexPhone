import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Root from "./routes/Root";
import Shop from "./routes/Shop";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import Orders from "./routes/Orders";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Checkout from "./routes/Checkout";
import AuthContextProvider from "./store/auth-context";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <div>Home</div>,
			},
			{
				path: "/shop",
				element: <Shop />,
			},
			{
				path: "/shop/:productId/:variantId",
				element: <Product />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/checkout",
				element: <Checkout />,
			},
			{
				path: "/orders",
				element: <Orders />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
