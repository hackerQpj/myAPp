import React from "react";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import { UserList } from "../pages/userManager/UserList";
import { LimitList } from "../pages/limitManage/LimitList";
import { RoleList } from "../pages/limitManage/RoleList";
import { NewsAdd } from "../pages/newsManage/NewsAdd";
import { NewsSort } from "../pages/newsManage/NewsSort";
import { Drafts } from "../pages/newsManage/Drafts";
import { AuditLists } from "../pages/auditManage/AuditLists";
import { AuditNews } from "../pages/auditManage/AuditNews";
import { Published } from "../pages/publishManage/Published";
import { Unpublished } from "../pages/publishManage/Unpublished";
import { Sunset } from "../pages/publishManage/Sunset";
import { Navigate } from "react-router-dom";

const routeconfig = [
  {
    id: 1,
    path: "/",
    component: <Navigate to="home" />, //重定向到home组件
  },
  {
    id: 2,
    path: "/login",
    component: <Login />,
  },
  {
    id: 3,
    path: "/home",
    component: <Home />,
  },
  {
    id: 4,
    path: "/user-manage/list",
    component: <UserList />,
  },
  {
    id: 5,
    path: "/limit-manage/role-list",
    component: <RoleList />,
  },
  {
    id: 6,
    path: "/limit-manage/limit-list",
    component: <LimitList />,
  },
  {
    id: 7,
    path: "/news-manage/add",
    component: <NewsAdd />,
  },
  {
    id: 8,
    path: "/news-manage/drafts",
    component: <Drafts />,
  },
  {
    id: 9,
    path: "/news-manage/sort",
    component: <NewsSort />,
  },
  {
    id: 10,
    path: "/audit-manage/audit-news",
    component: <AuditNews />,
  },
  {
    id: 11,
    path: "/audit-manage/audit-lists",
    component: <AuditLists />,
  },
  {
    id: 12,
    path: "/publish-manage/unpublished",
    component: <Unpublished />,
  },
  {
    id: 13,
    path: "/publish-manage/published",
    component: <Published />,
  },
  {
    id: 14,
    path: "/publish-manage/sunset",
    component: <Sunset />,
  },
];

export default routeconfig;
