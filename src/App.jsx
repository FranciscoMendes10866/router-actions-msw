import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import HomePage, { loader } from "./pages/Home";
import CreatePostPage, { action } from "./pages/CreatePost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<HomePage />} loader={loader} />
      <Route path="/post" element={<CreatePostPage />} action={action} />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
