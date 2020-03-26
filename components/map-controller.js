
class MapController {
  constructor (mapElement) {
    this.mapElement = mapElement;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement, {
      center: { lat: 34.0522, lng: -118.2437 },
      zoom: 10
    });
    this.directionsRenderer.setMap(this.map);
  }
}
