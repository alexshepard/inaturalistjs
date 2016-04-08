"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Observation = require( "../models/observation" );

var observations = class observations {
  static create( params, options ) {
    return iNaturalistAPI.post( "observations", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "observations/:id", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "observations/:id", params, options );
  }

  static fave( params, options ) {
    return iNaturalistAPI.post( "votes/vote/observation/:id", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static unfave( params, options ) {
    return iNaturalistAPI.delete( "votes/unvote/observation/:id", params, options );
  }

  static review( params, options ) {
    var p = Object.assign( { }, params );
    p.reviewed = "true";
    return iNaturalistAPI.post( "observations/:id/review", p, options );
  }

  static unreview( params, options ) {
    var p = Object.assign( { }, params );
    return iNaturalistAPI.delete( "observations/:id/review", p, options );
  }

  static setQualityMetric( params, options ) {
    return iNaturalistAPI.post( "observations/:id/quality/:metric", params, options );
  }

  static deleteQualityMetric( params, options ) {
    return iNaturalistAPI.delete( "observations/:id/quality/:metric", params, options );
  }

  static fetch( ids ) {
    return iNaturalistAPI.fetch( "observations", ids ).
      then( Observation.typifyResultsResponse );
  }

  static search( params ) {
    return iNaturalistAPI.get( "observations", params ).
      then( Observation.typifyResultsResponse );
  }
};

module.exports = observations;
