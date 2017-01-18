app.formUtilities = (function(validator, utilities) {

  /* validation for a type=email input with additional self-authored
      validation code */
  function emailInputValidate(event) {
    var eventTarget = event.target;
    var evaluation = validator.isEmailAddress(eventTarget.value);
    if (!evaluation.trueFalse) {
        eventTarget.setCustomValidity(evaluation.result);
      } else {
        eventTarget.setCustomValidity('');
      }
      placeInputLabelFor(eventTarget);
    /* only need to consider doing this for fields that are NOT required;
        however, setBackgroundValidity has logic to determine that; */
      setBackgroundValidity(eventTarget);
  } // end emailInputValidate

  function checkEmailRegex(event) {
    /* may want to add more specific regex pattern message than "canned" one; */
    var eventTarget = event.target;
      placeInputLabelFor(eventTarget);
      setBackgroundValidity(eventTarget);
  }

  /* minDate, and maxDate are optional parameters in
      validator.isValidMmDdYyyyBetween */
  /* use a closure here to have access to minDate, maxDate, within the listener */
  function checkMmDdYyyyAndBounds(minDate, maxDate) {
    return function (event) {
      // console.log('input:', event.target.value);
      // console.log('minDate:', minDate);
      // console.log('maxDate:', maxDate);
      var eventTarget = event.target;
      var evaluation = validator.isValidMmDdYyyyBetween(eventTarget.value, minDate, maxDate);
      if (evaluation.trueFalse) {
        eventTarget.setCustomValidity('');
      } else {
        eventTarget.setCustomValidity(evaluation.result);
        // console.log(evaluation.result);
      }
      placeInputLabelFor(eventTarget);
      setBackgroundValidity(eventTarget);
    };
  } // end checkMmDdYyyyAndBounds

  function checkPhoneValidity(event) {
    var eventTarget = event.target;
    var evaluation = validator.isPhoneNumber(eventTarget.value);
    if (evaluation.trueFalse) {
      eventTarget.setCustomValidity('');
    } else {
      eventTarget.setCustomValidity(evaluation.result);
    }
    placeInputLabelFor(eventTarget);
    setBackgroundValidity(eventTarget);
  } // end checkPhoneValidity

  /* use a closure here to have access to minLen, maxLen, within the listener */
  function checkForAlphaAndLength(minLen, maxLen) {
    return function(event) {
      /* this will validate that eventTarget.value has minLen-maxLen alphabetic
          characters, excluding allowed single internal spaces between
          character sets;
          no leading or trailing spaces are allowed; */
      console.log('checking For Alpha And Length');
      var eventTarget = event.target;
      var letters = utilities.lettersOnly(eventTarget.value);
      if (!validator.isTrimmed(eventTarget.value)) {
        eventTarget.setCustomValidity('This field has disallowed leading, trailing, or extra spaces.');
      } else if ( !(minLen <= letters.length && letters.length <= maxLen) ) {
        eventTarget.setCustomValidity('This field must include ' + minLen + '-' + maxLen + ' alphabetic characters.');
      } else eventTarget.setCustomValidity('');

      placeInputLabelFor(eventTarget);
      setBackgroundValidity(eventTarget);
    };
  } // end checkInputForAlphaAndLength

  function checkForNumericAndLength(minLen, maxLen) {
    return function(event) {
      var eventTarget = event.target;
      var allowableChars = '0123456789';
      var digits = eventTarget.value;
      var evaluation = validator.isStringAllowable(digits, allowableChars);
      if (digits.length != digits.trim().length) {
        eventTarget.setCustomValidity('This field has disallowed leading or trailing spaces.');
      } else if ( !(minLen <= digits.length && digits.length <= maxLen) ) {
        eventTarget.setCustomValidity('This field must be ' + minLen + '-' + maxLen + ' numeric characters.');
      } else if(!evaluation.trueFalse) {
        eventTarget.setCustomValidity('This field must be ' + minLen + '-' + maxLen + ' numeric characters.');
      } else eventTarget.setCustomValidity('');

      placeInputLabelFor(eventTarget);
      setBackgroundValidity(eventTarget);
    };
  } // end checkForNumericAndLength

  function checkForAlphanumericAndLength(minLen, maxLen) {

    return function(event) {
      /* look at only alphanumeric characters in input value */
      var eventTarget = event.target;
      var alphanumOnly = validator.withoutWhitespace(validator.withoutSymbols(eventTarget.value));
      if (!validator.isTrimmed(eventTarget.value)) {
        eventTarget.setCustomValidity('This field has disallowed leading, trailing, or extra spaces.');
      } else if ( !(minLen <= alphanumOnly.length && alphanumOnly.length <= maxLen) ) {
        eventTarget.setCustomValidity('This field must contain ' + minLen + '-' + maxLen + ' alphanumeric characters.');
      } else {
        eventTarget.setCustomValidity('');
      }

      /* below two functions only apply to "specialized" pre-made forms
          with floating labels, as in those from Intro to CSS */
      placeInputLabelFor(eventTarget);
      setBackgroundValidity(eventTarget);
    };
  } // end checkInputForAlphaAndLength

  /* this method is for fields that are NOT required, but get validated, and
      we want to set the background color according to the validity; */
  function setBackgroundValidity(elem) {
    if (!elem.hasAttribute('required') && elem.classList.contains('validate')) {
      // if (elem.checkValidity()) {
      if (elem.checkValidity() && elem.value != '') {
        // elem.classList.add('valid');
        console.log('setting bg color to pale yellow on element:\n', elem);
        elem.style.backgroundColor = '#faffbd';
      } else {
        // elem.classList.remove('valid');
        console.log('setting bg color to white on element:\n', elem);
        elem.style.backgroundColor = '#fff';
      }
    }
  } // end setBackgroundValidity

  function placeInputLabelFor(elem) {
    /* the following is only to manipulate the input label for various conditions */
    /* an assumed and consistent structure is necessary here for all forms
        that have the "floating" label; */
    var adjacentLabel;
    var span_prefix;
    var span_suffix;
    if (elem.classList.contains('has-floating-label') && elem.id != '') {
      adjacentLabel = document.querySelector('#' + elem.id + ' + label');
      span_prefix = document.querySelector('#' + elem.id + ' + label span.prefix');
      span_suffix = document.querySelector('#' + elem.id + ' + label span.suffix');
    } else {
      /* don't do anything if the input element does not have the
          'has-floating-label' class; */
      return;
    }
    /* check to see if the layout appplies, i.e., if there is an adjacentLabel */
    if (adjacentLabel) {
      // don't seem to need the additional condition in below, but keep in mind;
      // if (elem.value.length > 0 || elem.hasAttribute('placeholder') || elem.checkValidity()) {
      if (elem.value.length > 0 || elem.hasAttribute('placeholder') ) {
        /* if there is something in the field (including a placeholder value),
            we don't want the label inside; */
        adjacentLabel.classList.add('label-above-input');
        adjacentLabel.classList.remove('label-within-input');
        /* hide associated prefix span */
        if (span_prefix) {
          span_prefix.classList.add('display-none');
          span_prefix.classList.remove('display-inline');
        }
        /* show associated suffix span */
        if (span_suffix) {
          span_suffix.classList.add('opacity-1');
          span_suffix.classList.remove('opacity-0');
        }
      } else {
        /* field is empty, so we can put label within */
        adjacentLabel.classList.add('label-within-input');
        adjacentLabel.classList.remove('label-above-input');
        /* show associated prefix span */
        if (span_prefix) {
          span_prefix.classList.add('display-inline');
          span_prefix.classList.remove('display-none');
        }
        /* hide associated suffix span */
        if (span_suffix) {
          span_suffix.classList.add('opacity-0');
          span_suffix.classList.remove('opacity-1');
        }
      } // end else
    } // end if (adjacentLabel)

  } // end signUpForm.placeInputLabelFor

  return {
               placeInputLabelFor: placeInputLabelFor,
           checkForAlphaAndLength: checkForAlphaAndLength,
         checkForNumericAndLength: checkForNumericAndLength,
    checkForAlphanumericAndLength: checkForAlphanumericAndLength,
            setBackgroundValidity: setBackgroundValidity,
           checkMmDdYyyyAndBounds: checkMmDdYyyyAndBounds,
               checkPhoneValidity: checkPhoneValidity,
               emailInputValidate: emailInputValidate,
                  checkEmailRegex: checkEmailRegex
  }

})(app.validator, app.utilities);