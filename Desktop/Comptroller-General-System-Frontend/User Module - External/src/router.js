import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/Framework/Home.vue";
import Login from "./components/UserManagement/Login.vue";
import Register from "./components/UserManagement/Register.vue";
import completeProfile from "./components/UserManagement/CompleteProfile.vue";
import completeProfileView from "./components/UserManagement/CompleteProfileView.vue";
import completeProfileEdit from "./components/UserManagement/CompleteProfileEdit.vue";
import completeUserPassWord from "./components/UserManagement/CompleteUserPassword.vue";
import accountRejected from "./components/UserManagement/AccountRejected.vue";
import pageNotFound from "./components/Framework/PageNotFound.vue";

import loginLog from "./components/LoginLogManagement/LoginLog.vue";

import entityManagement from "./components/EntityManagement/EntityManagementExternal.vue";
import childentityManagementUpdate from "./components/EntityManagement/EntityAssignChildUpdate.vue";
import entityAssetManagementVehicle from "./components/EntityManagement/EntityAssetManagement-Vehicle.vue";

import assetManagement from "./components/Asset/Asset_management.vue";
import assetManagementView from "./components/Asset/Asset_managementView.vue";

import structureType from "./components/Structure/StructureType.vue";
import AirFieldRunway from "./components/Structure/AirFieldRunway.vue";
import AirFieldRunwayForm from "./components/Structure/AirFieldRunwayForm.vue";

//gayini
import ConstructionStatusModal from "./components/Construction/ConstructionStatusModal.vue";
import CompletedConstruction from "./components/Construction/CompletedConstructionModal.vue";
import CompletedConstructionModalComp from "./components/MainComponents/CompletedConstructionModalComp.vue";
import UsageInfo from "./components/Construction/UsageInfo.vue";
import UsageInfo1 from "./components/Construction/UsageInfo1.vue";
import NotCompletedConstruction from "./components/Construction/NotCompletedConstructionModel.vue";
import StructuresVerification from "./components/DvFirstRole/StructuresVerification.vue";

import ConstructionStatusModalComp from "./components/MainComponents/ConstructionStatusModalComp.vue";
import UsageInfocomp1 from "./components/MainComponents/UsageInfocomp1.vue";
import MainComponentsView from "./components/MainComponents/MainComponentsView.vue";
import ChosenComponentsView from "./components/MainComponents/ChosenComponentsView.vue";
import RunwayComponent from "./components/MainComponents/RunwayComponent.vue";
import TaxiwayComponent from "./components/MainComponents/TaxiwayComponent.vue";
import ApronComponent from "./components/MainComponents/ApronComponent.vue";
import AirTrafficControlComponent from "./components/MainComponents/AirTrafficControlComponent.vue";
import RadarTowerComponent from "./components/MainComponents/RadarTowerComponent.vue";
import HangerComponent from "./components/MainComponents/HangerComponent.vue";
import OtherComponent from "./components/MainComponents/OtherComponent.vue";
import SummeryOfComponents from "./components/MainComponents/SummeryOfComponents.vue";
import NotCompletedConstructionModelComp from "./components/MainComponents/NotCompletedConstructionModelComp.vue";
import UsageInfoComp from "./components/MainComponents/UsageInfoComp.vue";
import AirFieldDashboard from "./components/Dashboard/AirFieldRunway/ToDoList/AirFieldDashboard.vue";
import ViewDetails from "./components/Dashboard/AirFieldRunway/ToDoList/ViewDetails.vue";
import ToDoList from "./components/Dashboard/AirFieldRunway/ToDoList/ToDoList.vue";
// import assetManagementAddVehicle from "./components/Asset/Vehicle/AddVehicle.vue";
// import assetManagementUpdateVehicle from "./components/Asset/Vehicle/UpdateVehicle.vue";
// import assetManagementVehicleList from "./components/Asset/Vehicle/ListOfVehicles.vue";
// import assetManagementViewVehicleData from "./components/Asset/Vehicle/ViewVehicle.vue";
// import assetManagementViewVehicleDataFirstTime from "./components/Asset/Vehicle/ViewVehicle.vue";

// import addVehicleInsurance from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleInsurance.vue";
// import addVehicleAccidentCostRecovery from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleAccidentCostRecovery.vue";
// import addVehicleDispose from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleDispose.vue";
// import addVehicleTransfer from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleTransfer.vue";
// import addVehicleFuel from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleFuel.vue";
// import addVehicleMaintainance from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleMaintainance.vue";
// import addVehicleValuation from "./components/Asset/Vehicle/VehicleAddForms/AddVehicleValuation.vue";
// import viewVehicleInsurance from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleInsurance.vue";
// import viewVehicleAccidentCostRecovery from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleAccident.vue";
// import viewVehicleDispose from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleDispose.vue";
// import viewVehicleTransfer from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleTransfer.vue";
// import viewVehicleFuel from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleFuel.vue";
// import viewVehicleMaintainance from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleMaintainance.vue";
// import viewVehicleValuation from "./components/Asset/Vehicle/VehicleViewForms/ViewVehicleValuation.vue";

import dashboard from "./components/Dashboard/Dashboard.vue";
// import vehicleDashboard from "./components/Dashboard/Vehicle/VehicleDashboard.vue";
// import vehicleDashboardAlertlist_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/AlertAndReminders.vue"
// import vehicleDashboardtodolist_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/ToDoList.vue"
// import vehicleDashboardtodolistEditAllowed_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/Vehicles/EditAllowedList.vue"
// import vehicleDashboardtodolistValuation_de from "./components/Dashboard/Vehicle/ToDoList/DataEntryOfficer/Vehicles/ValuationCompleteList.vue"
// import vehicleDashboardtodolist_dv from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/ToDoList.vue"
// import vehicleDashboardtodolist_dv_ItemsInProgress from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsInProgress.vue"
// import vehicleDashboardtodolist_dv_ItemsEditBlocked from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsEditBlocked.vue"
// import vehicleDashboardtodolist_dv_ItemsAccident from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsAccident.vue"
// import vehicleDashboardtodolist_dv_ItemsDispose from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsDispose.vue"
// import vehicleDashboardtodolist_dv_ItemsFuel from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsFuel.vue"
// import vehicleDashboardtodolist_dv_ItemsInsurance from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsInsurance.vue"
// import vehicleDashboardtodolist_dv_ItemsMaintenance from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsMaintenance.vue"
// import vehicleDashboardtodolist_dv_ItemsValuation from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsValuation.vue"
// import vehicleDashboardtodolist_dv_TransferApprovals from "./components/Dashboard/Vehicle/ToDoList/DataVerificationOfficer/Vehicles/ItemsTranferApprovals.vue"
import Report from "./components/ReportGeneration/Report_management.vue";
import reportManagementVehicle from "./components/ReportGeneration/AssetReports/VehicleReport.vue";

// import AirFieldRunwayForm1 from "./components/Structure/AirFieldRunwayForm1.vue";
// import AirFieldRunwayForm2 from "./components/Structure/AirFieldRunwayForm2.vue";
// import reportManagementStructure from "./components/ReportGeneration/AssetReports/StructureReport.vue";
// import reportManagementBuilding from "./components/ReportGeneration/AssetReports/BuildingReport.vue";
// import reportManagementLand from "./components/ReportGeneration/AssetReports/LandReport.vue";
// import reportManagementFurniture from "./components/ReportGeneration/AssetReports/FurnitureReport.vue";
// import reportManagementMachinary from "./components/ReportGeneration/AssetReports/MachinaryReport.vue";

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: pageNotFound,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard",
    component: dashboard,
    children: [],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/account/rejected",
    component: accountRejected,
  },
  {
    path: "/complete/profile",
    component: completeProfile,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/complete/profile/view",
    component: completeProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/complete/profile/edit",
    component: completeProfileEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/change/password",
    component: completeUserPassWord,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login/logs",
    component: loginLog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/entity/management/external",
    // You could also have named views at tho top
    component: entityManagement,
    children: [
      {
        path: "child/entity/management",
        components: {
          helper: childentityManagementUpdate,
        },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "entity/asset/management",
        components: {
          helper: entityAssetManagementVehicle,
        },
        meta: {
          requiresAuth: true,
        },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/external",
    component: assetManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/view/external",
    component: assetManagementView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/report/generation",
    component: Report,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/asset/management/report/generation/vehicle",
    component: reportManagementVehicle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/structure/structuretype",
    component: structureType,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/structure/AirFieldRunway",
    component: AirFieldRunway,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/structure/AirFieldRunwayForm",
    component: AirFieldRunwayForm,
    meta: {
      requiresAuth: false,
    },
  },

  {
    //Construction - usage info1
    path: "/construction/usage-info1",
    name: "UsageInfo1",
    component: UsageInfo1,
  },

  {
    path: "/construction/status",
    name: "ConstructionStatus",
    component: ConstructionStatusModal,
  },

  {
    //Construction - status
    path: "/construction/status",
    name: "ConstructionStatus",
    component: ConstructionStatusModal,
  },

  {
    //Construction - usage info
    path: "/construction/usage-info",
    name: "UsageInfo",
    component: UsageInfo,
  },

  {
    //Construction - not completed
    path: "/construction/not-completed",
    name: "NotCompletedConstruction",
    component: NotCompletedConstruction,
  },

  {
    //Construction - completed
    path: "/construction/completed",
    name: "CompletedConstruction",
    component: CompletedConstruction,
  },

  ,
  {
    //Structures Verification
    path: "/dvstructures/verification",
    name: "StructuresVerification",
    component: StructuresVerification,
  },

  {
    // Main Components View
    path: "/components/main",
    name: "MainComponentsView",
    component: MainComponentsView,
  },
  {
    //Chosen Components View
    path: "/components/chosen",
    name: "ChosenComponentsView",
    component: ChosenComponentsView,
  },
  {
    //Runway Component
    path: "/components/runway",
    name: "RunwayComponent",
    component: RunwayComponent,
  },
  {
    //Taxiway Component
    path: "/components/taxiway",
    name: "TaxiwayComponent",
    component: TaxiwayComponent,
  },
  {
    //Apron Component
    path: "/components/apron",
    name: "ApronComponent",
    component: ApronComponent,
  },
  {
    //Air Traffic Control Tower Component
    path: "/components/airtrafficcontroltower",
    name: "AirTrafficControlComponent",
    component: AirTrafficControlComponent,
  },
  {
    //Radar Tower Component
    path: "/components/radartower",
    name: "RadarTowerComponent",
    component: RadarTowerComponent,
  },
  {
    //Hanger Component
    path: "/components/hanger",
    name: "HangerComponent",
    component: HangerComponent,
  },
  {
    //Other Component
    path: "/components/other",
    name: "OtherComponent",
    component: OtherComponent,
  },
  {
     //Summary of Components
    path: "/components/summary",
    name: "ComponentsSummary",
    component: SummaryOfComponents,
  },
  {
    //Air Field Dashboard
    path: "/airfield/dashboard",
    name: "AirFieldDashboard",
    component: AirFieldDashboard,
  },
  {
    //View Details
    path: "/airfield-runway/view/:id",
    name: "AirFieldRunwayView",
    component: ViewDetails,
  },
  {
    //ToDoList - Airfield
    path: "/todo-list-structures",
    name: "ToDoList",
    component: ToDoList,
  },

  {
    path: "/components/ConstructionStatusModalComp",
    name: "ConstructionStatusModalComp",
    component: ConstructionStatusModalComp,
  },

  {
    path: "/components/CompletedConstructionModalComp",
    name: "CompletedConstructionModalComp",
    component: CompletedConstructionModalComp,
  },

  {
    path: "/components/UsageInfocomp1",
    name: "UsageInfocomp1",
    component: UsageInfocomp1,
  },

  {
    path: "/components/NotCompletedConstructionModelComp",
    name: "NotCompletedConstructionModelComp",
    component: NotCompletedConstructionModelComp,
  },

  {
    path: "/components/UsageInfoComp",
    name: "UsageInfoComp",
    component: UsageInfoComp,
  },

  // {
  //   path: "/asset/management/report/generation/building",
  //   component: reportManagementBuilding,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/structure",
  //   component: reportManagementStructure,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/land",
  //   component: reportManagementLand,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/furniture",
  //   component: reportManagementFurniture,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/asset/management/report/generation/machinary",
  //   component: reportManagementMachinary,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let user = JSON.parse(sessionStorage.getItem("profile"));
    if (!user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
