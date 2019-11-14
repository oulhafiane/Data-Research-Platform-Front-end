import Register from "views/Register.jsx";
import Login from "views/Login.jsx";
import Posts from "views/Posts";
import Profile from "views/Profile.jsx";
import PublicProfile from "views/PublicProfile.jsx";
import Index from "views/Index";
import NewPost from "views/NewPost";
import Post from "views/Post";
import Dashboard from "views/Dashboard";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    role: "ROLE_ANON"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    role: "ROLE_ANON"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/default",
    role: "ROLE_AUTH"
  },
  {
    path: "/profile/:uuid",
    name: "Public Profile",
    icon: "ni ni-single-02 text-yellow",
    component: PublicProfile,
    layout: "/default",
    role: "ROLE_ANON"
  },
  {
    path: "/posts/:id",
    name: "Post",
    icon: "ni ni-circle-08 text-pink",
    component: Post,
    layout: "/default",
    role: "ROLE_ANON"
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-circle-08 text-pink",
    component: Posts,
    layout: "/default",
    role: "ROLE_ANON"
  },
  {
    path: "/new",
    name: "New Post",
    icon: "ni ni-circle-08 text-pink",
    component: NewPost,
    layout: "/default",
    role: "ROLE_AUTH"
  },
  {
    path: "/index",
    name: "Index",
    icon: "ni ni-circle-08 text-pink",
    component: Index,
    layout: "/landing",
    role: "ROLE_ANON"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
    role: "ROLE_ANON"
  }
];

export default routes;
