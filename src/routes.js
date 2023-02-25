import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdSchedule,
  MdClass,
  MdDashboard
} from "react-icons/md";

// Admin Imports
import Auth from "views/auth/signIn"
import Class from "views/staff/class";
import Lecture from "views/staff/lecture";
import User from "views/staff/user";
import Schedule from "views/staff/schedule";

const routes = [
  {
    name: "User",
    layout: "/staff",
    path: "/user",
    icon: (
      <Icon
        as={MdPerson}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: User,
    secondary: true,
  },
  {
    name: "Class",
    layout: "/staff",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    path: "/class",
    component: Class,
  },
  {
    name: "Lecture",
    layout: "/staff",
    icon: <Icon as={MdClass} width='20px' height='20px' color='inherit' />,
    path: "/lecture",
    component: Lecture,
  },
  {
    name: "Schedule",
    layout: "/staff",
    path: "/schedule",
    icon: <Icon as={MdSchedule} width='20px' height='20px' color='inherit' />,
    component: Schedule,
  },
  {
    name: "Auth",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdSchedule} width='20px' height='20px' color='inherit' />,
    component: Auth,
  },
];

export default routes;
