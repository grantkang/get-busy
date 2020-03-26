var routeForm;
var mapController;
var app;

function init() {
  routeForm = new RoutingForm(document.getElementById('routing-form'));
  mapController = new MapController(document.getElementById('map'));
  app = new App(routeForm, mapController);
  app.start();
}
