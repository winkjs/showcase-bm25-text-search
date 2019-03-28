var bm25 = require( 'wink-bm25-text-search' );
var nlp = require( 'wink-nlp-utils' );
var docs = require( 'wink-bm25-text-search/sample-data/data-for-wink-bm25.json' );

var engine = bm25();
engine.defineConfig( { fldWeights: { title: 4, body: 1, tags: 2 } } );
engine.definePrepTasks( [
  nlp.string.lowerCase,
  nlp.string.removeExtraSpaces,
  nlp.string.tokenize0,
  nlp.tokens.propagateNegations,
  nlp.tokens.removeWords,
  nlp.tokens.stem
], 'body' );
engine.definePrepTasks( [
  nlp.string.lowerCase,
  nlp.string.removeExtraSpaces,
  nlp.string.tokenize0,
  nlp.tokens.propagateNegations,
  nlp.tokens.stem
] );

docs.forEach( function ( doc, i ) {
  engine.addDoc( doc, i );
} );
engine.consolidate();

window.addEventListener('DOMContentLoaded', function () {
  hide('title');
  hide('body');
  hide('noresults');
  text('other', '')
  document.getElementById('search').addEventListener('keyup', function (el) {
    if (el.target.value === '') {
      hide('title');
      hide('body');
      hide('noresults');
      text('other', '')
      show('help');
      return false;
    } else {
      hide('help');
    }

    var results = engine.search(el.target.value);
    if ( results.length < 1 ) {
      hide('title');
      hide('body');
      text('other', '')
      show('noresults');
    } else {
      hide('noresults');
      var result = docs[results[0][0]];
      show('title');
      show('body');
      text('title', result.title);
      text('body', result.body);
      text('other', '')
      if ( results.length > 1 ) {
        for (var i = 1; i < results.length; i++) {
          var result = docs[results[i][0]];
          document.getElementById('other').innerHTML += "<h3>" + result.title + "</h3>";
          document.getElementById('other').innerHTML += "<small>" + result.body + "</small>";
        }
      }
    }
  })

  function hide(id) {
    document.getElementById(id).setAttribute('class', 'hidden');
    document.getElementById(id).style.display = 'none';
  }
  function show(id) {
    document.getElementById(id).style.display = 'block';
    window.setTimeout( function () {
      document.getElementById(id).setAttribute('class', 'shown')
    },0)
  }
  function text(id,text) {
    document.getElementById(id).innerText = text;
  }
});
