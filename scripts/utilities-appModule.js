// https://developer.mozilla.org/en-US/docs/Web/API/Console

  /* NOTE: this utilities "library" makes use of methods/function in
      validator.js, such as areParametersDefined, and so validator.js
      should be available in the same scope */

/* for testing in global environment, uncomment below,
    and comment out "app.utilities = (function(helpers) {" line;
    also, see commenting/uncommenting lines at bottom of file;
*/

// var utilities = (function(helpers, validator) {

app.utilities = (function(helpers, validator) {

  function swapClass(elem, classToRemove, classToAdd) {
    /*
    * Swaps an existing node's class with another
    * @param  {Node} elem   [Node to be modified]
    * @param  {String} classToRemove [Class to be removed]
    * @param  {String} classToAdd    [Class to be added]
    */
    elem.classList.remove(classToRemove);
    elem.classList.add(classToAdd);
  } // end swapClass

  function forEachNthOfAllKeys(list, n, callback) {
    /* this is an expansion of function by/forEachNth to include added
        enumerable keys in an array list */
    /*
      This function will iterate and call the callback parameter for each
      element or property of a list at the interval specified by the n parameter.
      It should not call callback on values greater than the list’s number
      of elements.
    */
    /* tested with:
        callback: function logKeys(val, key, list) {console.log(val, key, list);}
        list: var myArr = [3, 5, 1, 8, 9, 8, 1, 2, 3, 4, 5, 6, 7, 8]
        list: var myObj = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
        'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'eleven':11, 'twelve':12};
        values of n from 1 to greater than list's number of keys
    */
    // var frown = '\u2639';
    var argsObj = {'list':list, 'n':n, 'callback':callback};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(forEachNthOfAllKeys, argsObj) ) {
      return false;
    }
    if (n<1) {
      console.log('%cERROR: The value of n must be 1 or greater', 'color: red; background-color: #fff0f0');
      return;
    }
    /* test to make sure we have either an array, or an Object object */
    if (Array.isArray(list) || Object.prototype.toString.call(list) === '[object Object]') {
      /* next statement creates keys - an array of keys in the list */
      /* in the case of an array list, the keys array will be an array of
        digits from 0 to (list.length -1) (actually they will be string
        representations of those digits), AND/BUT if additional enumerable keys
        have been added to the array, they will also be iterated over which we
        may or may not want; if we want to, then this function will do the job */
      /* in the case of an Object list, the keys array will be an array of
        whatever identifier string each key may be for all enumerable keys and
        the array order will be the same as would have been achieved by
        for ... in iteration */
      var keys = Object.keys(list);
      /* whether and array or an Object object, we can iterate over its
        keys this way */
      for (var i = n-1; i<keys.length; i+=n) {
        callback(list[keys[i]], keys[i], list);
      }
    } else {
      console.log('%cERROR: list is neither an array - ( [...] ), nor an Object - ( {...} )', 'color: red; background-color: #fff0f0');
    }
  } // end function forEachNthOfAllKeys

  function forEachNth(list, n, callback) {
    // LMD wanted this named 'by'
    // more appropriately, I called it forEachNth
    /*
      This function will iterate and call the callback parameter for each
      element or property of a list at the interval specified by the n parameter.
      It should not call callback on values greater than the list’s number
      of elements.
    */
    /* tested with:
        callback: function logKeys(val, key, list) {console.log(val, key, list);}
        list: var myArr = [3, 5, 1, 8, 9, 8, 1, 2, 3, 4, 5, 6, 7, 8]
        list: var myObj = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
        'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'eleven':11, 'twelve':12};
        values of n from 1 to greater than list's number of keys
    */
    // var frown = '\u2639';
    var argsObj = {'list':list, 'n':n, 'callback':callback};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(forEachNth, argsObj) ) {
      return false;
    }
    var i;
    if (n<1) {
      console.log('%cERROR: The value of n must be 1 or greater', 'color: red; background-color: #fff0f0');
      return;
    }
    /* test to make sure we have either an array list,
      or an object Object list */
    if (Array.isArray(list)) {
      for (i=n-1; i<list.length; i+=n) {
        /* emulating forEach behavior, we want to have the callback be a
          function of (element-value/property-value, element-index/property,
          array/object) */
        callback(list[i], i, list);
      }
    } else if (Object.prototype.toString.call(list) === '[object Object]') {
      /* next statement creates keys - an array of keys in the list */
      /* in the case of an Object list, the keys array will be an array of
        whatever identifier string each key may be for all enumerable keys and
        the array order will be the same as would have been achieved by
        for ... in iteration */
      /*
        I chose to iterate through the object this way since it provides a
        convenient way to apply the callback for each nth key.
      */
      var keys = Object.keys(list);
      for (i=n-1; i<keys.length; i+=n) {
        callback(list[keys[i]], keys[i], list);
      }
    } else {
      console.log('%cERROR: list is neither an array - ( [...] ), nor an Object - ( {...} )', 'color: red; background-color: #fff0f0');
    }
  } // end function forEachNth

  function keys(object) {
    /*
      This function will create an array of all the keys of an object.
    */
    /* tested with:
        var myObj = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
        'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'eleven':11, 'twelve':12};
    */
    var argsObj = {'object':object};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(keys, argsObj) ) {
      return false;
    }
    if (Object.prototype.toString.call(object) === '[object Object]') {
      var keysArr = Object.keys(object);
      console.log(keysArr);
      return keysArr;
    } else {
      console.log('%cERROR: object argument supplied is not an Object - ( {...} )', 'color: red; background-color: #fff0f0');
    }
  } // end function keys

  function values(object) {
    /*
      This function will create an array of all the values of an object.
    */
    /* tested with:
        var myObj = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
        'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'eleven':11, 'twelve':12};
    */
    var argsObj = {'object':object};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(values, argsObj) ) {
      return false;
    }
    if (Object.prototype.toString.call(object) === '[object Object]') {
      var valuesArr = [];
      for (var key in object) {
        valuesArr.push(object[key]);
      }
      console.log(valuesArr);
      return valuesArr;
    } else {
      console.log('%cERROR: object argument supplied is not an Object - ( {...} )', 'color: red; background-color: #fff0f0');
    }
  } // end function values

  function pairs(object) {
    /*
      This function will create an array of all the keys and values of an
      object in the order of [key, value, key, value] for as many key/value
      pairs as exist in the object.
    */
    /* tested with:
        var myObj = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
        'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'eleven':11, 'twelve':12};
    */
    var argsObj = {'object':object};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(pairs, argsObj) ) {
      return false;
    }
    if (Object.prototype.toString.call(object) === '[object Object]') {
      var pairsArr = [];
      for (var key in object) {
        pairsArr.push(key, object[key]);
      }
      console.log(pairsArr);
      return pairsArr;
    } else {
      console.log('%cERROR: object argument supplied is not an Object - ( {...} )', 'color: red; background-color: #fff0f0');
    }
  } // end function pairs

  function shuffle(array) {
    var shuffled = [];
    var arrCopy = array.slice(0);
    var randomIndex;
    var argsObj = {'array':array};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(shuffle, argsObj) ) {
      return false;
    }
    for (var i=0; i<array.length; i++) {
      /* Math.random generates a number between 0 (inclusive) and 1 (exclusive) */
      /* when arrCopy gets to length 1, this will still push the last/only
          element into shuffled; so even though the randomIndex bit is
          unnecessary at that point, we'll let it happen in lieu of separate
          code to address this one instance */
      /* generate a random number between 0 (inclusive)
        and arrCopy.length-1 (inclusive) */
      /* arrCopy.length will be 1 less with each pass through this loop */
      randomIndex = Math.floor(Math.random()*arrCopy.length);
      /* arrCopy.splice(x, y) will remove y array elements from arrCopy
        at index x and return an array containing the elements removed;
        Since we are removing one element, we'll need to specify index 0
        to extract the element value from the returned one-element array. */
      shuffled.push(arrCopy.splice(randomIndex, 1)[0]);
    }
    return shuffled;
  } // end shuffle

  function pluralize(n, word, pluralWord) {
    /*
      This function will return the plural of a word depending on the value of
      the n parameter. If n is 1, return the non-plural word (parameter word);
      otherwise, add an “s” to the word parameter. If the pluralWord parameter is
      provided, instead of adding an “s,” return the pluralWord.
    */
    /* must have at least n, and word parameters */
    var argsObj = {'n':n, 'word':word};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(pluralize, argsObj) ) {
      return false;
    }
    if (arguments.length == 3) {
      return pluralWord;
    } else {
      /* if we got this far, we know that there are at least the first two
          input parameters */
      if (n == 1) {
        return word;
      } else {
        return word + 's';
      }
    }
  } // end pluralize

  function toDash(str) {
    /*
      This function converts a camelCase string to a dashed string.
      Camel case presents words with no spaces separating them and with each
      word’s first letter capitalized except the first word, which is lower
      case.
      Examples: hotDog, spaceStationComplex, myFirstFunction.

      Dashed strings are entirely lowercase, and words are separated by hyphens (-).
      Examples: hot-dog, space-station-complex, my-first-function.
    */
    var errMsg;
    var currentWord = '';
    var strDashed = ''; // the resulting dashed string
    var argsObj = {'str':str};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(toDash, argsObj) ) {
      return false;
    }
    /* check that str has no whitespace */
    if (!validator.hasNoWhitespace(str)) {
      errMsg = 'str parameter cannot have whitespace';
      helpers.errHandler.call(utilities.toDash, errMsg);
      return;
    }
    /* below test will allow underscores */
    if (validator.isAlpha(str.charAt(0)) && str.charAt(0).toUpperCase() == str.charAt(0)) {
      errMsg = 'first character of str cannot be an uppercase letter';
      helpers.errHandler.call(utilities.toDash, errMsg);
      return;
    }
    for (var i=0; i<str.length; i++) {
      if (validator.isAlpha(str.charAt(i)) && str.charAt(i).toUpperCase() == str.charAt(i)) {
        strDashed += currentWord + '-';
        currentWord = str.charAt(i).toLowerCase();
      } else {
        /* continue to build current word with current character */
        currentWord += str.charAt(i);
      }
    }
    /* append final currentWord - which could be the only currentWord ever built */
    strDashed += currentWord;
    return strDashed;
  } // end toDash

  function toCamel(str) {
    var errMsg;
    var subStrings;
    var strCamel = ''; // the resulting dashed string
    var argsObj = {'str':str};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(toCamel, argsObj) ) {
      return false;
    }
    /* check that str has no whitespace */
    if (!validator.hasNoWhitespace(str)) {
      errMsg = 'str parameter cannot have whitespace';
      helpers.errHandler.call(toCamel, errMsg);
      return;
    }
    /* split str into "words" which are separated by '-' */
    var subStrings = str.split('-');
    /* the first word will always be all lowercased */
    strCamel += subStrings[0].toLowerCase();
    /* now, get each successive word, if any, and:
        - uppercase its first character;
        - append it to strCamel;
        */
    for (var i=1; i<subStrings.length; i++) {
      if (!validator.isAlpha(subStrings[i].charAt(0))) {
        errMsg = 'first character of the hyphen-separated parts of str, other than the first, must be an alphabetic character';
        helpers.errHandler.call(toCamel, errMsg);
        return;
      } else {
        strCamel += subStrings[i].replace(subStrings[i].charAt(0), subStrings[i].charAt(0).toUpperCase());
      }
    } // end for
    return strCamel;
  } // end toCamel

  function has(obj, search) {
    /*
      This function searches all values of the parameter obj and returns “true”
      if any are equal to the search parameter. Otherwise it will return “false.”
    */
    var argsObj = {'obj':obj, 'search':search};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(has, argsObj) ) {
      return false;
    }
    /* loop through each key in obj to see if its value is equal to search */
    for (var key in obj) {
      if (obj[key] == search) return true;
    }
    /* if here, no key's value was equal to search */
    return false;
  } // end has

  function pick(obj, keys) {
    /*
      This function returns a new object by picking all key/value pairs from
      the parameter obj. The keys that are picked will be determined by the
      array parameter keys.
    */
    var picked = {};
    var argsObj = {'obj':obj, 'keys':keys};
    // check that parameters are supplied
    if(!helpers.areParametersDefined.call(pick, argsObj) ) {
      return false;
    }
    /* ?? would like an opinion on using my own typeOf method or other below */
    // if (validator.typeOf(obj) != 'object') {
    if (Object.prototype.toString.call(obj) != '[object Object]') {
      errMsg = 'parameter obj must be an Object';
      helpers.errHandler.call(pick, errMsg);
      return;
    }
    // if (validator.typeOf(keys) != 'array') {
    if (!Array.isArray(keys)) {
      errMsg = 'parameter keys must be an array';
      helpers.errHandler.call(pick, errMsg);
      return;
    }
    for (var i=0; i<keys.length; i++) {
      if (keys[i] in obj) {
        picked[keys[i]] = obj[keys[i]];
      }
    }
    return picked;
  } // end pick

  function lettersOnly(input) {
    /* Returns the input parameter text with all symbols removed. Symbols refer
      to any non-alphanumeric character. A character is considered alphanumeric
      if it matches one of the following: a—z, A—Z, or 0—9. Ignore whitespace. */
    if(!helpers.areParametersDefined.call(lettersOnly, {'input':input}) ) {
      return false;
    }
    var allowableString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lettersOnlyStr = '';
    var currentInputChar;
    for (var i=0; i<input.length; i++) {
      currentInputChar = input.charAt(i);
      if (allowableString.indexOf(currentInputChar) !== -1) {
        lettersOnlyStr += currentInputChar;
      }
    }
    return lettersOnlyStr;
  } // end lettersOnly

  function digitsOnly(input) {
    /* Returns the input parameter text with all symbols removed. Symbols refer
      to any non-alphanumeric character. A character is considered alphanumeric
      if it matches one of the following: a—z, A—Z, or 0—9. Ignore whitespace. */
    if(!helpers.areParametersDefined.call(digitsOnly, {'input':input}) ) {
      return false;
    }
    var allowableString = '1234567890';
    var digitsOnlyStr = '';
    var currentInputChar;
    for (var i=0; i<input.length; i++) {
      currentInputChar = input.charAt(i);
      if (allowableString.indexOf(currentInputChar) !== -1) {
        digitsOnlyStr += currentInputChar;
      }
    }
    return digitsOnlyStr;
  } // end digitsOnly

  /* return what is to be exposed */
  return {
              swapClass: swapClass,
    forEachNthOfAllKeys: forEachNthOfAllKeys,
             forEachNth: forEachNth,
                   keys: keys,
                 values: values,
                  pairs: pairs,
                shuffle: shuffle,
              pluralize: pluralize,
                 toDash: toDash,
                toCamel: toCamel,
                    has: has,
                   pick: pick,
            lettersOnly: lettersOnly,
             digitsOnly: digitsOnly
  };

/* to test in global environment, comment out line below,
    and uncomment the one at the bottom;
    also, see commenting/uncommenting lines at top of file;
*/

})(app.helpers, app.validator);

// })(helpers, validator);