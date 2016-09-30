var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    taxa = require( "../../lib/endpoints/taxa" ),
    testHelper = require( "../../lib/test_helper" );

describe( "Taxa", function( ) {

  describe( "fetch", function( ) {
    it( "fetches taxa by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.mockResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/taxa/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Taxon" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
    it( "defaultPhoto is a Photo", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].defaultPhoto.constructor.name ).to.eq( "Photo" );
        done( );
      } );
    } );
    it( "taxonPhotos have a Taxon and a Photo", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].taxonPhotos[0].taxon.constructor.name ).to.eq( "Taxon" );
        expect( r.results[0].taxonPhotos[0].photo.constructor.name ).to.eq( "Photo" );
        expect( r.results[0].taxonPhotos[0].photo.photoUrl( "large" ) ).to.match( /219b9ab6c5_b/ );
        done( );
      } );
    } );
  });

  describe( "autocomplete", function( ) {
    it( "fetches observations by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/autocomplete?q=Animals" ).
        reply( 200, testHelper.mockResponse );
      taxa.autocomplete({ q: "Animals" }).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/taxa/autocomplete?q=Animals" );
        done( );
      });
    });
  });

});
