"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.createUser);
router.post('/login', user_controller_1.loginUser);
router.post('/logout', user_controller_1.logoutUser);
router.get('/profile', authenticate_1.authenticate, user_controller_1.getUserProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map