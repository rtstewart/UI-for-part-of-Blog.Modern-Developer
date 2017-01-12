/* for testing in global environment, uncomment below,
    and comment out "app.helpers = (function() {" line;
*/

// var helpers = (function() {

app.helpers = (function() {

  function errHandler(errMsg) {
      // http://www.w3schools.com/js/js_errors.asp
      // use: errHandler.call(callingFunctionAsThis, errMsg);
      try {
        /* already determined prior to getting here that we wish to throw an error */
        throw errMsg;
      }
      catch(err) {
        // http://stackoverflow.com/questions/22155879/how-do-i-create-formatted-javascript-console-log-messages
        // console output will be in red text with very light red background
        /* the use of this below is intended to have the calling function
            passed as the this value;
            for example, this would be a typcial call format:
            errHandler.call(callingFunctionIdentifier, errMsg);
        */
        // console.log('%cNOTE the following error from function: ' + this.name + '\n' + err, 'color: red; background: #fff0f0;');

        /* can use standard "warn" */
        // console.warn('NOTE the following error from function: ' + this.name + '\n' + err);

        /* can use standard "error" */
        console.error('NOTE the following error from function: ' + this.name + '\n' + err);

        //alert('NOTE the following error from function: ' + this.name + '\n' + err);
      }
  } // end errHandler

  function areParametersDefined(paramsObj) {
    // pass calling function as this with areParametersDefined.call(thisFn, paramsObj)
    var errMsg;
    for (var key in paramsObj) {
      // if (paramsObj[key] === undefined || paramsObj[key] === '')
      if (paramsObj[key] === undefined) {
        if (errMsg) {
          errMsg += ', ' + key;
        } else {
            errMsg = 'Missing parameter(s): ' + key;
        }
      }
    }
    if (errMsg) {
      errHandler.call(this, errMsg);
      return false;
    } else {
      return true;
    }
  } // end areParametersDefined

  /* return only what you want to expose */
  return {
    errHandler : errHandler,
    areParametersDefined : areParametersDefined
  };

})(); // end app.helpers = (function() {