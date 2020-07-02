const RoutingForm = require('./components/routing-form');
const MapController = require('./components/map-controller');
const YelpSearch = require('./components/yelp-search');
const App = require('./components/app');
const NotificationService = require('./components/notification-service');

let notificationService;
let routeForm;
let mapController;
let yelpSearchForm;
let app;

// eslint-disable-next-line no-unused-vars
function init() {
  notificationService = new NotificationService(document.getElementById('modal-overlay'));
  routeForm = new RoutingForm(document.getElementById('routing-form'));
  mapController = new MapController(document.getElementById('map'));
  yelpSearchForm = new YelpSearch(document.getElementById('yelp-search-form'));

  app = new App(routeForm, mapController, yelpSearchForm, notificationService);
  app.start();
}

/* eslint-disable no-undef */
$(document).ready(function () {
  checkSize();
});

$(window).resize(function () {
  checkSize();
});

function checkSize() {
  if ($(window).width() < 768) {
    $('#navbarToggleExternalContent').addClass('collapse');
  } else {
    $('#navbarToggleExternalContent').removeClass('collapse');
  }
}

module.exports = { init: init };
