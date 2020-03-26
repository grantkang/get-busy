
class App {
  constructor(routingForm,mapController,yelpSearchForm) {
    this.routingForm = routingForm;
    this.mapController = mapController;
    this.yelpSearchForm = yelpSearchForm;
    this.calculateRoute = this.calculateRoute.bind(this);
    this.searchForPotentialCustomers = this.searchForPotentialCustomers.bind(this);
    this.handlePotentialCustomerSearchError = this.handlePotentialCustomerSearchError.bind(this);
    this.handlePotentialCustomerSearchSuccess = this.handlePotentialCustomerSearchSuccess.bind(this);
  }
  calculateRoute(directionsRequest) {
    this.mapController.directionsService.route(directionsRequest, function (result, status) {
      if (status == 'OK') {
        this.mapController.directionsRenderer.setDirections(result);
      }
    });
  }
  searchForPotentialCustomers(yelpBusinessSearchRequest) {
    var endpointUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';
    endpointUrl += 'location=' +yelpBusinessSearchRequest.location;
    for (var param in yelpBusinessSearchRequest.optionalParams) {
      endpointUrl += '&' + param + '=' + yelpBusinessSearchRequest.optionalParams[param];
    }
    $.ajax({
      method: 'GET',
      url: endpointUrl,
      headers: {
        'Authorization': 'Bearer Iuxh6BRdBbrRGR9_Rz18XyIAUrL5VneC4k2hzUpjGthO5Z6bQVFVDDdakGNpe8VPB6_GG89M3gNFH38F_Kg5eADr3eUpgc2vI4zkyoRbzurDxHRvDJT1QcFundJ8XnYx'
      },
      success: this.handlePotentialCustomerSearchSuccess,
      error: this.handlePotentialCustomerSearchError
    })
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
    console.log(error);
  }
}
