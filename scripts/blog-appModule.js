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

  var docTitle;

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

  /* The details of what would be stored in each of the following two data
      objects would ultimately depend on how we wish to use them and when we
      would like to collect them;
      For this mock application, we will just collect it all in the appData
      object as an exercise; */
  var appData;
  var submittedData;

  function init() {

    docTitle = document.querySelector('title').textContent;

    // just to simulate having someone logged in - typical for commenting;
    userName = 'Kauress';

    appData = {};
    appData['doc-title'] = docTitle;
    submittedData = {};

    container = document.querySelector('.container');

    searchForm = document.querySelector('.search-field-and-button');
    searchInput = document.querySelector('.search-field-and-button input');
    searchButton = document.querySelector('search-field-and-button button');

    commentForm = document.querySelector('.comment-textarea');
    commentTextarea = document.querySelector('.comment-textarea textarea');
    commentButton = document.querySelector('.comment-textarea button');

    subscribeForm = document.querySelector('.subscribe-email');
    subscribeInput = document.querySelector('.subscribe-email input');
    subscribeButton = document.querySelector('.subscribe-email button');

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

  function _checkIfUser() {
    if (userName) {
      /* have a value for userName ( ==> user is mock logged in ) */
      /* execution of formUtilities.checkForAlphanumericAndLength(12, 400) will
          return a function with 'event' as its input parameter;
          returning that will make it available to the element on which
          _checkIfUser was called; */
      return formUtilities.checkForAlphanumericAndLength(12, 200);
      console.log('have a user name');
    } else {
      return function(event) {
        /* indicate to user that they must have an account and
          be logged in order to comment; */
        commentTextarea.setCustomValidity('Sorry, you must be a registered user and be logged in to comment.');
      }
    }
  } // end _checkIfUser

  /* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements */
  /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image */
  function _searchForSubmit(event) {
    /* we will only get in here if all form elements are valid */
    /* without event.preventDefault() and no action attribute/value pair
        specified, page would repost to itself, essentially reloading the page;
    */
    /* additionally, I have checked to make sure user is mock logged in
        before permitting form submission - see _checkIfUser; */
    event.preventDefault();
    var infoName = searchInput.getAttribute('name');
    submittedData[infoName] = {};
    submittedData[infoName][infoName] = searchInput.value;
    /* at this point, we would likely use the JSON format data to send back
        to the server for further processing/use */
    appData['submitted-data'] = submittedData;
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters */
    console.info(JSON.stringify(appData, null, 4)); // Indented 4 spaces);
  } // end _searchForSubmit

  function _commentSubmit(event) {
    /* without event.preventDefault() and no action attribute/value pair
        specified, page would repost to itself, essentially reloading the page;
    */
    event.preventDefault();
    var infoName;
    /* infoName is the value of the "name" attribute of the form input field
        now being submitted; */
    infoName = commentTextarea.getAttribute('name');
    /* below defines a new property, [infoName + '-data'], for the appData
        object, with an object as its value, which will contain this form's
        validated and submitted input, and date/time of submission */
    submittedData[infoName + '-data'] = {};
    submittedData[infoName + '-data']['user'] = userName;
    submittedData[infoName + '-data']['comment-date-time'] = new Date().toString();
    submittedData[infoName + '-data'][infoName] = commentTextarea.value;
    appData['submitted-data'] = submittedData;
    console.info(JSON.stringify(appData, null, 4)); // Indented 4 spaces);
  } // end _commentSubmit

  function _emailSubscribeSubmit(event) {
    /* without event.preventDefault() and no action attribute/value pair
        specified, page would repost to itself, essentially reloading the page;
    */
    event.preventDefault();
    var infoName;
    /* infoName is the value of the "name" attribute of the form input field
        now being submitted; */
    infoName = subscribeInput.getAttribute('name');
    /* below defines a new property, [infoName + '-data'], for the appData
        object, with an object as its value, which will contain this form's
        validated and submitted input, and date/time of submission */
    submittedData[infoName + '-data'] = {};
    submittedData[infoName + '-data']['subscribe-date-time'] = new Date().toString();
    submittedData[infoName + '-data'][infoName] = subscribeInput.value;
    appData['submitted-data'] = submittedData;
    console.info(JSON.stringify(appData, null, 4)); // Indented 4 spaces);

  } // end _emailSubscribeSubmit

  /* this function is here for general info to console only, and not necessary
      for validation or submission of values; */
  function _formSubmitActions(event) {
    console.info('Submitting form with class(es) "' + event.target.classList + '", on ' + new Date());
    /* without event.preventDefault() and no action attribute/value pair
        specified, page would repost to itself, essentially reloading the page;
    */
    event.preventDefault();
    /* checks if any form elements are invalid;
        if form was invalid, we wouldn't get here; */
    console.info(this.checkValidity());
  } // end _formSubmitActions

  function _addListeners() {
    /* I create event listeners for 'submit' events assuming we are emulating
        doing something with the validated information we collect from the
        various inputs */

    searchInput.addEventListener('input', formUtilities.checkForAlphanumericAndLength(2, 25));
    searchForm.addEventListener('submit', _formSubmitActions);
    searchForm.addEventListener('submit', _searchForSubmit);

    // commentTextarea.addEventListener('input', formUtilities.checkForAlphanumericAndLength(12, 400));
    commentTextarea.addEventListener('input', _checkIfUser());
    commentForm.addEventListener('submit', _formSubmitActions);
    commentForm.addEventListener('submit', _commentSubmit);

    subscribeInput.addEventListener('input', formUtilities.emailInputValidate);
    subscribeForm.addEventListener('submit', _formSubmitActions);
    subscribeForm.addEventListener('submit', _emailSubscribeSubmit);

  } // end _addListeners

  return {
    init: init
  };

})(app.formUtilities);