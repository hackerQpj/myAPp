import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { UserList } from "../pages/userManager/UserList";
import { LimitList } from "../pages/limit/LimitList";

const routeconfig = [
  {
    id: 1,
    path: "/",
    component: <Login />,
  },
  {
    id: 2,
    path: "/Login",
    component: <Login />,
  },
  {
    id: 3,
    path: "/Home",
    component: <Home />,
  },
  {
    id: 4,
    path: "/user-list",
    component:<UserList/>,
  },
  {
    id: 5,
    path: "/limit-list",
    component:<LimitList/>
  },
  
 
];

export default routeconfig;
