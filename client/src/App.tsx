import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <div>Home</div>
      },
      {
        path: "/shop",
        element: <div>Shop</div>
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
