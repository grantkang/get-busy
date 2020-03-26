
class RoutingForm {
  constructor(routingFormElement) {
    this.formElement = routingFormElement;
    console.log(this.formElement);
    this.addInitialDeliveryRows();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.handleCancel = this.handleCancel.bind(this);
    this.formElement.addEventListener('reset', this.handleCancel);
  }
  addInitialDeliveryRows() {
    var deliveryLocationInputs = this.formElement.querySelector('#delivery-location-inputs');
    deliveryLocationInputs.innerHTML = '';
    for(let i = 0; i < 6; i++) {
      deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
    }
  }
  renderDestinationInputRow() {
    var destinationInputGroup = document.createElement('div');
    destinationInputGroup.classList.add('form-group');

    var destinationInput = document.createElement('input');
    destinationInput.setAttribute('type','text');
    destinationInput.classList.add('form-control');
    destinationInput.setAttribute('name','destination-input');

    destinationInputGroup.appendChild(destinationInput);
    return destinationInputGroup;
  }
  onSubmit(calculateRoute) {
    this.calculateRoute = calculateRoute;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);

    var directionsRequest = {
      origin: formData.get('startingPointInput'),
      destination: formData.get('startingPointInput'),
      travelMode: 'DRIVING',
      waypoints: this.convertFromLocationsToWayPoints(formData.getAll('destination-input')),
      optimizeWaypoints: true,
      avoidTolls: true
    }
    this.calculateRoute(directionsRequest);
  }
  handleCancel(event) {
    event.target.reset();
  }
  convertFromLocationsToWayPoints(locations) {
    var waypoints = [];
    for(var item of locations) {
      waypoints.push({
        location: item,
        stopover: true
      });
    }
    return waypoints;
  }
}
