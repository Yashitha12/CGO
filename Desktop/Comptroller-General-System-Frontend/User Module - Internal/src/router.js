import { createWebHashHistory, createRouter } from "vue-router";
import home from "./components/Framework/Home.vue";
import login from "./components/UserManagement/Login.vue";
import register from "./components/UserManagement/Register.vue";
import completeProfile from "./components/UserManagement/CompleteProfile.vue";
import completeProfileView from "./components/UserManagement/CompleteProfileView.vue";
import completeProfileEdit from "./components/UserManagement/CompleteProfileEdit.vue";
import completeUserPassWord from "./components/UserManagement/CompleteUserPassword.vue";
import accountRejected from "./components/UserManagement/AccountRejected.vue";
import pageNotFound from "./components/Framework/PageNotFound.vue";

import loginLog from "./components/LoginLogManagement/LoginLog.vue";

import dashboard from "./components/Dashboard/Dashboard.vue";
import vehicleDashboard from "./components/Dashboard/VehicleDashboard.vue";
import usersDashboard from "./components/Dashboard/UsersDashboard.vue";
import entityDashboard from "./components/Dashboard/EntityDashboard.vue";

import userManagement from "./components/UserManagement/UserManagement.vue";
import userManagementInternal from "./components/UserManagement/UserManagementInternal.vue";
import userManagementExternal from "./components/UserManagement/UserManagementExternal.vue";
import userManagementView from "./components/UserManagement/UserManagementView.vue";
import userManagementExternalView from "./components/UserManagement/UserManagementExternalView.vue";
import UserManagementExternalViewForOthers from "./components/UserManagement/UserManagementExternalViewForOthers.vue";


import newsManagement from "./components/NewsManagement/NewsManagement.vue";
import newsManagementView from "./components/NewsManagement/NewsManagementView.vue";

import entityManagementForOthers from "./components/EntityManagement/ForOthersEntityManagement.vue";
import entityListForOthers from "./components/EntityManagement/ForOthersEntityList.vue";
import entityViewForOthers from "./components/EntityManagement/ForOthersEntityView.vue";
import entityAssetPosessionVehicle from "./components/EntityManagement/EntityAssetPosessionVehicle.vue";

import assetManagementView from "./components/AssetManagement/AssetManagementView.vue";


import reportGeneration from "./components/ReportsManagement/Report.vue";
import reportManagementVehicle from "./components/ReportsManagement/VehicleReport.vue";
import reportManagementStructure from "./components/ReportsManagement/StructureReport.vue";
import reportManagementBuilding from "./components/ReportsManagement/BuildingReport.vue";
import reportManagementLand from "./components/ReportsManagement/LandReport.vue";
import reportManagementFurniture from "./components/ReportsManagement/FurnitureReport.vue";
import reportManagementMachinary from "./components/ReportsManagement/MachinaryReport.vue";
import reportManagementEntity from "./components/ReportsManagement/EntityReport.vue";
import reportManagementUser from "./components/ReportsManagement/UserReports.vue";

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: pageNotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/dashboard",
    component: dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/user",
    component: usersDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/entity",
    component: entityDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard/vehicle",
    component: vehicleDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register/user/internal",
    component: register,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/complete/profile",
    component: completeProfile,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/complete/profile/view",
    component: completeProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/complete/profile/edit",
    component: completeProfileEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/account/rejected",
    component: accountRejected,
  },
  {
    path: "/change/password",
    component: completeUserPassWord,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login/logs",
    component: loginLog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/management",
    component: userManagement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/management/internal",
    component: userManagementInternal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/management/external",
    component: userManagementExternal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/view/:id",
    name: 'UserManagementView',
    component: userManagementView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/view/external/:id",
    name: 'UserManagementExternalView',
    component: userManagementExternalView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/view/external/for/others/:id",
    name: 'UserManagementExternalViewForOthers',
    component: UserManagementExternalViewForOthers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/news/management",
    component: newsManagement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/news/view/:id",
    name: 'NewsManagementView',
    component: newsManagementView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/entity/management/data',
    component: entityManagementForOthers,
    children: [
      {
        path: 'list',
        components: {
          helper: entityListForOthers,
        },
        meta: {
          requiresAuth: true
        }
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/entity/view/for/others/:id",
    name: 'EntityViewForOthers',
    component: entityViewForOthers,
    children: [
      {
        path: 'entity/asset/posession/vehicle',
        name: 'EntityAssetPosessionVehicle',
        components: {
          helper2: entityAssetPosessionVehicle,
        },
        meta: {
          requiresAuth: true
        }
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/asset/management",
    name: 'AssetManagement',
    component: assetManagementView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation",
    name: 'reportGeneration',
    component: reportGeneration,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation",
    component: reportGeneration,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/vehicle",
    component: reportManagementVehicle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/building",
    component: reportManagementBuilding,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/structure",
    component: reportManagementStructure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/land",
    component: reportManagementLand,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/furniture",
    component: reportManagementFurniture,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/machinary",
    component: reportManagementMachinary,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/entity",
    component: reportManagementEntity,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/report/generation/user",
    component: reportManagementUser,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(sessionStorage.getItem('profile'));
    if (!user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;