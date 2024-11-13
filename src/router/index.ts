import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import NotFound from '@/views/NotFoundView.vue'
import PermissionView from '@/views/user-management/PermissionView.vue'
import CompanyView from '@/views/master/CompanyView.vue'
import WarehouseView from '@/views/master/WarehouseView.vue'
import { useSessionStore } from '@/stores/session'
import RoleView from '@/views/user-management/RoleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/user-management/permissions',
      name: 'permissions',
      component: PermissionView,
      meta: { title: 'Permissions' }
    },
    {
      path: '/user-management/roles',
      name: 'roles',
      component: RoleView,
      meta: { title: 'Roles' }
    },
    {
      path: '/master/companies',
      name: 'companies',
      component: CompanyView,
      meta: { title: 'Companies' }
    },
    {
      path: '/master/warehouses',
      name: 'warehouses',
      component: WarehouseView,
      meta: { title: 'Warehouses' }
    }
  ]
})

router.beforeEach(to => {
  const session = useSessionStore()
  document.title = (to.meta.title as string) ?? 'Learn Vue 3'

  if (!session.isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }

  if (session.isAuthenticated && to.name === 'login') {
    return { name: 'dashboard' }
  }
})

export default router
