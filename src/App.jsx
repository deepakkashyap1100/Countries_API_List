import './App.css' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layout/AppLayout';
import CountriesData from './Pages/CountriesData';
import ErrorPage from './Layout/ErrorPage';

// import { countryApi } from './API/CountryApi';
import DetailsCard from './Pages/DetailsCard';
// import { singleItemAPI } from './API/SingleItemApi';

function App() {
  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children: [
   
        {
          path: '/',
          element: <CountriesData/>,
          // loader: countryApi
        },
        {
          path: '/:name',
          element: <DetailsCard/>,
          // loader: singleItemAPI
        },
      ]
    },
  ]);
  return <RouterProvider router={myRouter} />
}
export default App
