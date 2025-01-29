/**=========================================================
* BLISSIQ ADMIN React - v2.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the BLISSIQ ADMIN React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// BLISSIQ ADMIN React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// University components
import CreateUniversity from "University/CreateUniversity";
import GETUniversity from "layouts/tables/GETUniversity";

// Grades components
import CreateGrade from "./Grades/CreateGrade";
import GetGrades from "layouts/tables/GetGrades";

// Subject components
import CreateSubject from "./Subjects/CreateSubject";
import GetSubjects from "layouts/tables/GetSubjects";

// @mui icons
import Icon from "@mui/material/Icon";
import Students from "layouts/tables/Student";
import Teachers from "layouts/tables/Teacher";
import Schools from "layouts/tables/School";
import AddSubAdmin from "layouts/notifications/Addsubadmin";
import CreateSession from "layouts/notifications/CreateSession";
import GetSessions from "layouts/notifications/Getsession";
import { SidebarTempleteRoutes } from "templeteRouter";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "All Students", // Adding the Students menu item
    key: "students",
    route: "/students",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ), // Icon for students
    component: <Students />, // The component to render
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "All Teachers", // Adding the Teachers menu item
    key: "teachers",
    route: "/teachers",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        person
      </i>
    ), // Icon for teachers
    component: <Teachers />, // The component to render
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "All Schools", // Adding the Schools menu item
    key: "schools",
    route: "/schools",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        school
      </i>
    ), // Icon for schools
    component: <Schools />, // The component to render
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Add University",
    key: "add-university",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/university",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <CreateUniversity />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Add Grade",
    key: "add-grade",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/grade",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <CreateGrade />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Add Subject",
    key: "add-subject",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/subject",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <CreateSubject />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Universities",
    key: "universities",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/universities",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <GETUniversity />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Grades",
    key: "grades",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/grades",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <GetGrades />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "subjects",
    icon: <Icon fontSize="small">book</Icon>,
    route: "/subjects",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <GetSubjects />,
    layout: "/admin",
  },
     {
    type: "collapse",
    name: "Sub-admin", // Adding the Sub-admin menu item
    key: "sub-admin",
    route: "/sub-admin",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        admin_panel_settings
      </i>
    ), // Updated icon for sub-admin
    component: <AddSubAdmin />, // The component to render
    layout: "/admin",
  },

  {
    type: "collapse",
    name: "Create Session", // Change this to reflect the new page's purpose
    key: "create-session", // Update the key for the new feature
    route: "/create-session", // Define the new route for creating sessions
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        video_camera_front
      </i>
    ),
    component: <CreateSession />, // Link the component you want to render (e.g., CreateSession component)
    layout: "/admin", // The layout the component will be part of
  },
  {
    type: "collapse",
    name: "Get Session", // Change this to reflect the new page's purpose
    key: "Get-session", // Update the key for the new feature
    route: "/Get-session", // Define the new route for creating sessions
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        video_camera_front
      </i>
    ),
    component: <GetSessions />, // Link the component you want to render (e.g., CreateSession component)
    layout: "/admin", // The layout the component will be part of
  },



  ...SidebarTempleteRoutes(),
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
 
    route: "/authentication/sign-in",
  
    component: <SignIn />,
  },
  {
 
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
