"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    User = require( "../models/user" );

var users = class users {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "users", ids ).
      then( User.typifyResultsResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "users/:id", params, options ).
      then( User.typifyInstanceResponse );
  }
};

module.exports = users;
