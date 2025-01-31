import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Update from "./pages/Update";
import Layout from "./components/Layout";
import { useEffect } from "react";


//creating a type for the data that is going to be accessed from api
export type Tasks = {
  id: number;
  title: string;
  body: string;
};

function Refresh(route: string) {
  const  navigate = useNavigate();

  useEffect(()=> {
    localStorage.clear();
    navigate(route, {replace: true});
    window.location.reload();

  }, [navigate])

}


function LogOut() {

  Refresh("/login/");
  return null;

}

function RegisterandLogOut() {
  localStorage.clear();

  return <Register />;
}
function App() {
  //defining the type for the tasks of useState hook by <>
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Layout/>}>
        <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route path ="/login" element = {<Login/>}/>
          <Route path ="/register" element = {<RegisterandLogOut/>}/>
          <Route path ="*" element = {<NotFound/>}/>
          <Route path = "/logout" element = {<LogOut/>}/>
          <Route path ="/update" element = {<Update/>}/>
        
        </Route>
          

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
