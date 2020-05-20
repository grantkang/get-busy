const RoutingForm = require('./components/routing-form');
const MapController = require('./components/map-controller');
const YelpSearch = require('./components/yelp-search');
const App = require('./components/app');

var routeForm;
var mapController;
var yelpSearchForm;
var app;

// eslint-disable-next-line no-unused-vars
function init() {
  routeForm = new RoutingForm(document.getElementById('routing-form'));
  mapController = new MapController(document.getElementById('map'));
  yelpSearchForm = new YelpSearch(document.getElementById('yelp-search-form'));
  app = new App(routeForm, mapController, yelpSearchForm);
  app.start();
}

module.exports = { init: init };
