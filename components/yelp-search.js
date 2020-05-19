
class YelpSearch {
  constructor(yelpSearchFormElement) {
    this.formElement = yelpSearchFormElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }
  onSubmit(searchForPotentialCustomers) {
    this.searchForPotentialCustomers = searchForPotentialCustomers;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var yelpBusinessSearchRequest = {
      location: formData.get('location'),
      optionalParams: {
        term: formData.get('search-query'),
        categories: formData.get('search-query')
      }
    }
    this.searchForPotentialCustomers(yelpBusinessSearchRequest);
  }
}
