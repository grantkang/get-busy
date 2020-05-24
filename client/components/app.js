/* eslint-disable no-undef */
class App {
  constructor(routingForm, mapController, yelpSearchForm, notificationService) {
    this.routingForm = routingForm;
    this.mapController = mapController;
    this.yelpSearchForm = yelpSearchForm;
    this.notificationService = notificationService;
  }

  calculateRoute = directionsRequest => {
    this.mapController.directionsService.route(directionsRequest, (result, status) => {
      if (status === 'OK') {
        this.mapController.directionsRenderer.setDirections(result);
      }
    });
  }

  searchForPotentialCustomers = yelpBusinessSearchRequest => {
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
    this.notificationService.open(
      'Welcome',
      [
        'Get Busy is an app that helps you find the shortest route to make a roundtrip while visiting all the places you need to go!',
        'If this is your first time here. Here\'s what you need to know to get started:',
        '1.) All that app needs to know is your starting/ending point & some stops.',
        '2.) For either input, you can either put the name of the place or the address.',
        '3.) Optionally, you can use the input form on the nav bar to search for places to set as your stops.'
      ],
      [
        { label: 'Got It!' }
      ]
    );
  }

  handlePotentialCustomerSearchSuccess = resp => {
    this.routingForm.populateForm(resp.businesses);
  }

  handlePotentialCustomerSearchError = error => {
    console.error(error);
  }
}

module.exports = App;
