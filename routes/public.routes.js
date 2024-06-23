const express = require("express");
const publicControllers = require("../controllers/public.controllers");
const applyRoutes = require("../utils/routeHelpers");

const router = express.Router();

const routes = [
    {
        path: "/doctors",
        method: "get",
        middleware: [],
        handler: publicControllers.getAdmins,
    },
];

applyRoutes(router, routes);

module.exports = router;
