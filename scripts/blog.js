app.blog = (function(formUtilities) {

  var container;

  var searchForm;
  var searchInput;
  var searchButton;

  var commentForm;
  var commentTextarea;
  var commentButton;

  var subscribeForm;
  var subscribeInput;
  var subscribeButton;

  var appData;
  var collectedData;

  function init() {

    appData = {};
    collectedData = {};

    container = document.querySelector('.container');
    console.log(container);

    searchForm = document.querySelector('.search-field-and-button');
    searchInput = document.querySelector('.search-field-and-button input');
    searchButton = document.querySelector('search-field-and-button button');

    _addListeners();
  }

  function _formSubmitActions(event) {
    console.warn('submitting form on ' + new Date());
    /* without event.preventDefault() and no action attribute/value pair
        specified, page would repost to itself, essentially reloading the page;
    */
    event.preventDefault();
    /* checks if any form elements are invalid;
        if form was invalid, we wouldn't get here; */
    console.log(this.checkValidity());
  } // end _formSubmitActions

  function _addListeners() {
    searchInput.addEventListener('input', formUtilities.checkForAlphanumericAndLength(2, 25));
    searchForm.addEventListener('submit', _formSubmitActions);

  }

  return {
    init: init
  };

})(app.formUtilities);