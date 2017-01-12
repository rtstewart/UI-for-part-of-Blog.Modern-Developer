  // http://www.w3schools.com/js/js_errors.asp
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw

/* for testing in global environment, uncomment below, and comment out
    "app.validator = (function(helpers) {";
    also, see commenting/uncommenting lines at bottom of file;
*/

// var validator = (function(helpers) {

app.validator = (function(helpers) {

  // assert is for testing
  // use: validator.assert( validator.isEmailAddress('bobby@me.com'), true)
  // use: validator.assert( validator.isEmailAddress('@bobby@me.com'), false)
  function assertThat(a, b) {
    return a == b;
  }

  function whatTypeIs(param) {
    // report/return what data type param is
    var paramIs = typeof param;
    if (paramIs === "object") {
      /* always use the next line;
          then, the two following will give optional formats */
      paramIs = Object.prototype.toString.call(param); // "[object ObjType]"
      //paramIs = paramIs.slice(paramIs.indexOf(' ') + 1, paramIs.length - 1); // "ObjType"
      paramIs = paramIs.slice(1, paramIs.length - 1); // "object ObjType"
    }
    return paramIs;
  } // end whatTypeIs

  function typeOf(param) {
    // report/return what data type param is
    var paramIs = typeof param;
    if (paramIs === "object") {
      /* always use the next line;
          then, the two following will give optional formats */
      paramIs = Object.prototype.toString.call(param); // "[object ObjType]"
      paramIs = paramIs.slice(paramIs.indexOf(' ') + 1, paramIs.length - 1).toLowerCase(); // "objType"
      // paramIs = paramIs.slice(1, paramIs.length - 1); // "object ObjType"
    }
    return paramIs;
  } // end typeOf

  function isStringAllowable(testString, allowableString) {
    /*
      Checks if every character of testString is present in allowableString.
    */
    var offendingChar;
    for (var i=0; i<testString.length; i++) {
      if (allowableString.indexOf(testString.charAt(i)) == -1) {
        offendingChar = testString.charAt(i);
        return {trueFalse: false, result: 'Disallowed character "' + offendingChar + '" was found in string.'};
      }
    }
    return {trueFalse: true, result: 'String is allowable.'};
  } // end isStringAllowable

  function containsAnInstanceIn(testString, instanceInString) {
    /*
      Checks to see if there is at least one instance of a character in
      testString that exists in instanceInString.
      Useful for passwords where you might want to have at least one of
      a certain set of characters in the password.
    */
    for (var i=0; i<testString.length; i++) {
      if (instanceInString.indexOf(testString.charAt(i)) != -1) return true;
    }
    return false;
  } // end containsAnInstanceIn

  function hasRequiredChars(input) {
    /*
      Checks that at least one of input value's characters appears at least
      once in each subsequent arguments[n] string, where n>0.
      Useful for checking inclusion of required character types in passwords.
    */
    /* must have at least one other argument than input */
    var argsObj = {'input':input, 'arguments[1]':arguments[1]};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(hasRequiredChars, argsObj) ) {
      return false;
    }
    for (var i=1; i<arguments.length; i++) {
      if (!containsAnInstanceIn(input, arguments[i])) return false;
    }
    return true;
  } // end hasRequiredChars

  function isEmailAddress(input) {
    /* Checks if the input parameter is an email address, consisting of three
      parts: An email address consists of two strings combined by an @ symbol. */

    /* Regarding top-level-domain:
        https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
        https://www.icann.org/resources/pages/tlds-2012-02-25-en */

    /*
      intrinsic constraints for <input type="email":

      https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
      The value must follow the ABNF production:
      1*( atext / "." ) "@" ldh-str 1*( "." ldh-str )
        where:
        - atext is defined in RFC 5322, i.e., a US-ASCII letter (A to Z and a-z),
        a digit (0 to 9) or one of the following:
        ! # $ % & ' * + - / = ? ` { } | ~ special character;
        - ldh-str is defined in RFC 1034, i.e., US-ASCII letters,
        mixed with digits and - grouped in words separated by a dot (.).

        ABNF: http://www.ietf.org/rfc/std/std68.txt
        RFC 5322: http://tools.ietf.org/html/rfc5322
        RFC 1034: http://www.apps.ietf.org/rfc/rfc1034.html#sec-3.5
    */
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isEmailAddress, argsObj) ) {
      return false;
    }
    var parts = [];
    var errMsg = '';
    if (input.lastIndexOf('@') == -1) {
      errMsg = 'input must have "@" separating the username from the domain + top-level domain portion of the email address';
      helpers.errHandler.call(isEmailAddress, errMsg);
      return {trueFalse: false, result: errMsg};
    } else {
      // parts[0] will contain the username
      parts.push(input.slice(0, input.lastIndexOf('@')));
    }
    if (input.lastIndexOf('.') == -1) {
      errMsg = 'input must have a dot, ".", separating the the domain from the top-level domain portion of the email address';
      helpers.errHandler.call(isEmailAddress, errMsg);
      return {trueFalse: false, result: errMsg};
    } else {
      // parts[1] will contain the domain
      parts.push(input.slice(input.lastIndexOf('@') + 1, input.lastIndexOf('.')));
      // parts[2] will contain the top-level domain
      parts.push(input.slice(input.lastIndexOf('.') + 1));
    }
    // the stage is set for further testing on each element of parts
    // console.log(parts);
    return {trueFalse: true, result: 'valid email address'};
  } // end isEmailAddress

  function isPhoneNumber(input) {
    // Checks if the input parameter is a valid phone number for your country.
    /* want phone number input of form xxx-xxx-xxxx, or 1-xxx-xxx-xxxx,
        or (xxx) xxx-xxxx */
    /*
      Several different types of formats are common in the United States:
        - The traditional formatting convention for phone numbers is
          (NPA) NXX-XXXX, where NPA is the area code and NXX-XXXX is the
          subscriber number.
          The NXX prefix of the subscriber number indicates the local telephone
          exchange or rate center.
        - The format can be written NPA-NXX-XXXX, or as 1-NPA-NXX-XXXX when
          including the number 1, the long-distance trunk access code.
        - Sometimes the stylized format NPA.NXX.XXXX is seen, more common
          since the rise of the Internet and the dot-separated notation of
          domain names.
    */
    if(!helpers.areParametersDefined.call(isPhoneNumber, {'input':input}) ) {
      return false;
    }
    input = input.toString();
    var i;
    var parts = input.split('-');

    if (parts.length != 3) {
          errMsg = 'You entered:' + input + '\nInput must have 2 hyphens that separate the 3 parts.\nExpected format is xxx-xxx-xxxx';
          helpers.errHandler.call(isPhoneNumber, errMsg);
          return {trueFalse: false, result: errMsg};
    }
    for (i=0; i<parts.length; i++) {
          if (i == 0) {
            if (parts[0].length != 3 || isNaN(parts[0]) || parts[0].slice(0,1) == 0) {
              errMsg = 'You entered:' + input + '\nThe area code must be 3 digits, and not begin with a zero.\nExpected format is xxx-xxx-xxxx';
              helpers.errHandler.call(isPhoneNumber, errMsg);
              return {trueFalse: false, result: errMsg};
            }
          }
          if (i == 1) {
            if (parts[1].length != 3 || isNaN(parts[1]) || parts[1].slice(0,1) == 0) {
              errMsg = 'You entered:' + input + '\nThe exchange must be 3 digits, and not begin with a zero.\nExpected format is xxx-xxx-xxxx';
              helpers.errHandler.call(isPhoneNumber, errMsg);
              return {trueFalse: false, result: errMsg};
            }
          }
          if (i == 2) {
            if (parts[2].length != 4 || isNaN(parts[2])) {
              errMsg = 'You entered:' + input + '\nThe line number must be 4 digits.\nExpected format is xxx-xxx-xxxx;';
              helpers.errHandler.call(isPhoneNumber, errMsg);
              return {trueFalse: false, result: errMsg};
            }
          }
      } // end for
      return {trueFalse: true, result: 'valid phone number'}; // input is valid
  } // end isPhoneNumber

  /* with other methods for phone number validation, I was just experimenting
      with method "formats" whereby, they would be constructed to accommodate
      running a battery of tests, without multiple or nested if statements */
  function isPhoneNumberObj(input) {
    // Checks if the input parameter is a valid phone number for your country.
    // want phone number input of form xxx-xxx-xxxx    // want phone number input of form xxx-xxx-xxxx
    input = input.toString();
    var firstHyphenAt = input.indexOf('-');
    var secondHyphenAt = input.lastIndexOf('-');
    var part1;
    var part2;
    var part3;
    var errMsg;

    var tests = {
      '1':  function() {
              if (input.length != 12) {
                errMsg = 'you entered:' + input + '\ninput must be 12 characters long, of format xxx-xxx-xxxx';
                return true;
              }
            },
      '2':  function() {
              if (firstHyphenAt == -1) {
                errMsg = 'you entered:' + input + '\ninput must have 2 hyphens that separate the 3 parts, xxx-xxx-xxxx';
                return true;
              }
            },
      '3':  function() {
              if (firstHyphenAt == secondHyphenAt) {
                errMsg = 'you entered:' + input + '\ninput must have 2 hyphens that separate the 3 parts, xxx-xxx-xxxx';
                return true;
              }
            },
      '4':  function() {
              // seems ok to create these values
              part1 = input.slice(0, firstHyphenAt);
              part2 = input.slice(firstHyphenAt + 1, secondHyphenAt);
              part3 = input.slice(secondHyphenAt + 1);
              return false;
            },
      '5':  function() {
              if (part1.length != 3 || isNaN(part1) || part1.slice(0,1) == 0) {
                errMsg = 'you entered:' + input + '\nthe area code must be 3 digits, and not begin with a zero;';
                return true;
              }
            },
      '6':  function() {
              if (part2.length != 3 || isNaN(part2) || part2.slice(0,1) == 0) {
                errMsg = 'you entered:' + input + '\nthe exchange must be 3 digits, and not begin with a zero;';
                return true;
              }
            },
      '7':  function() {
              if (part3.length != 4 || isNaN(part3)) {
                errMsg = 'you entered:' + input + '\nthe line number must be 4 digits;';
                return true;
              }
            }
    } // end var tests

    for (var key in tests) {
      //console.log(key);
      if (tests[key]()) {
        helpers.errHandler(errMsg);
        return false;
      }
    }
    return true; // input is valid
  } // end isPhoneNumberObj

  function isPhoneNumberArr(input) {
    // Checks if the input parameter is a valid phone number for your country.
    // want phone number input of form xxx-xxx-xxxx
    input = input.toString();
    var firstHyphenAt = input.indexOf('-');
    var secondHyphenAt = input.lastIndexOf('-');
    var part1;
    var part2;
    var part3;
    var errMsg;

    var tasks = [
      function() {
        if (input.length != 12) {
          errMsg = 'you entered:' + input + '\ninput must be 12 characters long, of format xxx-xxx-xxxx';
          return true;
        }
      },
      function() {
        if (firstHyphenAt == -1) {
          errMsg = 'you entered:' + input + '\ninput must have 2 hyphens that separate the 3 parts, xxx-xxx-xxxx';
          return true;
        }
      },
      function() {
        if (firstHyphenAt == secondHyphenAt) {
          errMsg = 'you entered:' + input + '\ninput must have 2 hyphens that separate the 3 parts, xxx-xxx-xxxx';
          return true;
        }
      },
      function() {
        // seems ok to create these values
        part1 = input.slice(0, firstHyphenAt);
        part2 = input.slice(firstHyphenAt + 1, secondHyphenAt);
        part3 = input.slice(secondHyphenAt + 1);
        return false;
      },
      function() {
        if (part1.length != 3 || isNaN(part1) || part1.slice(0,1) == 0) {
          errMsg = 'you entered:' + input + '\nthe area code must be 3 digits, and not begin with a zero;';
          return true;
        }
      },
      function() {
        if (part2.length != 3 || isNaN(part2) || part2.slice(0,1) == 0) {
          errMsg = 'you entered:' + input + '\nthe exchange must be 3 digits, and not begin with a zero;';
          return true;
        }
      },
      function() {
        if (part3.length != 4 || isNaN(part3)) {
          errMsg = 'you entered:' + input + '\nthe line number must be 4 digits;';
          return true;
        }
      }
    ] // end var tasks

    for (var i=0; i<tasks.length; i++) {
      //console.log(key);
      if (tasks[i]()) {
        //if(errMsg) _errHandler(errMsg);
        helpers.errHandler(errMsg);
        return false;
      }
    }
    return true; // input is valid
  } // end function isPhoneNumberArr

  function isPhoneNumberArr2(input) {
    // Checks if the input parameter is a valid phone number for your country.
    // want phone number input of form xxx-xxx-xxxx
    if(!helpers.areParametersDefined.call(isPhoneNumberArr2, {'input':input}) ) {
      return false;
    }
    input = input.toString();
    var i;
    var parts = input.split('-');

    var tasks = [
      function isLength3() {
        if (parts.length != 3) {
          errMsg = 'you entered:' + input + '\ninput must have 2 hyphens that separate the 3 parts\nexpected format is xxx-xxx-xxxx';
          return false;
        } else return true;
      },
      function checkPartsDigitsLengths() {
        for (i=0; i<parts.length; i++) {
          if (i == 0) {
            if (parts[0].length != 3 || isNaN(parts[0]) || parts[0].slice(0,1) == 0) {
              errMsg = 'you entered:' + input + '\nthe area code must be 3 digits, and not begin with a zero\nexpected format is xxx-xxx-xxxx';
              return false;
            }
          }
          if (i == 1) {
            if (parts[1].length != 3 || isNaN(parts[1]) || parts[1].slice(0,1) == 0) {
              errMsg = 'you entered:' + input + '\nthe exchange must be 3 digits, and not begin with a zero\nexpected format is xxx-xxx-xxxx';
              return false;
            }
          }
          if (i == 2) {
            if (parts[2].length != 4 || isNaN(parts[2])) {
              errMsg = 'you entered:' + input + '\nthe line number must be 4 digits\nexpected format is xxx-xxx-xxxx';
              return false;
            }
          }
        } // end for
        return true;
      } // end function checkPartsDigitsLengths

    ] // end var tasks

    for (i=0; i<tasks.length; i++) {
      //console.log(key);
      if (!tasks[i]()) {
        //if(errMsg) _errHandler(errMsg);
        helpers.errHandler.call(isPhoneNumberArr2, errMsg);
        return false;
      }
    }
    return true; // input is valid
  } // end function isPhoneNumberArr2

  function withoutSymbols(input) {
    /* Returns the input parameter text with all symbols removed. Symbols refer
      to any non-alphanumeric character. A character is considered alphanumeric
      if it matches one of the following: a—z, A—Z, or 0—9. Ignore whitespace. */
    if(!helpers.areParametersDefined.call(withoutSymbols, {'input':input}) ) {
      return false;
    }
    var allowableString = ' \t\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var withoutSymbolsStr = '';
    var currentInputChar;
    for (var i=0; i<input.length; i++) {
      currentInputChar = input.charAt(i);
      if (allowableString.indexOf(currentInputChar) !== -1) {
        withoutSymbolsStr += currentInputChar;
      }
    }
    return withoutSymbolsStr;
  } // end withoutSymbols

  function withoutWhitespace(input) {
    /* Returns the input parameter text with all whitespace removed.
        Whitespace refers to space, tab, new line character. */
    if(!helpers.areParametersDefined.call(withoutWhitespace, {'input':input}) ) {
      return false;
    }
    var whitespace = ' \t\n';
    var withoutWhitespaceStr = '';
    var currentInputChar;
    for (var i=0; i<input.length; i++) {
      currentInputChar = input.charAt(i);
      if (whitespace.indexOf(currentInputChar) == -1) {
        withoutWhitespaceStr += currentInputChar;
      }
    }
    return withoutWhitespaceStr;
  } // end withoutWhitespace

  function isDate(input) {
    /* Checks if the input parameter text is a valid date. For our purposes,
      a valid date is any string that can be turned into a JavaScript
      Date Object. */
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    /*
      new Date(); gets now
      new Date(milliseconds); a number
      new Date(dateString); a string
      new Date(year, month, day, hours, minutes, seconds, milliseconds); numbers
    */
    if(!helpers.areParametersDefined.call(isDate, {'input':input}) ) {
      return false;
    }
    var aDate = new Date(input);
    /* just to be explicit, I'll NOT use: return !isNaN(aDate.getTime()); */
    // return isNaN(aDate.getTime())
    //         ? {trueFalse: false, result: '"' + input + '" is not a valid date string.'}
    //         : {trueFalse: true, result: '"' + input + '" is a valid date string.'};
    return isNaN(aDate.getTime()) ? false : true;
  } // end isDate

function isHhMmAmPm(input, minHr, maxHr, minutesInterval) {
  /* checks that input is a valid hh:mm AM/PM format for time;
      useful for appointment specification */
  /* Optional parameters:
      minHr will be the minimum hour specification for a valid time;
      maxHr will be the maximum hour specification for a valid time;
      minutesInterval needs to be 5, 10, 15, 20, 30, or 60 - which divide
      evenly into 60;
      I have in mind to use this for scheduling where you may want
      to restrict scheduling to every, 5, 10, 15, 20, 30, or 60 minutes
      "on the hour";
  */

  if(!helpers.areParametersDefined.call(isHhMmAmPm, {'input':input}) ) {
    return false;
  }
  var errMsg;
  var hh;
  var mm;
  var amPm;
  var parts;
  var temp;
  parts = input.split(':');

  if (parts.length != 2) {
    errMsg = 'Input is missing the colon (:) for, hh:mm AM/PM format.';
    return {trueFalse: false, result: errMsg};
  }

  temp = parts[1].split(' ');

  if (temp.length != 2) {
    errMsg = 'Input is missing the single space between "mm", and AM/PM, for, "hh:mm AM/PM" format.';
    return {trueFalse: false, result: errMsg};
  }

  hh = parts[0];
  mm = parts[1] = temp[0];
  amPm = parts[2] = temp[1];

  if (hh.length != 2 || !isNumeric(hh).trueFalse) {
    errMsg = 'The "hh" component of hh:mm AM/PM must be 2 digits.';
    return {trueFalse: false, result: errMsg};
  }
  if (!(hh.slice(0,1) == '0' || hh.slice(0,1) == '1') ) {
    errMsg = 'The "hh" component of hh:mm AM/PM can only be "0" (zero), or, "1"';
    return {trueFalse: false, result: errMsg};
  }
  if (hh.slice(0,1) == '0') {
    /* the first digit of hh is 1 */
    if ( !(1 <= parseInt(hh.slice(1)) && parseInt(hh.slice(1)) <= 9) ) {
      errMsg = hh + ' is not valid for the "hh" component of "hh:mm AM/PM"';
      return {trueFalse: false, result: errMsg};
    }
  } else {
    /* the first digit of hh is 1 */
    if ( !(0 <= parseInt(hh.slice(1)) && parseInt(hh.slice(1)) <= 2) ) {
      errMsg = hh + ' is not valid for the "hh" component of "hh:mm AM/PM"';
      return {trueFalse: false, result: errMsg};
    }
  }
  if (mm.length != 2 || !isNumeric(mm).trueFalse) {
    errMsg = 'The "mm" component of hh:mm AM/PM must be 2 digits, followed by a single space before AM/PM.';
    return {trueFalse: false, result: errMsg};
  }
  if ( !(0 <= parseInt(mm) && parseInt(mm) <= 59) ) {
    errMsg = mm + ' is not valid for the "mm" component of "hh:mm AM/PM"';
    return {trueFalse: false, result: errMsg};
  }
  if ( !(amPm == 'AM' || amPm == 'PM') ) {
    errMsg = 'The AM/PM component of "hh:mm AM/PM" must be upper-case: "AM", or, "PM"';
    return {trueFalse: false, result: errMsg};
  }
  /* the following code (prior to the final return statement) strictly handles
      the optional parameters if supplied */

  /* utilizing optional parameters is not implemented yet */

  return {trueFalse: true, result: 'Input is in "hh:mm AM/PM" format.'};
}

function isValidMmDdYyyy(input) {
    /* Checks if the input parameter text is a valid date string of the format:
        mm/dd/yyyy, or, mm-dd-yyyy
    */
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    /*
      new Date(); gets now
      new Date(milliseconds); a number
      new Date(dateString); a string
      new Date(year, month, day, hours, minutes, seconds, milliseconds); numbers
    */
    if (!helpers.areParametersDefined.call(isValidMmDdYyyy, {'input':input}) ) {
      return false;
    }

    var monthDayYear;
    var month;
    var day;
    var year;
    var errMsg;

    var days30 = [4,6,9,11];
    var days31 = [1,3,5,7,8,10,12];

    /* at this point, both minDate, and maxDate are two valid date objects,
        so we can easily do date calculations; */

    if (input.indexOf('/') != -1) {
      monthDayYear = input.split('/');
    } else if (input.indexOf('-') != -1) {
      monthDayYear = input.split('-');
    } else {
      errMsg = 'Please use mm-dd-yyyy, \nor, mm/dd/yyyy format.';
      return {trueFalse: false, result: errMsg};
    }

    if (monthDayYear.length != 3) {
      errMsg = 'Please use mm-dd-yyyy, \nor, mm/dd/yyyy format.';
      return {trueFalse: false, result: errMsg};
    }

    month = monthDayYear[0];
    day = monthDayYear[1];
    year = monthDayYear[2];

    if (month.length != 2
      || !(1 <= parseInt(month) && parseInt(month) <= 12)
      || month.indexOf(' ') != -1 || !isNumeric(month).trueFalse) {
      errMsg = 'The month value must be 2 digits, 01-12.';
      return {trueFalse: false, result: errMsg};
    }
    if (day.length != 2
      || !(1 <= parseInt(day) && parseInt(day) <= 31)
      || day.indexOf(' ') != -1 || !isNumeric(day).trueFalse) {
      errMsg = 'The day value must be 2 digits, 01-31, \nand its validity is month-dependant.';
      return {trueFalse: false, result: errMsg};
    }
    if (year.length != 4 || !isNumeric(year).trueFalse) {
      errMsg = 'The year value must be 4 digits.';
      return {trueFalse: false, result: errMsg};
    }
    /* we already have allowed for a day number between 1 and 31 */
    /* so we just need to check those months whose days would be less than 31 */
    if (days30.indexOf(parseInt(month)) != -1) {
      /* mm value was specified as a 30-day month */
      errMsg = 'The day value is too large for the specified month.';
      if (parseInt(day) == 31) {
        errMsg = 'The day value is too large for the specified month.';
        return {trueFalse: false, result: errMsg};
      }
    }
    if (parseInt(month) == 2) {
      /* mm value was specified as '02' - February */
      if (_isLeapYear(parseInt(year))) {
        if (parseInt(day) > 29) {
          errMsg = 'The day value is too large for the specified month and year.';
          return {trueFalse: false, result: errMsg};
        }
      } else {
        if (parseInt(day) > 28) {
          errMsg = 'The day value is too large for the specified month and year.';
          return {trueFalse: false, result: errMsg};
        }
      }
    }
    /* at this point, should have a valid input date in the requested format */
    return {trueFalse: true, result: 'The date is valid.'};
  } // end isValidMmDdYyyy

function createOrVerifyDateObj(input) {
  /* createOrVerifyDateObj looks for either a valid date string, or a valid
      date object as input;
      if input is a valid date string, it will create a date object from the
      string;
      returns an object indicating truth of input being a valid date string,
      or date object, and as the second returned property, either an error
      message if invalid, or the valid date object */
  if (Object.prototype.toString.call(input) == '[object String]') {
    if (isDate(input)) {
      /* it has been deemed a valid date string;
          create a date object from it */
      input = new Date(input);
    } else {
      errMsg ='Supplied input value, "' + input + '" is not a valid date string.';
      return {trueFalse: false, result: errMsg};
    }
  } else if (Object.prototype.toString.call(input) == '[object Date]') {
    if (!isValidDateObject(input)) {
      errMsg ='Supplied input value, "' + input + '" is not a valid date object.';
      return {trueFalse: false, result: errMsg};
    }
  } else {
    errMsg = 'Supplied value for input (' + input + ') is neither a valid date string, nor Date object.';
    return {trueFalse: false, result: errMsg};
  }
  return {trueFalse: true, result: input};
} // end createOrVerifyDateObj

function isValidMmDdYyyyBetween(input, minDate, maxDate) {
    /* Checks if the input parameter text is a valid date string of the format:
        mm/dd/yyyy, or, mm-dd-yyyy;
        Optional parameters (both must be provided or not):
          - minDate: the earliest date allowable; can be a valid date string
            or date object;
          - maxDate: the latest date allowable; can be a valid date string
            or date object;
          - if either of these are invalid, they will not be utilized;
    */
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    /*
      new Date(); gets now
      new Date(milliseconds); a number
      new Date(dateString); a string
      new Date(year, month, day, hours, minutes, seconds, milliseconds); numbers
    */
    if (!helpers.areParametersDefined.call(isValidMmDdYyyyBetween, {'input':input}) ) {
      return false;
    }
    var inputDate;
    var monthDayYear;
    var month;
    var day;
    var year;
    var errMsg;

    var now = new Date();
    var nowYear = now.getFullYear();

    var days30 = [4,6,9,11];
    var days31 = [1,3,5,7,8,10,12];

    var evaluation;

    /* at this point, both minDate, and maxDate are two valid date objects,
        so we can easily do date calculations; */

    if (input.indexOf('/') != -1) {
      monthDayYear = input.split('/');
    } else if (input.indexOf('-') != -1) {
      monthDayYear = input.split('-');
    } else {
      errMsg = 'Please use mm-dd-yyyy, \nor, mm/dd/yyyy format.';
      return {trueFalse: false, result: errMsg};
    }

    if (monthDayYear.length != 3) {
      errMsg = 'Please use mm-dd-yyyy, \nor, mm/dd/yyyy format.';
      return {trueFalse: false, result: errMsg};
    }

    month = monthDayYear[0];
    day = monthDayYear[1];
    year = monthDayYear[2];

    if (month.length != 2
      || !(1 <= parseInt(month) && parseInt(month) <= 12)
      || month.indexOf(' ') != -1 || !isNumeric(month).trueFalse) {
      errMsg = 'The month value must be 2 digits, 01-12.';
      return {trueFalse: false, result: errMsg};
    }
    if (day.length != 2
      || !(1 <= parseInt(day) && parseInt(day) <= 31)
      || day.indexOf(' ') != -1 || !isNumeric(day).trueFalse) {
      errMsg = 'The day value must be 2 digits, 01-31, \nand its validity is month-dependant.';
      return {trueFalse: false, result: errMsg};
    }
    if (year.length != 4 || !isNumeric(year).trueFalse) {
      errMsg = 'The year value must be 4 digits.';
      return {trueFalse: false, result: errMsg};
    }
    /* we already have allowed for a day number between 1 and 31 */
    /* so we just need to check those months whose days would be less than 31 */
    if (days30.indexOf(parseInt(month)) != -1) {
      /* mm value was specified as a 30-day month */
      errMsg = 'The day value is too large for the specified month.';
      if (parseInt(day) == 31) {
        errMsg = 'The day value is too large for the specified month.';
        return {trueFalse: false, result: errMsg};
      }
    }
    if (parseInt(month) == 2) {
      /* mm value was specified as '02' - February */
      if (_isLeapYear(parseInt(year))) {
        if (parseInt(day) > 29) {
          errMsg = 'The day value is too large for the specified month and year.';
          return {trueFalse: false, result: errMsg};
        }
      } else {
        if (parseInt(day) > 28) {
          errMsg = 'The day value is too large for the specified month and year.';
          return {trueFalse: false, result: errMsg};
        }
      }
    }
    /* at this point, should have a valid input date in the requested format */
    if (helpers.areParametersDefined.call(isValidMmDdYyyyBetween, {'minDate':minDate, 'maxDate':maxDate}) ) {

      evaluation = createOrVerifyDateObj(minDate);
      if (evaluation.trueFalse) {
        minDate = evaluation.result;
      } else {
        return evaluation;
      }
      evaluation = createOrVerifyDateObj(maxDate);
      if (evaluation.trueFalse) {
        maxDate = evaluation.result;
      } else {
        return evaluation;
      }
      inputDate = new Date(input);
      if (!(minDate < maxDate)) {
        /* this could be a user error if asked to provide date bounds */
        errMsg = 'The value you supplied for the minimum date, "' + minDate
                  + '", is not older than the maximum date you supplied, "'
                  + maxDate + '"';
        /* it is possibly a programmer input error, so notify console */
        helpers.errHandler.call(isValidMmDdYyyyBetween, errMsg);
        return {trueFalse: false, result: errMsg};
      }
      /* now see if the input date is between minDate and maxDate, inclusive */
      if (!(minDate <= inputDate && inputDate <= maxDate)) {
        errMsg = 'The date you supply must be between '
                  + (minDate.getMonth()+1) + '/' + minDate.getDate() + '/' + minDate.getFullYear()
                  + ' - '
                  + (maxDate.getMonth()+1) + '/' + maxDate.getDate() + '/' + maxDate.getFullYear()
                  + ', inclusive.';
        return {trueFalse: false, result: errMsg};
      }
    } // end if (helpers.areParametersDefined.call( ... )

    return {trueFalse: true, result: 'The date is valid.'};
  } // end isValidMmDdYyyyBetween

  function isValidDateObject(dateObj) {
    if(!helpers.areParametersDefined.call(isValidDateObject, {'dateObj':dateObj}) ) {
      return false;
    }
    if (Object.prototype.toString.call(dateObj) == '[object Date]') {
      if (isNaN(dateObj.getTime())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } // end isValidDateObject

  function createDateObjsObj(argsObj) {
    /* function expects argsObj as:
      {'param1Name':param1Value, ..., 'paramNName':paramNValue}
    */
    // paramXValue should be either a string or a Date object
    /* function will return either:
        - false if any paramValue is not a valid Date object, or string that
          can be made into a Date object;
          or,
        - paramsAsObj={'param1Name':param1ValueAsDateObject, ...
          ..., 'paramNName':paramNValueAsDateObject},
          if all passed paramXValue(s) can allow creation of,
          or are, valid Date objects
    */
    var paramsAsObj = {};
    // see what type of parameters were sent in
    for (key in argsObj) {
      if ( typeof argsObj[key] == 'string') {
        if (validator.isDate(argsObj[key])) {
          paramsAsObj[key] = new Date(argsObj[key]);
        } else {
          errMsg = 'Input parameter: ' + key + ' = ' + argsObj[key] + ', is not a valid string for a date';
          helpers.errHandler.call(this, errMsg);
          return false;
        }
      } else if (Object.prototype.toString.call(argsObj[key]) == '[object Date]') {
          if (isValidDateObject(argsObj[key])) {
            paramsAsObj[key] = argsObj[key];
          } else {
            errMsg = 'Input parameter: ' + key + ' = ' + argsObj[key] + ', is not a valid Date object';
            helpers.errHandler.call(this, errMsg);
            return false;
          }
      } else {
        errMsg = 'parameter: ' + key + ' = ' + argsObj[key] + ', is not a date string, or Date object';
          helpers.errHandler.call(this, errMsg);
          return false;
      }
    } // end for
    return paramsAsObj;
  } // end createDateObjsObj

  function isBeforeDate(input, reference) {
    /*
      Checks if the input parameter is a date that comes before the reference
      date. Both the input and the reference can be strings or Date Objects.
      This function relies on two valid dates; if two are not found, it will
      throw a new error.
    */
    var argsObj = {'input':input, 'reference':reference};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isBeforeDate, argsObj) ) {
      return false;
    }
    var paramsAsObj = createDateObjsObj.call(isBeforeDate, argsObj);
    /* paramsAsObj will now be either false, or,
        paramsAsObj={'inputParam1Name':inputParam1ValueAsDateObject, ...
        ..., 'inputParamNName':inputParamNValueAsDateObject} */
    if (paramsAsObj) {
      // now have two valid date objects to work with in paramsAsObj object
      return paramsAsObj['input'] < paramsAsObj['reference'];
    } else {
      return false;
    }

  } // end isBeforeDate

  function isAfterDate(input, reference) {
    /* Checks if the input parameter is a date that comes after the reference
       date. Both the input and the reference can be strings or Date Objects.
       This function relies on two valid dates; if two are not found, it should
       throw a new error. */
    var argsObj = {'input':input, 'reference':reference};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isAfterDate, argsObj) ) {
      return false;
    }
    var paramsAsObj = createDateObjsObj.call(isAfterDate, argsObj);
    /* paramsAsObj will now be either false, or,
        paramsAsObj={'inputParam1Name':inputParam1ValueAsDateObject, 'inputParamNName':inputParamNValueAsDateObject} */
    if (paramsAsObj) {
      // now have two valid date objects to work with in paramsAsObj object
      return paramsAsObj['input'] > paramsAsObj['reference'];
    } else {
      return false;
    }
  } // end isAfterDate

  function isBeforeToday(input) {
    /*
      Checks if the input parameter is a date that comes before today.
      The input can be either a string or a Date Object.
      This function relies on one valid date; if one is not found,
      it will throw a new error.
    */
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isBeforeToday, argsObj) ) {
      return false;
    }
    var now = new Date();
    var today;
    // we want today as of 0 hours, 0 minutes, and 0 seconds into today
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var inputAsDateObj = createDateObjsObj.call(isBeforeToday, argsObj);
    if (inputAsDateObj) {
      // now have a valid date object to work with in inputAsDateObj object
      return inputAsDateObj['input'] < now;
    } else return false;
  } // end isBeforeToday

  function isAfterToday(input) {
    /* Checks if the input parameter is a date that comes after today.
        The input can be either a string or a Date Object.
        This function relies on one valid date; if one is not found,
        it should throw a new error.
    */
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isAfterToday, argsObj) ) {
      return false;
    }
    var now = new Date();
    var tomorrow;
    // we want tomorrow as of 0 hours, 0 minutes, and 0 seconds into tomorrow
    /* if now is at the last day of the month, JS will give tomorrow below
      as the first day of next month from now.getDate() + 1 */
    tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var inputAsDateObj = createDateObjsObj.call(isAfterToday, argsObj);
    if (inputAsDateObj) {
      // now have a valid date object to work with in inputAsDateObj object
      // console.log(inputAsDateObj);
      return inputAsDateObj['input'] >= tomorrow;
    } else return false;
  } // end isAfterToday

  function isEmpty(input) {
    /*
      Checks the input parameter and returns true if it is an empty string –
      that is, a string with no length, or characters represented as "",
      or only contains whitespace(s).
    */
    var argsObj = {'input':input};
    var whitespace = ' \n\t';
    var errMsg;
    var numNonWhitespaceChars = 0;
    var currentChar;
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isEmpty, argsObj) ) {
      return false;
    }
    /* check for a string primitive or object, and create noWhitespaceStr
        which has not whitespace */
    if (Object.prototype.toString.call(input) == '[object String]') {
      if (input.length != 0) {
        // remove occurrences of ""
        while (input.indexOf('""') != -1) {
          input = input.slice(0, input.indexOf('""')) + input.slice(input.indexOf('""')+2);
        }
        // remove occurrences of ''
        while (input.indexOf("''") != -1) {
          input = input.slice(0, input.indexOf("''")) + input.slice(input.indexOf("''")+2);
        }
        // should we also look for substrings of input like '...', or "..." ??
        // if not, then below finishes the rest
        for (var i=0; i<input.length && numNonWhitespaceChars == 0; i++) {
          currentChar = input.charAt(i);
          if (whitespace.indexOf(currentChar) == -1) {
            // if we get one non-whitespace character, we're done
            numNonWhitespaceChars +=  1;
          }
        } // end for
      } else {
        return true;
      }
    } else {
        errMsg = 'input is not a primitive string, or String object';
        helpers.errHandler.call(isEmpty, errMsg);
        return;
    }
    return !Boolean(numNonWhitespaceChars);
  } // end isEmpty

  function contains(input, words) {
    /*
      Checks if the input text parameter contains one or more of the words
      within the words array.
      A word is defined as the following:
      having undefined, whitespace, or punctuation before and after it.
      The function should be case-insensitive.
    */
    var argsObj = {'input':input, 'words':words};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(contains, argsObj) ) {
      return false;
    }
    var whitespace = ' \n\t';
    var punctuation = '.,?!:;-_\"\'/\\(){}[]|%@#*~`$^+=<>';
    var wordBoundaryChars = whitespace + punctuation;
    var wordAt;
    var charToLeft;
    var charToRight;
    input = input.toLowerCase();

    for (var i=0; i<words.length; i++) {
      words[i] = words[i].toLowerCase();
      wordAt = input.indexOf(words[i]);
      if (wordAt != -1) {
        charToLeft = input.charAt(wordAt - 1);
        charToRight = input.charAt(wordAt + words[i].length);
        /* ?? not sure what to do about looking for undefined as a word
          boundary character */
        /* charToLeft/charToRight == "" takes care of word
          sitting at the beginning or end of input */
        if ( (wordBoundaryChars.indexOf(charToLeft) != -1 || charToLeft == "") 
          && (wordBoundaryChars.indexOf(charToRight) != -1 || charToRight == "") ) {
          // found a words[i] in input
          return true;
        }
      }
    } // end for
    // found no words[i] in input
    return false;
  } // end contains

  lacks : function lacks(input, words) {
    /*
      Checks if the input text parameter does not contain any of the words
      within the words array. Use the “word” definition used in the above
      .contains description. The function should be case-insensitive.
      A function like this could be used for checking blacklisted words.
    */
    var argsObj = {'input':input, 'words':words};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(contains, argsObj) ) {
      return false;
    }
    var whitespace = ' \n\t';
    var punctuation = '.,?!:;-_\"\'/\\(){}[]|%@#*~`$^+=<>';
    var wordBoundaryChars = whitespace + punctuation;
    var wordAt;
    var charToLeft;
    var charToRight;
    input = input.toLowerCase();

    for (var i=0; i<words.length; i++) {
      words[i] = words[i].toLowerCase();
      wordAt = input.indexOf(words[i]);
      if (wordAt != -1) {
        charToLeft = input.charAt(wordAt - 1);
        charToRight = input.charAt(wordAt + words[i].length);
        /* ?? not sure what to do about looking for undefined as a word
          boundary character */
        /* charToLeft/charToRight == "" takes care of word
          sitting at the beginning or end of input */
        if ( (wordBoundaryChars.indexOf(charToLeft) != -1 || charToLeft == "") 
          && (wordBoundaryChars.indexOf(charToRight) != -1 || charToRight == "") ) {
          // found a words[i] in input
          return false;
        }
      }
    } // end for
    // found no words[i] in input
    return true;
  } // end lacks

  function isComposedOf(input, strings) {
    /*
      Checks that the input text parameter contains only strings found within
      the strings array. Note that this function doesn’t use a strong word
      definition the way .contains and .lacks does. The function should be
      case-insensitive.
    */
    var argsObj = {'input':input, 'strings':strings};
    var whitespace = ' \n\t';
    var punctuation = '.,?!:;-_\"\'/\\(){}[]|%@#*~`$^+=<>';
    var allowableLeftoverChars = whitespace + punctuation;
    var currentStringAt;
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isComposedOf, argsObj) ) {
      return false;
    }
    input = input.toLowerCase();
    for (var i=0; i<strings.length; i++) {
      strings[i] = strings[i].toLowerCase();
      currentStringAt = input.indexOf(strings[i]);
      console.log(currentStringAt);
      while (currentStringAt != -1) {
        /* remove each occurrence of string[i] from input */
        input = input.slice(0, currentStringAt) + input.slice(currentStringAt + strings[i].length);
        // console.log(input);
        /* look for the index of another occurence of string[i] */
        currentStringAt = input.indexOf(strings[i]);
      }
    }
      console.log(input);
    /* if input is now zero length, then it was composed of only values in
      the strings array and nothing else */
    /* otherwise, we could be left with only whitespace and punctuation;
      and if not, then return false - i.e., we have something left that is
      not in strings, not whitespace, and not punctuation */
    return input.length == 0 ? true: isStringAllowable(input, allowableLeftoverChars).trueFalse;
  } // end isComposedOf

  /* LMD wanted this to be called .isLength */
  function isOfLengthNOrLess(input, n) {
    /*
      Checks if the input parameter’s character count is less than or equal
      to the n parameter.
    */
    var argsObj = {'input':input, 'n':n};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isOfLengthNOrLess, argsObj) ) {
      return false;
    }
    return input.length<=n;
  } // end isOfLengthNOrLess

  /* LMD wanted this to be called .isOfLength */
  function isOfLengthNOrMore(input, n) {
    /*
      Checks if the input parameter’s character count is greater than or equal
      to the n parameter.
    */
    var argsObj = {'input':input, 'n':n};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isOfLengthNOrMore, argsObj) ) {
      return false;
    }
    return input.length>=n;
  } // end isOfLengthNOrMore

  function countWords(input) {
    /*
      Counts the number of words in the input parameter. Refer to the
      definition of word used in the description of the .contains function.
    */
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(countWords, argsObj) ) {
      return false;
    }
    var whitespace = ' \n\t';
    var punctuation = '.,?!:;-_\"\'/\\(){}[]|%@#*~`$^+=<>';
    var nonwordChars = whitespace + punctuation;
    var currentChar;
    var currentWord = '';
    var words = [];
    for (var i=0; i<input.length; i++) {
      currentChar = input.charAt(i);
      if (nonwordChars.indexOf(currentChar) == -1 ) {
        /* found a someting other than a non-word character */
        currentWord += currentChar;
      } else if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = '';
      }
    }
    if (currentWord.length > 0) {
      words.push(currentWord);
    }
    return words.length;
  } // end countWords

  function lessWordsThan(input, n) {
    /*
      Checks if the input parameter has a word count less than or equal to
      the n parameter.
    */
    var argsObj = {'input':input, 'n':n};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(lessWordsThan, argsObj) ) {
      return false;
    }
    return (countWords(input) <= n);
  } // end lessWordsThan

  function moreWordsThan(input, n) {
    /*
      Checks if the input parameter has a word count greater than or equal to
      the n parameter.
    */
    var argsObj = {'input':input, 'n':n};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(moreWordsThan, argsObj) ) {
      return false;
    }
    return (countWords(input) >= n);
  } // end moreWordsThan

  function isBetween(input, floor, ceil) {
    /*
      Checks that the input parameter matches all of the following:
      - input is greater than or equal to the floor parameter;
      - input is less than or equal to the ceil parameter;
    */
    /* ?? numbers only, or text too */
    var argsObj = {'input':input, 'floor':floor, 'ceil':ceil};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isBetween, argsObj) ) {
      return false;
    }
    /* if we are considering numbers only */
    return (floor <= parseFloat(input) && parseFloat(input) <= ceil);
  } // end isBetween

  function isAlphaOnly(input) {
    /*
      Checks that the input parameter string is only composed of the
      following characters: a—z, A—Z. Unicode characters are
      intentionally disregarded.
    */
    var allowableChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isAlphaOnly, argsObj) ) {
      return false;
    }
    /* isStringAllowable returns {trueFalse: true/false, result: 'offendingChar message'} */
    return isStringAllowable(input, allowableChars);
  } // end isAlphaOnly

  function isAlphanumeric(input) {
    /*
      Checks that the input parameter string is only composed of the
      following characters: a—z, A—Z, or 0—9. Unicode characters are
      intentionally disregarded.
    */
    var allowableChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isAlphanumeric, argsObj) ) {
      return false;
    }
    /* isStringAllowable returns {trueFalse: true/false, result: 'offendingChar message'} */
    return isStringAllowable(input, allowableChars);
  } // end isAlphanumeric

  function isNumeric(input) {
    /*
      Checks that the input parameter string is only composed of the
      following characters: 0—9. Unicode characters are
      intentionally disregarded.
    */
    var allowableChars = '0123456789';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isNumeric, argsObj) ) {
      return false;
    }
    /* isStringAllowable returns {trueFalse: true/false, result: 'offendingChar message'} */
    return isStringAllowable(input, allowableChars);
  }

  function isCreditCard(input) {
    /*
      Checks if the input parameter is a credit card or bank card number.
      A credit card number will be defined as four sets of four alphanumeric
      characters separated by hyphens (-), or a single string of alphanumeric
      characters (without hyphens).
    */
    /* assuming we want upper-case alpha, plus numeric characters only */
    var allowableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var fourSets;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isCreditCard, argsObj) ) {
      return false;
    }
    if (input.indexOf('-') != -1) {
      /* have an input value with hyphens */
      fourSets = input.split('-');
      if (fourSets.length != 4) {
        return {trueFalse: false, result: 'Credit card must have 4 sets of 4 upper-case alphanumeric characters separated by hyphens.'};
      } else {
        for (var i=0; i<4; i++) {
          if (fourSets[i].length != 4) {
            return {trueFalse: false, result: 'Credit card must have 4 sets of 4 upper-case alphanumeric characters.'};
          }
        }
      }
      input = fourSets.join('');
    }
    /* at this point in the code, input should be a string with no hyphens */
    return input.length !=16 ? {trueFalse: false, result: 'Credit card number must have exactly 16 upper-case alphanumeric characters (excluding hyphens).'} : isStringAllowable(input, allowableChars);
  } // end isCreditCard

  function isHex(input) {
    /*
      Checks if the input string is a hexadecimal color, such as #3677bb.
      Hexadecimal colors are strings with a length of 7 (including the #),
      using the characters 0—9 and A—F.
      isHex should also work on shorthand hexadecimal colors, such as #333.
      The input must start with a # to be considered valid.
    */
    var allowableChars = 'abcdefABCDEF1234567890';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isHex, argsObj) ) {
      return false;
    }
    if (input.charAt(0) != '#') return false;
    /* remove '#' */
    input = input.slice(1);
    if (!isStringAllowable(input, allowableChars).trueFalse) return false;
    return (input.length == 3 || input.length == 6) ? true : false;
  } // end isHex

  function isRGB(input) {
    /*
      Checks if the input string is an RGB color, such as rgb(200, 26, 131).
      An RGB color consists of:
      - Three numbers between 0 and 255
      - A comma between each number
      - The three numbers should be contained within “rgb(” and “)“.
    */
    var rgbArr;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isRGB, argsObj) ) {
      return false;
    }
    if (!( input.slice(0,4) == 'rgb(' && input.charAt(input.length-1) == ')' ) ) return false;
    rgbArr = input.slice(4, input.length - 1).split(',');
    if (rgbArr.length != 3) return false;
    for (var i=0; i<3; i++) {
      if ( !(0 <= parseInt(rgbArr[i]) && parseInt(rgbArr[i]) <= 255) ) return false;
    }
    return true;
  } // end isRGB

  function isRGBA(input) {
    /*
      Checks if the input string is an RGBA color,
      such as rgba(200, 26, 131, 0.5).
      An RGBA color consists of:
      - Three numbers (red, green, blue) between 0 and 255, and an
        alpha-transparency value between 0 and 1.
      - A comma between each number
      - The four numbers should be contained within “rgba(” and “)“.
    */
    var rgbaArr;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isRGBA, argsObj) ) {
      return false;
    }
    if (!( input.slice(0,5) == 'rgba(' && input.charAt(input.length-1) == ')' ) ) return false;
    rgbaArr = input.slice(5, input.length - 1).split(',');
    if (rgbaArr.length != 4) return false;
    for (var i=0; i<3; i++) {
      if ( !(0 <= parseInt(rgbaArr[i]) && parseInt(rgbaArr[i]) <= 255) ) return false;
    }
    if ( !(0 <= parseFloat(rgbaArr[3]) && parseFloat(rgbaArr[3]) <= 1) ) return false;
    return true;
  } // end isRGBA

  function isHSL(input) {
    /*
      Checks if the input string is an HSL color, such as hsl(122, 10%, 30%).
      An HSL color consists of:

      - Three numbers:
        * the first value, Hue, is between 0 and 360
        * the second and third values, Saturation and Lightness, are between 0% and 100%
      - A comma between each value
      - The three values should be contained within “hsl(” and “)“.
    */
    var hslArr;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isHSL, argsObj) ) {
      return false;
    }
    if (!( input.slice(0,4) == 'hsl(' && input.charAt(input.length-1) == ')' ) ) return false;
    hslArr = input.slice(4, input.length - 1).split(',');
    if (hslArr.length != 3) return false;
    if ( !(0 <= parseInt(hslArr[0]) && parseInt(hslArr[0]) <= 360) ) return false;
    for (var i=1; i<3; i++) {
      /* must have '%' in these 2 values */
      if (hslArr[i].indexOf('%') == -1) return false;
      /* NOTE: this test lets '.0.7' through;
        parseFloat('.0.7') evaluates to 0 */
        /* use just the portion before '%' to evaluate numerically */
        hslArr[i] = hslArr[i].slice(0, hslArr[i].indexOf('%')).trim();
      if ( !(0 <= parseInt(hslArr[i]) && parseInt(hslArr[i]) <= 100) ) return false;
    }
    return true;
  } // end isHSL

  function isHSLA(input) {
    /*
      Checks if the input string is an HSL color, such as hsl(122, 10%, 30%).
      An HSL color consists of:

      - Three numbers:
        * the first value, Hue, is between 0 and 360
        * the second and third values, Saturation and Lightness, are between 0% and 100%
      - A comma between each value
      - The three values should be contained within “hsl(” and “)“.
    */
    var hslaArr;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isHSLA, argsObj) ) {
      return false;
    }
    if (!( input.slice(0,5) == 'hsla(' && input.charAt(input.length-1) == ')' ) ) return false;
    hslaArr = input.slice(5, input.length - 1).split(',');
    if (hslaArr.length != 4) return false;
    if ( !(0 <= parseInt(hslaArr[0]) && parseInt(hslaArr[0]) <= 360) ) return false;
    for (var i=1; i<3; i++) {
      /* must have '%' in these 2 values */
      if (hslaArr[i].indexOf('%') == -1) return false;
      /* NOTE: this test lets '.0.7' through;
        parseFloat('.0.7') evaluates to 0 */
        /* use just the portion before '%' to evaluate numerically */
        hslaArr[i] = hslaArr[i].slice(0, hslaArr[i].indexOf('%')).trim();
      if ( !(0 <= parseInt(hslaArr[i]) && parseInt(hslaArr[i]) <= 100) ) return false;
    }
    if ( !(0 <= parseFloat(hslaArr[3]) && parseFloat(hslaArr[3]) <= 1) ) return false;
    return true;
  } // end isHSLA

  function isColor(input) {
    /*
      Checks if the input parameter is a hex, RGB, RGBA, or HSL color type.
    */
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isColor, argsObj) ) {
      return false;
    }
    return (isHex(input) || isRGB(input)
            || isHSL(input) || isRGBA(input)
            || isHSLA(input));
  } // end isColor

  function isTrimmed(input) {
    /*
      Checks if the input parameter has leading or trailing whitespaces or
      too many spaces between words.
      Leading refers to before while trailing refers to after.
      This function will help validate cases where extra spaces were added
      accidentally by the user.
    */
    var spaceAt;
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(isTrimmed, argsObj) ) {
      return false;
    }
    if (input.trim().length < input.length) return false;
    /* we know there are no leading or trailing spaces here */
    for (var i=1; i<input.length; i++) {
      if (input.charAt(i) == ' ') {
        /* check for adjacent spaces */
        if (i-spaceAt == 1) return false;
        spaceAt = i;
      }
    }
    return true;
  } // end isTrimmed

  function hasNoWhitespace(input) {
    /* checks to see if input has no whitespace */
    var whitespace = ' \t\n';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(hasNoWhitespace, argsObj) ) {
      return false;
    }
    for (var i=0; i<input.length; i++) {
      if (whitespace.indexOf(input.charAt(i)) != -1) return false;
    }
    return true;
  } // end hasNoWhitespace

  function hasWhitespace(input) {
    /* checks to see if input has no whitespace */
    var whitespace = ' \t\n';
    var argsObj = {'input':input};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(hasNoWhitespace, argsObj) ) {
      return false;
    }
    for (var i=0; i<input.length; i++) {
      if (whitespace.indexOf(input.charAt(i)) != -1) return true;
    }
    return false;
  } // end hasWhitespace

  function isLeapYear(year) {
    /* accepts a 4-digit string representing a year, and checks to
        see if is a leap year */
    return ((year%4 !== 0) || (year%100 === 0 && year%400 !== 0)) ? false: true;
  } // end isLeapYear

  return {
              assertThat: assertThat,
              whatTypeIs: whatTypeIs,
                  typeOf: typeOf,
       isStringAllowable: isStringAllowable,
    containsAnInstanceIn: containsAnInstanceIn,
        hasRequiredChars: hasRequiredChars,
          isEmailAddress: isEmailAddress,
           isPhoneNumber: isPhoneNumber,
       //  isPhoneNumberObj: isPhoneNumberObj,
       //  isPhoneNumberArr: isPhoneNumberArr,
       // isPhoneNumberArr2: isPhoneNumberArr2,
          withoutSymbols: withoutSymbols,
       withoutWhitespace: withoutWhitespace,
                  isDate: isDate,
              isHhMmAmPm: isHhMmAmPm,
         isValidMmDdYyyy: isValidMmDdYyyy,
  isValidMmDdYyyyBetween: isValidMmDdYyyyBetween,
       isValidDateObject: isValidDateObject,
       createDateObjsObj: createDateObjsObj,
            isBeforeDate: isBeforeDate,
             isAfterDate: isAfterDate,
           isBeforeToday: isBeforeToday,
            isAfterToday: isAfterToday,
                 isEmpty: isEmpty,
                contains: contains,
                   lacks: lacks,
            isComposedOf: isComposedOf,
       isOfLengthNOrLess: isOfLengthNOrLess,
       isOfLengthNOrMore: isOfLengthNOrMore,
              countWords: countWords,
           lessWordsThan: lessWordsThan,
           moreWordsThan: moreWordsThan,
               isBetween: isBetween,
             isAlphaOnly: isAlphaOnly,
          isAlphanumeric: isAlphanumeric,
               isNumeric: isNumeric,
            isCreditCard: isCreditCard,
                   isHex: isHex,
                   isRGB: isRGB,
                  isRGBA: isRGBA,
                   isHSL: isHSL,
                  isHSLA: isHSLA,
                 isColor: isColor,
               isTrimmed: isTrimmed,
         hasNoWhitespace: hasNoWhitespace,
           hasWhitespace: hasWhitespace,
              isLeapYear: isLeapYear
  }; // end return

/* to test in global environment, comment out line below,
    and uncomment the one at the bottom;
    also, see commenting/uncommenting lines at top of file;
*/

})(app.helpers);

// })(helpers);