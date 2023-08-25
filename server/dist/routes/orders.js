"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkoutController = __importStar(require("../controllers/orders"));
const isAuth_1 = require("../middleware/isAuth");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", isAuth_1.isAuth, checkoutController.getOrders);
router.post("/checkout", [
    isAuth_1.isAuth,
    (0, express_validator_1.body)("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").trim().notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("address").trim().notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("city").trim().notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").trim().notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("postalCode")
        .trim()
        .notEmpty()
        .isPostalCode("any")
        .withMessage("Postal code is required"),
], checkoutController.handleCheckout);
router.put("/update-status", [isAuth_1.isAuth, isAuth_1.isAdmin], [
    (0, express_validator_1.body)("orderId").trim().notEmpty().withMessage("Order ID is required"),
    (0, express_validator_1.body)("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["pending", "paid", "shipped", "delivered", "cancelled"])
        .withMessage("Status must be one of the following: 'pending', 'paid', 'shipped', 'delivered', 'cancelled'"),
], checkoutController.updateOrderStatus);
exports.default = router;
