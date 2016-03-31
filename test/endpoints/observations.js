var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    observations = require( "../../lib/endpoints/observations" ),
    testHelper = require( "../../lib/test_helper" );

describe( "Observation", function( ) {

  describe( "create", function( ) {
    it( "posts to /observations", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/observations", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      observations.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /observations/:id", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/observations/1", { id: 1, body: "testbody" }).
        reply( 200, { id: 1 } );
      observations.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /observations/:id", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/observations/1", { id: 1 }).
        reply( 200, { id: 1 } );
      observations.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "fave", function( ) {
    it( "posts to /votes/vote/observation/:id", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/votes/vote/observation/1", { id: 1 }).
        reply( 200, { id: 1 } );
      observations.fave({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "unfave", function( ) {
    it( "deletes to /votes/unvote/observation/:id", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/votes/unvote/observation/1", { id: 1 }).
        reply( 200, { id: 1 } );
      observations.unfave({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "review", function( ) {
    it( "posts to /observations/:id/review", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/observations/1/review", { id: 1, reviewed: "true" }).
        reply( 200, { id: 1 } );
      observations.review({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "unreview", function( ) {
    it( "posts to /observations/:id/review", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/observations/1/review", { id: 1, reviewed: "false" }).
        reply( 200, { id: 1 } );
      observations.unreview({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "fetch", function( ) {
    it( "fetches observations by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/observations/1" ).
        reply( 200, testHelper.mockResponse );
      observations.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/observations/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Observation" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });

    it( "fetches observations by mulitple IDs", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/observations/1,2" ).
        reply( 200, testHelper.mockResponse );
      observations.fetch([ 1, 2]).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/observations/1,2" );
        expect( r.total_results ).to.eq( 1 );
        done( );
      });
    });

    it( "throws errors", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/observations/404" ).
        reply( 404, { error: "not found" });
      observations.fetch( 404 ).catch( function( e ) {
        expect( e.response.status ).to.eq( 404 );
        expect( e.response.statusText ).to.eq( "Not Found" );
        done( );
      });
    });
  });

  describe( "search", function( ) {
    it( "fetches observations by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/observations" ).
        reply( 200, testHelper.mockResponse );
      observations.search( ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/observations" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Observation" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });

    it( "fetches observations by mulitple IDs", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/observations?taxon_id=1" ).
        reply( 200, testHelper.mockResponse );
      observations.search({ taxon_id: 1 }).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/observations?taxon_id=1" );
        expect( r.total_results ).to.eq( 1 );
        done( );
      });
    });
  });
});
