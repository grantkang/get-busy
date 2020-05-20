/* eslint-disable no-undef */
class App {
  constructor(routingForm, mapController, yelpSearchForm) {
    this.routingForm = routingForm;
    this.mapController = mapController;
    this.yelpSearchForm = yelpSearchForm;
    this.calculateRoute = this.calculateRoute.bind(this);
    this.searchForPotentialCustomers = this.searchForPotentialCustomers.bind(this);
    this.handlePotentialCustomerSearchError = this.handlePotentialCustomerSearchError.bind(this);
    this.handlePotentialCustomerSearchSuccess = this.handlePotentialCustomerSearchSuccess.bind(this);
  }

  calculateRoute(directionsRequest) {
    this.mapController.directionsService.route(directionsRequest, (result, status) => {
      if (status === 'OK') {
        this.mapController.directionsRenderer.setDirections(result);
      }
    });
  }

  searchForPotentialCustomers(yelpBusinessSearchRequest) {
    var endpointUrl = '/api/yelp/customers';
    $.ajax({
      method: 'POST',
      url: endpointUrl,
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify(yelpBusinessSearchRequest),
      success: this.handlePotentialCustomerSearchSuccess,
      error: this.handlePotentialCustomerSearchError
    });
  }

  start() {
    this.mapController.initMap();
    this.routingForm.onSubmit(this.calculateRoute);
    this.yelpSearchForm.onSubmit(this.searchForPotentialCustomers);
  }

  handlePotentialCustomerSearchSuccess(resp) {
    this.routingForm.populateForm(resp.businesses);
  }

  handlePotentialCustomerSearchError(error) {
    console.error(error);
  }
}

module.exports = App;
