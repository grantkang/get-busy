
class App {
  constructor(routingForm,mapController) {
    this.routingForm = routingForm;
    this.mapController = mapController;
    this.calculateRoute = this.calculateRoute.bind(this);
  }
  calculateRoute(directionsRequest) {
    this.mapController.directionsService.route(directionsRequest, function (result, status) {
      if (status == 'OK') {
        this.mapController.directionsRenderer.setDirections(result);
      }
    });

  }
  start() {
    this.mapController.initMap();
    this.routingForm.onSubmit(this.calculateRoute);
  }
}
