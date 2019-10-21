import Register from "views/Register.jsx";
import Login from "views/Login.jsx";
import Posts from "views/Posts";
import Profile from "views/Profile.jsx";
import Index from "views/Index";
import NewPost from "views/NewPost";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/default"
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-circle-08 text-pink",
    component: Posts,
    layout: "/default"
  },
  {
    path: "/new",
    name: "New Post",
    icon: "ni ni-circle-08 text-pink",
    component: NewPost,
    layout: "/default"
  },
  {
    path: "/index",
    name: "Index",
    icon: "ni ni-circle-08 text-pink",
    component: Index,
    layout: "/landing"
  }
];

export default routes;
