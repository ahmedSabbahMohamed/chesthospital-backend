function applyRoutes(router, routes) {
  routes.forEach((route) => {
    const { path, method, middleware, handler } = route;
    router.route(path)[method](middleware, handler);
  });
}

module.exports = applyRoutes;
