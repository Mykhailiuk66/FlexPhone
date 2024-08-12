import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./routes/Root";
import Shop from "./routes/Shop";
import Product from "./routes/Product";
import Cart from "./routes/Cart";

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
      }
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
