
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue'), name: "HomePage", },
      { path: 'automobile-vandute', component: () => import('src/pages/SoldCarsList.vue'), name: "SoldCarsList", },
      { path: 'contact', component: () => import('src/pages/ContactPage.vue'), name: "ContactPage" },
      { path: 'despre-noi', component: () => import('src/pages/AboutPage.vue'), name: "AboutPage" },
      { path: 'auto-vandute/:slug', component: () => import('src/pages/CarDetailPageSold.vue'), name: "CarDetailPageSold"},
      { path: 'auto/:slug', component: () => import('src/pages/CarDetailPage.vue'), name: "CarDetailPage"}
    ]
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: '404Error'
  }
]

export default routes
