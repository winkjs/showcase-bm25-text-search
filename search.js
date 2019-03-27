// Load wink-bm25-text-search
var bm25 = require( 'wink-bm25-text-search' );
// Create search engine's instance
var engine = bm25();
// Load NLP utilities
var nlp = require( 'wink-nlp-utils' );
// Load sample data (load any other JSON data instead of sample)
var docs = require( 'wink-bm25-text-search/sample-data/data-for-wink-bm25.json' );

// Step I: Define config
// Only field weights are required in this example.
engine.defineConfig( { fldWeights: { title: 4, body: 1, tags: 2 } } );

// Step II: Define PrepTasks
// Set up preparatory tasks for 'body' field
engine.definePrepTasks( [
  nlp.string.lowerCase,
  nlp.string.removeExtraSpaces,
  nlp.string.tokenize0,
  nlp.tokens.propagateNegations,
  nlp.tokens.removeWords,
  nlp.tokens.stem
], 'body' );
// Set up 'default' preparatory tasks i.e. for everything else
engine.definePrepTasks( [
  nlp.string.lowerCase,
  nlp.string.removeExtraSpaces,
  nlp.string.tokenize0,
  nlp.tokens.propagateNegations,
  nlp.tokens.stem
] );

// Step III: Add Docs
// Add documents now...
docs.forEach( function ( doc, i ) {
  // Note, 'i' becomes the unique id for 'doc'
  engine.addDoc( doc, i );
} );

// Step IV: Consolidate
// Consolidate before searching
engine.consolidate();

// All set, start searching!
var results = engine.search( 'who is married to barack' );
// results is an array of [ doc-id, score ], sorted by score
// results[ 0 ][ 0 ] i.e. the top result is:
console.log( docs[ results[ 0 ][ 0 ] ] );
// -> Michelle LaVaughn Robinson Obama (born January 17, 1964) is...

window.addEventListener('DOMContentLoaded', function () {
  hide('title');
  hide('body');
  hide('noresults');
  document.getElementById('search').addEventListener('keyup', function (el) {
    if (el.target.value === '') {
      hide('title');
      hide('body');
      hide('noresults');
      show('help');
      return false;
    } else {
      hide('help');
    }

    var results = engine.search(el.target.value);
    if ( results.length < 1 ) {
      hide('title');
      hide('body');
      show('noresults');
    } else {
      hide('noresults');
      var result = docs[results[0][0]];
      show('title');
      show('body');
      text('title', result.title);
      text('body', result.body);
    }
  })

  function hide(id) {
    document.getElementById(id).style.display = 'none';
  }
  function show(id) {
    document.getElementById(id).style.display = 'block';
  }
  function text(id,text) {
    document.getElementById(id).innerText = text;
  }
});
