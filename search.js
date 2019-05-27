var bm25 = require( 'wink-bm25-text-search' );
var nlp = require( 'wink-nlp-utils' );
var docs = require( 'wink-bm25-text-search/sample-data/demo-data-for-wink-bm25.json' );
var getSpottedTerms = require('wink-bm25-text-search/runkit/get-spotted-terms.js');


var engine = bm25();
var pipe = [
  nlp.string.lowerCase,
  nlp.string.tokenize0,
  nlp.tokens.removeWords,
  nlp.tokens.stem,
  nlp.tokens.propagateNegations
];
engine.defineConfig( { fldWeights: { title: 1, body: 2 } } );
engine.definePrepTasks( pipe );
docs.forEach( function ( doc, i ) {
  engine.addDoc( doc, i );
} );
engine.consolidate();

window.addEventListener('DOMContentLoaded', function () {
  showData();

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
      var spotted = getSpottedTerms(results,el.target.value,docs, ['title','body'],pipe,3);
      hide('noresults');
      var result = docs[results[0][0]];
      show('title');
      show('body');
      text('title', result.title);
      html('body', highlightTerms(result.body,spotted));
      text('other', '')
      if ( results.length > 1 ) {
        for (var i = 1; i < results.length; i++) {
          var result = docs[results[i][0]];
          document.getElementById('other').innerHTML += "<h3>" + result.title + "</h3>";
          document.getElementById('other').innerHTML += "<small>" + highlightTerms(result.body,spotted) + "</small>";
        }
      }
    }
  })

  function highlightTerms(body, spotted) {
    spotted.forEach( function (term) {
      var r = new RegExp( '\\W('+term+')\\W','ig');
      body = body.replace(r,' <mark>$1</mark> ');
    })
    return body;
  }

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
  function toggle(id) {
    var elem = document.getElementById(id);
    if (window.getComputedStyle(elem).display === 'block') {
      hide(id);
      return;
    }
    show(id);
  };
  function text(id,text) {
    document.getElementById(id).innerText = text;
  }
  function html(id,text) {
    document.getElementById(id).innerHTML = text;
  }

  function showData() {
    var table = document.getElementById('data-table');
    docs.forEach( function (doc) {
      table.innerHTML += '<tr>' +
        '<th>' + doc.title + '</th>' +
        '<td>' + doc.body + '</td>' +
        '</tr>';
    })
  }

  document.querySelector('.sample-data-link').addEventListener('click', function () {
    toggle('sample-data');

    if (window.getComputedStyle(document.getElementById('sample-data')).display === 'block') {
      document.querySelector('.sample-data-link').innerText = 'Hide Sample Data';
    } else {
      document.querySelector('.sample-data-link').innerText = 'Sample Data';
    }
  });
});
