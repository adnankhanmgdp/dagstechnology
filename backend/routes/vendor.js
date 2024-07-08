const express = require("express")
const router = express.Router()
const {
    register,
    verifyOTP,
    login,
    fetchProfile,
    updateProfile,
    switchAvailability,
    updateDocs
} = require("../controllers/vendor/auth.vendor")
const {
    findShortestDistance
} = require("../controllers/vendor/logistic.vendor")
const { auth, verifyVendor } = require('../middlewares/vendor/auth')
const { getVendorDashboard, getTodaysOrder, fetchAllOrder, getOrder, acceptOrder, readyForDelivery, activeOrders, dateRange, pastOrders, getWeeklyData, week } = require("../controllers/vendor/order.vendor")
const { settlement } = require("../controllers/vendor/settlement.vendor")

//auth
router.post("/signup", register)
router.post("/verifyOTP", verifyOTP)
router.post("/login", login)
router.post("/fetchProfile", fetchProfile)
router.put("/updateProfile", updateProfile)
router.put("/updateDocs", updateDocs)
router.post("/switchAvailability", verifyVendor, switchAvailability)

//orders
router.post("/dashboard", verifyVendor, getVendorDashboard)
router.post("/getTodaysOrder", verifyVendor, getTodaysOrder)
router.post("/fetchAllOrders", verifyVendor, fetchAllOrder)
router.post("/getOrder", verifyVendor, getOrder)
router.post("/acceptOrder", verifyVendor, acceptOrder)
router.post("/readyForDelivery", verifyVendor, readyForDelivery)
router.post("/activeOrders", verifyVendor, activeOrders)
router.post("/date", verifyVendor, dateRange)
router.post("/pastOrders", verifyVendor, pastOrders)
router.post("/week", verifyVendor, week)

//Settlement
router.post("/settlement", verifyVendor, settlement)


// router.post("/distance", findShortestDistance)
module.exports = { vendorRoutes: router }; 
