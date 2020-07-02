
class YelpSearch {
  constructor(yelpSearchFormElement) {
    this.formElement = yelpSearchFormElement;
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  onSubmit = searchForPotentialCustomers => {
    this.searchForPotentialCustomers = searchForPotentialCustomers;
  }

  handleSubmit = event => {
    event.preventDefault();
    var submitButton = document.getElementById('yelp-search-button');
    submitButton.setAttribute('disabled', true);
    var formData = new FormData(event.target);
    var yelpBusinessSearchRequest = {
      location: formData.get('location'),
      optionalParams: {
        term: formData.get('search-query'),
        categories: formData.get('search-query')
      }
    };
    this.searchForPotentialCustomers(yelpBusinessSearchRequest, submitButton);
  }
}
module.exports = YelpSearch;
