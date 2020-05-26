
class RoutingForm {
  constructor(routingFormElement) {
    this.formElement = routingFormElement;
    this.formElement.querySelector('#add-location-button').addEventListener('click', this.addDestinationInputRow);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.formElement.addEventListener('reset', this.handleCancel);
    this.deliveryLocationInputs = routingFormElement.querySelector('#delivery-location-inputs');
    this.addInitialDeliveryRows();

  }

  addInitialDeliveryRows = () => {
    this.deliveryLocationInputs.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
    }
  }

  renderDestinationInputRow = () => {
    var destinationInputGroup = document.createElement('div');
    destinationInputGroup.classList.add('form-group', 'd-flex');

    var destinationInput = document.createElement('input');
    destinationInput.setAttribute('type', 'text');
    destinationInput.classList.add('form-control');
    destinationInput.setAttribute('name', 'destination-input');

    var deleteButton = document.createElement('div');
    deleteButton.classList.add('btn', 'btn-danger');

    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash');

    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener('click', () => {
      this.deliveryLocationInputs.removeChild(destinationInputGroup);
    });

    destinationInputGroup.appendChild(destinationInput);
    destinationInputGroup.appendChild(deleteButton);

    return destinationInputGroup;
  }

  onSubmit = calculateRoute => {
    this.calculateRoute = calculateRoute;
  }

  onReset = openResetPrompt => {
    this.openResetPrompt = openResetPrompt;
  }

  handleSubmit = event => {
    event.preventDefault();
    var formData = new FormData(event.target);

    var directionsRequest = {
      origin: formData.get('startingPointInput'),
      destination: formData.get('startingPointInput'),
      travelMode: 'DRIVING',
      waypoints: this.convertFromLocationsToWayPoints(formData.getAll('destination-input')),
      optimizeWaypoints: true,
      avoidTolls: true
    };
    this.calculateRoute(directionsRequest);
  }

  handleCancel = () => {
    this.openResetPrompt();
  }

  reset = () => {
    this.deliveryLocationInputs.innerHTML = '';
    this.addInitialDeliveryRows();
  }

  convertFromLocationsToWayPoints = locations => {
    var waypoints = [];
    for (var item of locations) {
      if (item) {
        waypoints.push({
          location: item,
          stopover: true
        });
      }
    }
    return waypoints;
  }

  addDestinationInputRow = () => {
    this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
  }

  populateForm = businesses => {
    var formRows = this.deliveryLocationInputs.children;
    for (var i = 0; i < businesses.length; i++) {
      var inputText = '';
      inputText = businesses[i].name + ', ';
      for (var displayAddress of businesses[i].location.display_address) {
        inputText += displayAddress + ', ';
      }
      inputText = inputText.slice(0, inputText.length - 2);
      while (formRows.length <= i) {
        this.deliveryLocationInputs.appendChild(this.renderDestinationInputRow());
      }
      formRows[i].querySelector('input').setAttribute('value', inputText);
    }
  }
}

module.exports = RoutingForm;
