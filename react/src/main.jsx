import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//BLOCO DE ROTAS
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.jsx';
import Erro404 from './routes/Erro404.jsx';
import Cadastro from './routes/Cadastro.jsx';
//BLOCO DE ROTAS

const router = createBrowserRouter([
  {path:"/", element: <App/>, errorElement:<Erro404/>,
  children: [
    {path:"/", element:<Home/>},
    {path:"/login", element:<Login/>},
    {path:"/cadastro", element:<Cadastro/>}
  ]
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>

)
