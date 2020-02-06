import Register from 'views/Register.jsx'
import Login from 'views/Login.jsx'
import Posts from 'views/Posts'
import Profile from 'views/Profile.jsx'
import PublicProfile from 'views/PublicProfile.jsx'
import Index from 'views/Index'
import NewPost from 'views/NewPost'
import EditPost from 'views/EditPost'
import Post from 'views/Post'
import Dashboard from 'views/Dashboard'
import Applications from 'views/Applications'
import Messages from 'views/Messages'
import IndexData from 'views/IndexData'
import MyDataSet from 'views/MyDataSet'
import MyDataSets from 'views/MyDataSets'

var routes = [
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    role: 'ROLE_ANON',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
    role: 'ROLE_ANON',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/default',
    role: 'ROLE_AUTH',
  },
  {
    path: '/profile/:uuid',
    name: 'Public Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: PublicProfile,
    layout: '/default',
    role: 'ROLE_ANON',
  },
  {
    path: '/posts/:id/edit',
    name: 'Post',
    icon: 'ni ni-circle-08 text-pink',
    component: EditPost,
    layout: '/default',
    role: 'ROLE_AUTH',
  },
  {
    path: '/posts/:id',
    name: 'Post',
    icon: 'ni ni-circle-08 text-pink',
    component: Post,
    layout: '/default',
    role: 'ROLE_ANON',
  },
  {
    path: '/posts',
    name: 'Posts',
    icon: 'ni ni-circle-08 text-pink',
    component: Posts,
    layout: '/default',
    role: 'ROLE_ANON',
  },
  {
    path: '/new',
    name: 'New Post',
    icon: 'ni ni-circle-08 text-pink',
    component: NewPost,
    layout: '/default',
    role: 'ROLE_AUTH',
  },
  {
    path: '/index',
    name: 'Index',
    icon: 'ni ni-circle-08 text-pink',
    component: Index,
    layout: '/landing',
    role: 'ROLE_ANON',
  },
  {
    path: '/index',
    name: 'Data',
    icon: 'ni ni-chart-pie-35 text-green',
    component: IndexData,
    layout: '/data',
    role: 'ROLE_AUTH',
  },
  {
    path: '/mydataset/:uuid',
    name: 'Data',
    icon: 'ni ni-chart-pie-35 text-green',
    component: MyDataSet,
    layout: '/data',
    role: 'ROLE_AUTH',
  },
  {
    path: '/mydatasets',
    name: 'Data',
    icon: 'ni ni-chart-pie-35 text-green',
    component: MyDataSets,
    layout: '/data',
    role: 'ROLE_AUTH',
  },
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Dashboard,
    layout: '/admin',
    role: 'ROLE_ADMIN',
  },
  {
    path: '/applications',
    name: 'Applications',
    icon: 'ni ni-badge text-danger',
    component: Applications,
    layout: '/admin',
    role: 'ROLE_ADMIN',
  },
  {
    path: '/messages',
    name: 'Messages',
    icon: 'ni ni-email-83 text-success',
    component: Messages,
    layout: '/admin',
    role: 'ROLE_ADMIN',
  },
]

export default routes
