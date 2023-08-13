import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./routes/Root";
import Shop from "./routes/Shop";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import Orders from "./routes/Orders";
import Login from "./routes/Login";
import Register from "./routes/Register";

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
				path: "/shop/:id",
				element: <Product />,
			},
			{
				path: "/cart",
				element: <Cart />,
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

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
