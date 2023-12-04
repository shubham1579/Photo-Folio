import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contextAPI/authContext";
import { AlbumContextProvider } from "./contextAPI/AlbumContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AlbumListPage from "./pages/AlbumListPage";
import { ImageContextProvider } from "./contextAPI/ImageContext";


function App() {

  const router = createBrowserRouter([
    {path: '/', element: <LoginPage />},
    {path: '/signup', element: <SignUpPage />},
    {path: '/:id/albums', element: <AlbumListPage />}
  ])

  return (
    <>
      <AuthContextProvider>
        <AlbumContextProvider>
          <ImageContextProvider>
            <RouterProvider router={router} />
          </ImageContextProvider>
        </AlbumContextProvider>
      </AuthContextProvider>
    </>
  );

}

export default App;
