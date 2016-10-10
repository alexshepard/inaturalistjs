"use strict";
var Model = require( "./model" ),
    Photo = require( "./photo" ),
    ConservationStatus = require( "./conservation_status" );

var Taxon = class Taxon extends Model {

  constructor( attrs ) {
    super( attrs );
    if ( this.default_photo && this.default_photo !== undefined) {
      this.defaultPhoto = new Photo( this.default_photo );
    }
    if ( this.taxon_photos && this.taxon_photos !== undefined) {
      this.taxonPhotos = this.taxon_photos.map( tp => ( {
        taxon: new Taxon( tp.taxon ),
        photo: new Photo( tp.photo )
      } ) );
    }
    if ( this.conservation_statuses && this.conservation_statuses !== undefined ) {
      this.conservationStatuses = this.conservation_statuses.map( cs => new ConservationStatus( cs ) );
    }
  }

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, Taxon );
  }

  iconicTaxonName( ) {
    if ( this.iconic_taxon_name && this.iconic_taxon_name.length > 0 ) {
      return this.iconic_taxon_name;
    }
    return "Unknown";
  }

  photoTag( ) {
    if( this.default_photo ) {
      return "<img src='"+ this.default_photo.square_url +"'/>";
    }
    return "<i class='icon icon-iconic-" + this.iconicTaxonName( ).toLowerCase( ) + "'/>";
  }

};

module.exports = Taxon;
