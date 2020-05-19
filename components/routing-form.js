
class RoutingForm {
  constructor(routingFormElement) {
    this.formElement = routingFormElement;
    console.log(this.formElement);
    this.addInitialDeliveryRows();
    this.addDestinationInputRow = this.addDestinationInputRow.bind(this);
    this.removeDestinationInputRow = this.removeDestinationInputRow.bind(this);
    this.formElement.querySelector('#add-location-button').addEventListener('click',this.addDestinationInputRow);
    this.formElement.querySelector('#remove-location-button').addEventListener('click', this.removeDestinationInputRow);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.handleCancel = this.handleCancel.bind(this);
    this.formElement.addEventListener('reset', this.handleCancel);
    this.deliveryLocationInputs = this.formElement.querySelector('#delivery-location-inputs');
  }
  addInitialDeliveryRows() {

    this.deliveryLocationInputs.innerHTML = '';
    for(let i = 0; i < 6; i++) {
      this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
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
      if(item) {
        waypoints.push({
          location: item,
          stopover: true
        });
      }
    }
    return waypoints;
  }
  addDestinationInputRow() {
    this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
  }
  removeDestinationInputRow() {
    if(this.deliveryLocationInputs.children.length) {
      this.deliveryLocationInputs.removeChild(this.deliveryLocationInputs.lastChild);
    }
  }
  populateForm(businesses) {
    var formRows = this.deliveryLocationInputs.children;
    for(var i = 0; i < businesses.length; i++) {
      var inputText = '';
      inputText = businesses[i].name + ', ';
      for (var displayAddress of businesses[i].location.display_address) {
        inputText += displayAddress + ', ';
      }
      inputText = inputText.slice(0, inputText.length - 2);
      while(formRows.length <= i) {
        this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
      }
      formRows[i].lastChild.setAttribute('value',inputText);
    }
  }
}
