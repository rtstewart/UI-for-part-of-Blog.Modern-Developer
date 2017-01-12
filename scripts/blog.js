// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement - includes XMLHttpRequest reference
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms_in_HTML#Constraint_Validation_API
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// Event Reference https://developer.mozilla.org/en-US/docs/Web/Events
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
// https://developer.mozilla.org/en-US/docs/Web/API/Node
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/The_native_form_widgets#Date_and_time_picker
// https://www.w3.org/wiki/Handling_events_with_JavaScript
// https://plainjs.com/javascript/
// http://youmightnotneedjquery.com/
// https://developer.mozilla.org/en-US/docs/Web/API/Console
// https://dev.w3.org/html5/spec-preview/constraints.html
// https://www.html5rocks.com/en/tutorials/forms/constraintvalidation/

// GitHub:
// https://help.github.com/articles/configuring-a-remote-for-a-fork/
// https://help.github.com/articles/syncing-a-fork/

/* NOTE: if setting custom validity messages with
    someElement.setCustomValidity('custom error text'), you must always do
    someElement.setCustomValidity('') for the case where it is valid
    , otherwise, it will retain the setCustomValidity value previously set;
*/

app.blog = (function(formUtilities) {

  var userName;

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
  var submittedData;

  function init() {

    // just to simulate having someone logged in - typical for commenting;
    userName = 'Kauress';

    appData = {};
    submittedData = {};

    container = document.querySelector('.container');

    searchForm = document.querySelector('.search-field-and-button');
    searchInput = document.querySelector('.search-field-and-button input');
    searchButton = document.querySelector('search-field-and-button button');

    _addListeners();
  }

  /* for possible future reference/use - maybe in further forms validations:

    http://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting
    var kvpairs = [];
    var form = // get the form somehow
    for ( var i = 0; i < form.elements.length; i++ ) {
       var elem = form.elements[i];
       kvpairs.push(encodeURIComponent(elem.name) + "=" + encodeURIComponent(elem.value));
    }
    var queryString = kvpairs.join("&");
  */

  /* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements */
  /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image */
  function _searchForSubmit(event) {
    /* we will only get in here if all form elements are valid */
    event.preventDefault();
    var formElements = event.target.elements;
    // console.log(formElements);
    for (var i=0; i<formElements.length; i++) {
      // console.log('formElements[i].nodeName:', formElements[i].nodeName);
      // console.log('formElements[i].tagName:', formElements[i].tagName);
      if (formElements[i].nodeName == 'INPUT' && formElements[i].getAttribute('type') != 'image') {
        // console.log(formElements[i].getAttribute('name'));
        var infoName = formElements[i].getAttribute('name');
        submittedData[infoName] = {};
        submittedData[infoName][infoName] = formElements[i].value;
        console.log(submittedData);
      }
    }
  }

  function _formSubmitActions(event) {
    console.warn('submitting form with class(es) "' + event.target.classList + '", on ' + new Date());
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
    searchForm.addEventListener('submit', _searchForSubmit);

  }

  return {
    init: init
  };

})(app.formUtilities);