import dashboardPage from '../views/dashboardPage.vue'

const login = () => import('../views/auth/loginUser.vue')
const register = () => import('../views/auth/registerUser.vue')
const PersonelProfile = () => import('../views/profile/PersonelProfile.vue')
const notFound = () => import('../views/errors/notFound.vue')
const usersList = () => import('../views/users/UsersList.vue')
const ServicesList = () => import('../views/services/ServicesList.vue')
const AddUser = () => import('../views/users/AddUser.vue')
const EditUser = () => import('../views/users/EditUser.vue')
const categoriesList = () => import('../views/categories/CategoriesList.vue')
const updateCategory = () => import('../views/categories/UpdateCategory.vue')

const routes = [
  {
    path: '/',
    name: 'defaultPath',
    redirect: { name: 'dashboard' },
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: login,
    meta: { requiresUnauth: true }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: register,
    meta: { requiresUnauth: true }
  },
  {
    path: '/:notFound(.*)',
    component: notFound
  },
  {
    path: '/users',
    name: 'users',
    component: usersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/update/:id',
    name: 'userUpadte',
    component: EditUser,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/admin/new',
    name: 'addAdmin',
    component: AddUser,
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'categories',
    component: categoriesList,
    meta: { requiresAuth: true },
    children: [
      { name: 'updateCategory', path: 'update/:id', props: true, component: updateCategory } // /coaches/id/contact
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: PersonelProfile,
    meta: { requiresAuth: true }
  }
]
export default routes
