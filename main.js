var routeForm;
var mapController;
var yelpSearchForm;
var app;

function init() {
  routeForm = new RoutingForm(document.getElementById('routing-form'));
  mapController = new MapController(document.getElementById('map'));
  yelpSearchForm = new YelpSearch(document.getElementById('yelp-search-form'));
  app = new App(routeForm, mapController, yelpSearchForm);
  app.start();
}
