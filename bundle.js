(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// ### getFoundTerms
/**
 *
 * Obtains the spotted search terms from the resultant text.
 *
 * @param {array[]} results contains the search results.
 * @param {string} query being searched.
 * @param {Object[]} docs being searched.
 * @param {string[]} fields of the `docs`.
 * @param {function[]} pipe in use for prep task.
 * @param {number} rwIndex index of `removeWords()` function.
 * @return {string[]} of search terms found in the `results` `docs`.
 */
var getSpottedTerms = function ( results, query, docs, fields, pipe, rwIndex ) {
  // Upto the `removeWords` pipe.
  var pipe1 = pipe.slice( 0, rwIndex );
  // From `removeWords` and beyond pipe.
  var pipe2 = pipe.slice( rwIndex );
  // Copy of query.
  var q = query.slice( 0 );
  // Total text for search `results` for `fields`.
  var t = [];
  // Spotted terms.
  var st = Object.create( null );

  // Empty results => empty found terms!
  if ( results.length === 0 ) return [];

  // Transform query as per the overall pipe.
  for ( let i = 0; i < pipe.length; i += 1 ) {
    q = pipe[ i ]( q );
  }

  // Extract total text from all fields of resultant docs.
  results.forEach( function ( r ) {
    fields.forEach( ( f ) => ( t.push( docs[r[ 0 ]][ f ] ) ) );
  } );
  t = t.join( ' ' );

  pipe1.forEach( function ( f ) {
    t = f( t );
  } );
  // It is text that has been LowerCased, tokenized, and stop words removed.
  var tRef = t.slice( 0 );

  // Now stem & negation handling – means words might get transformed i.e.
  // stemmed and may be prefixed with `!` due to negation.
  pipe2.forEach( function ( f ) {
    t = f( t );
  } );

  // Build a list of spotted terms by searching `t[ i ]` in `q` and
  // if found, build the `st` using the corresponding `tRef[ i ]`.
  for ( let i = 0; i < t.length; i += 1 ) {
    if ( q.indexOf( t[ i ] ) !== -1 ) {
      st[ tRef[ i ] ] = true;
    }
  }

  // Convert to array & return!
  return Object.keys( st );
};

module.exports = getSpottedTerms;

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title":  "Barack Obama",
    "body": "Barack Hussein Obama II born August 4, 1961 is an American politician who served as the 44th President of the United States from 2009 to 2017. He is the first African American to have served as president. He previously served in the U.S. Senate representing Illinois from 2005 to 2008, and in the Illinois State Senate from 1997 to 2004."
  },
  {
    "title": "Michelle Obama",
    "body": "Michelle LaVaughn Robinson Obama (born January 17, 1964) is an American lawyer and writer who was First Lady of the United States from 2009 to 2017. She is married to the 44th President of the United States, Barack Obama, and was the first African-American First Lady. Raised on the South Side of Chicago, Illinois, Obama is a graduate of Princeton University and Harvard Law School, and spent her early legal career working at the law firm Sidley Austin, where she met her husband. She subsequently worked as the Associate Dean of Student Services at the University of Chicago and the Vice President for Community and External Affairs of the University of Chicago Medical Center. Barack and Michelle married in 1992 and have two daughters."
  },
  {
    "title": "William meaning bill clinton",
    "body": "William Jefferson Clinton (born William Jefferson Blythe III; August 19, 1946), commonly known as Bill Clinton, is an American politician who served as the 42nd President of the United States from 1993 to 2001. Prior to the Presidency he was the 40th Governor of Arkansas from 1979 to 1981 and the state's 42nd Governor from 1983 to 1992. Before that, he served as Arkansas Attorney General from 1977 to 1979. A member of the Democratic Party, Clinton was ideologically a New Democrat, and many of his policies reflected a centrist political philosophy. Clinton was born and raised in Arkansas and is an alumnus of Georgetown University, where he was a member of Kappa Kappa Psi and the Phi Beta Kappa Society; he earned a Rhodes Scholarship to attend the University of Oxford. Clinton is married to Hillary Rodham Clinton, who served as United States Secretary of State from 2009 to 2013 and U.S. Senator from New York from 2001 to 2009, and was the Democratic nominee for President in 2016. Bill Clinton and Hillary Rodham both earned degrees from Yale Law School, where they met and began dating. As Governor of Arkansas, Clinton overhauled the state's education system and served as chairman of the National Governors Association."
  },
  {
    "title": "Hillary Rodham Clinton",
    "body": "Hillary Diane Rodham Clinton (/ˈhɪləri daɪˈæn ˈrɒdəm ˈklɪntən/; born October 26, 1947) is an American politician who was the 67th United States Secretary of State from 2009 to 2013, U.S. Senator from New York from 2001 to 2009, First Lady of the United States from 1993 to 2001, and the Democratic Party's nominee for President of the United States in the 2016 election. Born in Chicago, Illinois, and raised in the Chicago suburb of Park Ridge, Clinton graduated from Wellesley College in 1969, and earned a J.D. from Yale Law School in 1973. After serving as a congressional legal counsel, she moved to Arkansas and married Bill Clinton in 1975. In 1977, she co-founded Arkansas Advocates for Children and Families. She was appointed the first female chair of the Legal Services Corporation in 1978 and became the first female partner at Rose Law Firm the following year. As First Lady of Arkansas, she led a task force whose recommendations helped reform Arkansas's public schools."
  },
  {
    "title": "George W Bush",
    "body": "George Walker Bush (born July 6, 1946) is an American politician who served as the 43rd President of the United States from 2001 to 2009. He was also the 46th Governor of Texas from 1995 to 2000. After graduating from Yale University in 1968 and Harvard Business School in 1975, he worked in the oil industry. He never studied Law. Bush married Laura Welch in 1977 and ran unsuccessfully for the House of Representatives shortly thereafter. He later co-owned the Texas Rangers baseball team before defeating Ann Richards in the 1994 Texas gubernatorial election. Bush was elected president in 2000 after a close and controversial win over Democratic rival Al Gore, becoming the fourth president to be elected while receiving fewer popular votes than his opponent.[3]"
  },
  {
    "title": "laura W Bush",
    "body": "Laura Lane Welch Bush (born November 4, 1946) is the wife of the 43rd President of the United States, George W. Bush, and was the First Lady from 2001 to 2009.[1][2] Bush graduated from Southern Methodist University in 1968 with a bachelor's degree in education, and took a job as a second grade teacher. After attaining her master's degree in library science at the University of Texas at Austin, she was employed as a librarian. Bush met her future husband, George W. Bush, in 1977, and they were married later that year. The couple had twin daughters in 1981. Bush's political involvement began during her marriage. She campaigned with her husband during his unsuccessful 1978 run for the United States Congress, and later for his successful Texas gubernatorial campaign."
  },
  {
    "title": "George H W Bush",
    "body": "George Herbert Walker Bush (born June 12, 1924) is an American politician who was the 41st President of the United States from 1989 to 1993 and the 43rd Vice President of the United States from 1981 to 1989. A member of the Republican Party, he was previously a congressman, ambassador, and Director of Central Intelligence. He is the oldest living former President and Vice President. Since 2000, Bush has often been referred to as George H. W. Bush, Bush 41, Bush the Elder, or George Bush Senior to distinguish him from his eldest son, George W. Bush, who became the 43rd President of the United States after the 2000 election."
  },
  {
    "title": "Barbara Bush",
    "body": "Barbara Bush (née Pierce; born June 8, 1925) is the wife of George H. W. Bush, the 41st President of the United States, and served as First Lady of the United States from 1989 to 1993. She is the mother of George W. Bush, the 43rd President, and Jeb Bush, the 43rd Governor of Florida. She served as the Second Lady of the United States from 1981 to 1989. Barbara Pierce was born in Flushing, New York. She attended Milton Public School from 1931 to 1937, and Rye Country Day School from 1937-1940. She graduated from Ashley Hall School in Charleston, South Carolina. She met George Herbert Walker Bush at age 16, and the two married in Rye, New York in 1945, while he was on leave during his deployment as a Naval officer in World War II. While George was attending Yale University at age 22, Barbara and George were living in New Haven, Connecticut and had their first son, George Walker Bush, on July 6, 1946. (Thus, her first son, the eventual 43rd President of the United States, was the first Connecticut native to assume that office. George W. would eventually return to his hometown of New Haven in 1964 to attend Yale like his father did.) They had six children together. The Bush family soon moved to Midland, Texas, where their second son, Jeb was born in, on February 11, 1953; as George Bush entered political life, she raised their children."
  },
  {
    "title": "Ronald Reagan",
    "body": "Ronald Wilson Reagan (/ˈrɒnəld ˈwɪlsən ˈreɪɡən/) (February 6, 1911 – June 5, 2004) was an American politician and actor who served as the 40th President of the United States from 1981 to 1989. Before his presidency, he was the 33rd Governor of California, from 1967 to 1975, after a career as a Hollywood actor and union leader. Raised in a poor family in small towns of northern Illinois, Reagan graduated from Eureka College in 1932 and worked as a sports announcer on several regional radio stations. After moving to Hollywood in 1937, he became an actor and starred in a few major productions. Reagan was twice elected President of the Screen Actors Guild, the labor union for actors, where he worked to root out Communist influence."
  },
  {
    "title": "Nancy Reagan",
    "body": "Nancy Davis Reagan (born Anne Frances Robbins; July 6, 1921 – March 6, 2016) was an American film actress, and the wife of the 40th President of the United States, Ronald Reagan. She served as the First Lady of the United States from 1981 to 1989. She was born in New York City. After her parents separated, she lived in Maryland with an aunt and uncle for some years. She moved to Chicago when her mother remarried in 1929, and later took the name Davis from her stepfather. As Nancy Davis, she was a Hollywood actress in the 1940s and 1950s, starring in films such as The Next Voice You Hear..., Night into Morning, and Donovan's Brain. In 1952, she married Ronald Reagan, who was then president of the Screen Actors Guild. They had two children together. Reagan was the First Lady of California when her husband was Governor from 1967 to 1975, and she began to work with the Foster Grandparents Program."
  }
]

},{}],3:[function(require,module,exports){
//     wink-bm25-text-search
//     Fast Full Text Search based on BM25F
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-bm25-text-search”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var helpers = require( 'wink-helpers' );

/* eslint guard-for-in: 0 */
/* eslint complexity: [ "error", 25 ] */

// It is a BM25F In-memory Search engine for text and exposes following
// methods:
// 1. `definePrepTasks` allows to define field-wise (optional) pipeline of
// functions that will be used to prepare each input prior to *search/predict*
// and *addDoc/learn*.
// 2. `defineConfig` sets up the configuration for *field-wise weights*,
// *BM25F parameters*, and **field names whoes original value** needs to be retained.
// 3. `addDoc/learn` adds a document using its unique id. The document is supplied
// as an Javascript object, where each property is the field of the document
// and its value is the text.
// 4. `consolidate` learnings prior to search/predict.
// 5. `search/predict` searches for the input text and returns the resultant
// document ids, sorted by their relevance along with the score. The number of
// results returned can be controlled via a limit argument that defaults to **10**.
// The last optional argument is a filter function that must return a `boolean`
// value, which is used to filter documents.
// 6. `exportJSON` exports the learnings in JSON format.
// 7. `importJSON` imports the learnings from JSON that may have been saved on disk.
// 8. `reset` all the learnings except the preparatory tasks.
var bm25fIMS = function () {
  // Preparatory tasks that are executed on the `addDoc` & `search` input.
  var pTasks = [];
  // And its count.
  var pTaskCount;
  // Field level prep tasks.
  var flds = Object.create( null );
  // Returned!
  var methods = Object.create( null );
  // Term Frequencies & length of each document.
  var documents = Object.create( null );
  // Inverted Index for faster search
  var invertedIdx = [];
  // IDF for each tokens, tokens are referenced via their numerical index.
  var idf = [];
  // Set true on first call to `addDoc/learn` to prevent changing config.
  var learned = false;
  // The `addDoc()predict()` function checks for this being true; set
  // in `consolidate()`.
  var consolidated = false;
  // Total documents added.
  var totalDocs = 0;
  // Total number of tokens across all documents added.
  var totalCorpusLength = 0;
  // Their average.
  var avgCorpusLength = 0;
  // BM25F Configuration; set up in `defineConfig()`.
  var config = null;
  // The `token: index` mapping; `index` is used everywhere instead
  // of the `token`
  var token2Index = Object.create( null );
  // Index's initial value, incremented with every new word.
  var currTokenIndex = 0;

  // ### Private functions

  // #### Perpare Input

  // Prepares the `input` by executing the pipeline of tasks defined in the
  // `field` specific `pTasks` set via `definePrepTasks()`.
  // If `field` is not specified then default `pTasks` are used.
  // If the `field` specific `pTasks` are not defined then it automatically
  // switches to default `pTasks`.
  var prepareInput = function ( input, field ) {
    var processedInput = input;
    var pt = ( flds[ field ] && flds[ field ].pTasks ) || pTasks;
    var ptc = ( flds[ field ] && flds[ field ].pTaskCount ) || pTaskCount;
    for ( var i = 0; i < ptc; i += 1 ) {
      processedInput = pt[ i ]( processedInput );
    }
    return ( processedInput );
  }; // prepareInput()

  // #### Update Freq

  // Updates the `freq` of each term in the `text` after pre-processing it via
  // `prepareInput()`; while updating, it takes care of `field's` `weight`.
  var updateFreq = function ( id, text, weight, freq, field ) {
    // Tokenized `text`.
    var tkns = prepareInput( text, field );
    // Temp token holder.
    var t;
    for ( var i = 0, imax = tkns.length; i < imax; i += 1 ) {
      t = tkns[ i ];
      // Build `token: index` mapping.
      if ( token2Index[ t ] === undefined ) {
        token2Index[ t ] = currTokenIndex;
        currTokenIndex += 1;
      }
      t = token2Index[ t ];
      if ( freq[ t ] === undefined ) {
        freq[ t ] = weight;
        invertedIdx[ t ] = invertedIdx[ t ] || [];
        invertedIdx[ t ].push( id );
      } else {
        freq[ t ] += weight;
      }
    }
    // Length can not be negative!
    return ( tkns.length * Math.abs( weight ) );
  }; // updateFreq()

  // ### Exposed Functions

  // #### Define Prep Tasks

  // Defines the `tasks` required to prepare the input for `addDoc` and `search()`
  // The `tasks` should be an array of functions; using these function a simple
  // pipeline is built to serially transform the input to the output.
  // It validates the `tasks` before updating the `pTasks`.
  // If validation fails it throws an appropriate error.
  // Tasks can be defined separately for each field. However if the field is not
  // specified (i.e. `null` or `undefined`), then the `tasks` become default.
  // Note, `field = 'search'` is reserved for prep tasks for search string; However
  // if the same is not specified, the default tasks are used for pre-processing.
  var definePrepTasks = function ( tasks, field ) {
    if ( config === null ) {
      throw Error( 'winkBM25S: Config must be defined before defining prepTasks.' );
    }
    if ( !helpers.array.isArray( tasks ) ) {
      throw Error( 'winkBM25S: Tasks should be an array, instead found: ' + JSON.stringify( tasks ) );
    }
    for ( var i = 0, imax = tasks.length; i < imax; i += 1 ) {
      if ( typeof tasks[ i ] !== 'function' ) {
        throw Error( 'winkBM25S: Tasks should contain function, instead found: ' + ( typeof tasks[ i ] ) );
      }
    }
    var fldWeights = config.fldWeights;
    if ( field === undefined || field === null ) {
      pTasks = tasks;
      pTaskCount = tasks.length;
    } else {
      if ( !fldWeights[ field ] || typeof field !== 'string' ) {
        throw Error( 'winkBM25S: Field name is missing or it is not a string: ' + JSON.stringify( field ) + '/' + ( typeof field ) );
      }
      flds[ field ] = flds[ field ] || Object.create( null );
      flds[ field ].pTasks = tasks;
      flds[ field ].pTaskCount = tasks.length;
    }
    return tasks.length;
  }; // definePrepTasks()

  // #### Define Config

  // Defines the configuration for BM25F using `fldWeights` and `bm25Params`
  // properties of `cfg` object.</br>
  // The `fldWeights` defines the weight for each field of the document. This gives
  // a semantic nudge to search and are used as a mutiplier to the count
  // (frequency) of each token contained in that field of the document. It should
  // be a JS object containing `field-name/value` pairs. If a field's weight is
  // not defined, that field is **ignored**. The field weights must be defined before
  // attempting to add a document via `addDoc()`; they can only be defined once.
  // If any document's field is not defined here then that field is **ignored**.
  // </br>
  // The `k`, `b` and `k1` properties of `bm25Params` object define the smoothing
  // factor for IDF, degree of normalization for TF, and saturation control factor
  // respectively for the BM25F. Their default values are **1**, **0.75**, and
  // **1.2**.<br/>
  // The `ovFieldNames` is an array of field names whose original value needs to
  // be retained.
  var defineConfig = function ( cfg ) {
    if ( learned ) {
      throw Error( 'winkBM25S: config must be defined before learning/addition starts!' );
    }
    if ( !helpers.object.isObject( cfg ) ) {
      throw Error( 'winkBM25S: config must be a config object, instead found: ' + JSON.stringify( cfg ) );
    }
    // If `fldWeights` are absent throw error.
    if ( !helpers.object.isObject( cfg.fldWeights ) ) {
      throw Error( 'winkBM25S: fldWeights must be an object, instead found: ' + JSON.stringify( cfg.fldWeights ) );
    }
    // There should be at least one defined field!
    if ( ( helpers.object.keys( cfg.fldWeights ) ).length === 0 ) {
      throw Error( 'winkBM25S: Field config has no field defined.' );
    }
    // Setup configuration now.
    config = Object.create( null );
      // Field config for BM25**F**
    config.fldWeights = Object.create( null );
    config.bm25Params = Object.create( null );
    // **Controls TF part:**<br/>
    // `k1` controls saturation of token's frequency; higher value delays saturation
    // with increase in frequency.
    config.bm25Params.k1 = 1.2;
    // `b` controls the degree of normalization; **0** means no normalization and **1**
    // indicates complete normalization!
    config.bm25Params.b = 0.75;
    // **Controls IDF part:**<br/>
    // `k` controls impact of IDF; should be >= 0; a higher value means lower
    // the impact of IDF.
    config.bm25Params.k = 1;
    // Setup field weights.
    for ( var field in cfg.fldWeights ) {
      // The `null` check is required as `isNaN( null )` returns `false`!!
      // This first ensures non-`null/undefined/0` values before testing for NaN.
      if ( !cfg.fldWeights[ field ] || isNaN( cfg.fldWeights[ field ] ) ) {
        throw Error( 'winkBM25S: Field weight should be number >0, instead found: ' + JSON.stringify( cfg.fldWeights[ field ] ) );
      }
      // Update config parameters from `cfg`.
      config.fldWeights[ field ] = ( +cfg.fldWeights[ field ] );
    }
    // Setup BM25F params.
    // Create `bm25Params` if absent in `cfg`.
    if ( !helpers.object.isObject( cfg.bm25Params ) ) cfg.bm25Params = Object.create( null );
    // Update config parameters from `cfg`.
    config.bm25Params.b = (
                            ( cfg.bm25Params.b === null ) ||
                            ( cfg.bm25Params.b === undefined ) ||
                            ( isNaN( cfg.bm25Params.b ) ) ||
                            ( +cfg.bm25Params.b < 0 || +cfg.bm25Params.b > 1 )
                          ) ? 0.75 : +cfg.bm25Params.b;

    // Update config parameters from `cfg`.
    config.bm25Params.k1 = (
                            ( cfg.bm25Params.k1 === null ) ||
                            ( cfg.bm25Params.k1 === undefined ) ||
                            ( isNaN( cfg.bm25Params.k1 ) ) ||
                            ( +cfg.bm25Params.k1 < 0 )
                           ) ? 1.2 : +cfg.bm25Params.k1;

    // Update config parameters from `cfg`.
    config.bm25Params.k = (
                            ( cfg.bm25Params.k === null ) ||
                            ( cfg.bm25Params.k === undefined ) ||
                            ( isNaN( cfg.bm25Params.k ) ) ||
                            ( +cfg.bm25Params.k < 0 )
                          ) ? 1 : +cfg.bm25Params.k;

    // Handle configuration for fields whose orginal values has to be retained
    // in the document.<br/>
    // Initialize the `ovFldNames` in the final `config` as an empty array
    config.ovFldNames = [];
    if ( !cfg.ovFldNames ) cfg.ovFldNames = [];
    if ( !helpers.array.isArray(cfg.ovFldNames) ) {
      throw Error( 'winkBM25S: OV Field names should be an array, instead found: ' + JSON.stringify( typeof cfg.ovFldNames ) );
    }

    cfg.ovFldNames.forEach( function ( f ) {
      if ( ( typeof f !== 'string' ) || ( f.length === 0 ) ) {
        throw Error( 'winkBM25S: OV Field name should be a non-empty string, instead found: ' + JSON.stringify( f ) );
      }
      config.ovFldNames.push( f );
    } );
    return true;
  }; // defineConfig()


  // #### Add Doc

  // Adds a document to the model using `updateFreq()` function.
  var addDoc = function ( doc, id ) {
    if ( config === null ) {
      throw Error( 'winkBM25S: Config must be defined before adding a document.' );
    }
    var fldWeights = config.fldWeights;
    // No point in adding/learning further in absence of consolidated.
    if ( consolidated ) {
      throw Error( 'winkBM25S: post consolidation adding/learning is not possible!' );
    }
    // Set learning/addition started.
    learned = true;
    var length;
    if ( documents[ id ] !== undefined ) {
      throw Error( 'winkBM25S: Duplicate document encountered: ' + JSON.stringify( id ) );
    }
    documents[ id ] = Object.create( null );
    documents[ id ].freq = Object.create( null );
    documents[ id ].fieldValues = Object.create( null );
    documents[ id ].length = 0;
    // Compute `freq` & `length` of the specified fields.
    for ( var field in fldWeights ) {
      if ( doc[ field ] === undefined ) {
        throw Error( 'winkBM25S: Missing field in the document: ' + JSON.stringify( field ) );
      }
      length = updateFreq( id, doc[ field ], fldWeights[ field ], documents[ id ].freq, field );
      documents[ id ].length += length;
      totalCorpusLength += length;
    }
    // Retain Original Field Values, if configured.
    config.ovFldNames.forEach( function ( f ) {
      if ( doc[ f ] === undefined ) {
        throw Error( 'winkBM25S: Missing field in the document: ' + JSON.stringify( f ) );
      }
      documents[ id ].fieldValues[ f ] = doc[ f ];
    } );
    // Increment total documents indexed so far.
    totalDocs += 1;
    return ( totalDocs );
  }; // addDoc()

  // #### Consolidate

  // Consolidates the data structure of bm25 and computes the IDF. This must be
  // built before using the `search` function. The `fp` defines the precision at
  // which term frequency values are stored. The default value is **4**. In cause
  // of an invalid input, it default to 4. The maximum permitted value is 9; any
  // value larger than 9 is forced to 9.
  var consolidate = function ( fp ) {
    if ( consolidated ) {
      throw Error( 'winkBM25S: consolidation can be carried out only once!' );
    }
    if ( totalDocs < 3 ) {
      throw Error( 'winkBM25S: document collection is too small for consolidation; add more docs!' );
    }
    var freqPrecision = parseInt( fp, 10 );
    freqPrecision = ( isNaN( freqPrecision ) ) ? 4 :
                      ( freqPrecision < 4 ) ? 4 :
                        ( freqPrecision > 9 ) ? 9 : freqPrecision;
    // Using the commonly used names but unfortunately they are very cryptic and
    // *short*. **Must not use these variable names elsewhere**.
    var b = config.bm25Params.b;
    var k1 = config.bm25Params.k1;
    var k = config.bm25Params.k;
    var freq, id, n, normalizationFactor, t;
    // Consolidate: compute idf; will multiply with freq to save multiplication
    // time during search. This happens in the next loop-block.
    for ( var i = 0, imax = invertedIdx.length; i < imax; i += 1 ) {
      n = invertedIdx[ i ].length;
      idf[ i ] = Math.log( ( ( totalDocs - n + 0.5 ) / ( n + 0.5 ) ) + k );
      // To be uncommented to probe values!
      // console.log( '%s, %d, %d, %d, %d', t, totalDocs, n, k, idf[ t ] );
    }
    avgCorpusLength = totalCorpusLength / totalDocs;
    // Consolidate: update document frequencies.
    for ( id in documents ) {
      normalizationFactor = ( 1 - b ) + ( b * ( documents[ id ].length / avgCorpusLength ) );
      for ( t in documents[ id ].freq ) {
        freq = documents[ id ].freq[ t ];
        // Update frequency but ensure the sign is carefully preserved as the
        // magnitude of `k1` can jeopardize the sign!
        documents[ id ].freq[ t ] = Math.sign( freq ) *
          ( Math.abs( ( freq * ( k1 + 1 ) ) / ( ( k1 * normalizationFactor ) + freq ) ) *
          idf[ t ] ).toFixed( freqPrecision );
        // To be uncommented to probe values!
        // console.log( '%s, %s, %d', id, t, documents[ id ].freq[ t ] );
      }
    }
    // Set `consolidated` as `true`.
    consolidated = true;
    return true;
  }; // consolidate()

  // #### Search

  // Searches the `text` and return `limit` results. If `limit` is not sepcified
  // then it will return a maximum of **10** results. The `result` is an array of
  // containing `doc id` and `score` pairs array. If the `text` is not found, an
  // empty array is returned. The `text` must be a string. The argurment `filter`
  // is like `filter` of JS Array; it receive an object containing document's
  // retained field name/value pairs along with the `params` (which is passed as
  // the second argument). It is useful in limiting the search space or making the
  // search more focussed.
  var search = function ( text, limit, filter, params ) {
    // Predict/Search only if learnings have been consolidated!
    if ( !consolidated ) {
      throw Error( 'winkBM25S: search is not possible unless learnings are consolidated!' );
    }
    if ( typeof text !== 'string' ) {
      throw Error( 'winkBM25S: search text should be a string, instead found: ' + ( typeof text ) );
    }
    // Setup filter function
    var f = ( typeof filter === 'function' ) ?
              filter :
              function () {
                return true;
              };
    // Tokenized `text`. Use search specific weights.
    var tkns = prepareInput( text, 'search' )
                // Filter out tokens that do not exists in the vocabulary.
                .filter( function ( t ) {
                   return ( token2Index[ t ] !== undefined );
                 } )
                // Now map them to their respective indexes using `token2Index`.
                .map( function ( t ) {
                   return token2Index[ t ];
                 } );
    // Search results go here as doc id/score pairs.
    var results = Object.create( null );
    // Helper variables.
    var id, ids, t;
    var i, imax, j, jmax;
    // Iterate for every token in the preapred text.
    for ( j = 0, jmax = tkns.length; j < jmax; j += 1 ) {
      t = tkns[ j ];
      // Use Inverted Idx to look up - accelerates search!<br/>
      // Note, `ids` can never be `undefined` as **unknown** tokens have already
      // been filtered.
      ids = invertedIdx[ t ];
      // Means the token exists in the vocabulary!
      // Compute scores for every document.
      for ( i = 0, imax = ids.length; i < imax; i += 1 ) {
        id = ids[ i ];
        if ( f( documents[ id ].fieldValues, params ) ) {
          results[ id ] = documents[ id ].freq[ t ] + ( results[ id ] || 0 );
        }
        // To be uncommented to probe values!
        /* console.log( '%s, %d, %d, %d', t, documents[ id ].freq[ t ], idf[ t ], results[ id ] ); */
      }
    }
    // Convert to a table in `[ id, score ]` format; sort and slice required number
    // of resultant documents.
    return ( ( helpers.object.table( results ) )
                .sort( helpers.array.descendingOnValue )
                .slice( 0, Math.max( ( limit || 10 ), 1 ) )
           );
  }; // search()

  // #### Reset

  // Resets the BM25F completely by re-initializing all the learning
  // related variables, except the preparatory tasks.
  var reset = function () {
    // Reset values of variables that are associated with learning; Therefore
    // `pTasks` & `pTaskCount` are not re-initialized.
    // Term Frequencies & length of each document.
    documents = Object.create( null );
    // Inverted Index for faster search
    invertedIdx = [];
    // IDF for each tokens
    idf = [];
    // Set true on first call to `addDoc/learn` to prevent changing config.
    learned = false;
    // The `addDoc()predict()` function checks for this being true; set
    // in `consolidate()`.
    consolidated = false;
    // Total documents added.
    totalDocs = 0;
    // Total number of tokens across all documents added.
    totalCorpusLength = 0;
    // Their average.
    avgCorpusLength = 0;
    // BM25F Configuration; set up in `defineConfig()`.
    config = null;
    // The `token: index` mapping; `index` is used everywhere instead
    // of the `token`
    token2Index = Object.create( null );
    // Index's initial value, incremented with every new word.
    currTokenIndex = 0;
    return true;
  }; // reset()

  // #### Export JSON

  // Returns the learnings, along with `consolidated` flag, in JSON format.
  var exportJSON = function ( ) {
    var docStats = Object.create( null );
    docStats.totalCorpusLength = totalCorpusLength;
    docStats.totalDocs = totalDocs;
    docStats.consolidated = consolidated;
    return ( JSON.stringify( [
      config,
      docStats,
      documents,
      invertedIdx,
      currTokenIndex,
      token2Index,
      // For future expansion but the import will have to have intelligence to
      // set the default values and still ensure nothing breaks! Hopefully!!
      {},
      [],
      []
    ] ) );
  }; // exportJSON()

  // #### Import JSON

  // Imports the `json` in to index after validating the format of input JSON.
  // If validation fails then throws error; otherwise on success import it
  // returns `true`. Note, importing leads to resetting the search engine.
  var importJSON = function ( json ) {
    if ( !json ) {
      throw Error( 'winkBM25S: undefined or null JSON encountered, import failed!' );
    }
    // Validate json format
    var isOK = [
      helpers.object.isObject,
      helpers.object.isObject,
      helpers.object.isObject,
      helpers.array.isArray,
      Number.isInteger,
      helpers.object.isObject,
      helpers.object.isObject,
      helpers.array.isArray,
      helpers.array.isArray
    ];
    var parsedJSON = JSON.parse( json );
    if ( !helpers.array.isArray( parsedJSON ) || parsedJSON.length !== isOK.length ) {
      throw Error( 'winkBM25S: invalid JSON encountered, can not import.' );
    }
    for ( var i = 0; i < isOK.length; i += 1 ) {
      if ( !isOK[ i ]( parsedJSON[ i ] ) ) {
        throw Error( 'winkBM25S: invalid JSON encountered, can not import.' );
      }
    }
    // All good, setup variable values.
    // First reset everything.
    reset();
    // To prevent config change.
    learned = true;
    // Load variable values.
    config = parsedJSON[ 0 ];
    totalCorpusLength = parsedJSON[ 1 ].totalCorpusLength;
    totalDocs = parsedJSON[ 1 ].totalDocs;
    consolidated = parsedJSON[ 1 ].consolidated;
    documents = parsedJSON[ 2 ];
    invertedIdx = parsedJSON[ 3 ];
    currTokenIndex = parsedJSON[ 4 ];
    token2Index = parsedJSON[ 5 ];
    // Return success.
    return true;
  }; // importJSON()

  methods.definePrepTasks = definePrepTasks;
  methods.defineConfig = defineConfig;
  methods.addDoc = addDoc;
  methods.consolidate = consolidate;
  methods.search = search;
  methods.exportJSON = exportJSON;
  methods.importJSON = importJSON;
  methods.reset = reset;
  // Aliases to keep APIs uniform across.
  methods.learn = addDoc;
  methods.predict = search;

  return ( methods );
}; // bm25fIMS()

module.exports = bm25fIMS;

},{"wink-helpers":5}],4:[function(require,module,exports){
//     wink-distance
//     Distance functions for Bag of Words, Strings,
//     Vectors and more.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-distance”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
// Soundex Code for alphabets.
/* eslint-disable object-property-newline */
var soundexMap = {
  A: 0, E: 0, I: 0, O: 0, U: 0, Y: 0,
  B: 1, F: 1, P: 1, V: 1,
  C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
  D: 3, T: 3,
  L: 4,
  M: 5, N: 5,
  R: 6
};

// ## string

// ### soundex
/**
 *
 * Produces the soundex code from the input `word`.
 *
 * @private
 * @param {string} word the input word.
 * @param {number} [maxLength=4] of soundex code to be returned.
 * @return {string} soundex code of `word`.
 * @example
 * soundex( 'Burroughs' );
 * // -> 'B620'
 * soundex( 'Burrows' );
 * // -> 'B620'
 */
var soundex = function ( word, maxLength ) {
  // Upper case right in the begining.
  var s = ( word.length ) ? word.toUpperCase() : '?';
  var i,
      imax = s.length;
  // Soundex code builds here.
  var sound = [];
  // Helpers - `ch` is a char from `s` and `code/prevCode` are sondex codes
  // for consonants.
  var ch, code,
      prevCode = 9;
  // Use default of 4.
  var maxLen = maxLength || 4;
  // Iterate through every character.
  for ( i = 0; i < imax; i += 1 ) {
    ch = s[ i ];
    code = soundexMap[ ch ];
    if ( i ) {
      // Means i is > 0.
      // `code` is either (a) `undefined` if an unknown character is
      // encountered including `h & w`, or (b) `0` if it is vowel, or
      // (c) the soundex code for a consonant.
      if ( code && code !== prevCode ) {
        // Consonant and not adjecant duplicates!
        sound.push( code );
      } else if ( code !== 0 ) {
        // Means `h or w` or an unknown character: ensure `prevCode` is
        // remembered so that adjecant duplicates can be handled!
        code = prevCode;
      }
    } else {
      // Retain the first letter
      sound.push( ch );
    }
    prevCode = code;
  }
  s = sound.join( '' );
  // Always ensure minimum length of 4 characters for maxLength > 4.
  if ( s.length < 4 ) s += '000';
  // Return the required length.
  return s.substr( 0, maxLen );
}; // soundex()

module.exports = soundex;

},{}],5:[function(require,module,exports){
//     wink-helpers
//     Functions for cross validation, shuffle, cartesian product and more
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-helpers”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var helpers = Object.create( null );

// ### Private Functions

// #### Product Reducer (Callback)

// Callback function used by `reduce` inside the `product()` function.
// Follows the standard guidelines of `reduce()` callback function.
var productReducer = function ( prev, curr ) {
  var c,
      cmax = curr.length;
  var p,
      pmax = prev.length;
  var result = [];

  for ( p = 0; p < pmax; p += 1 ) {
    for ( c = 0; c < cmax; c += 1 ) {
      result.push( prev[ p ].concat( curr[ c ] ) );
    }
  }
  return ( result );
}; // productReducer()

// ### Public Function

// ### Array Helpers

helpers.array = Object.create( null);

// #### is Array

// Tests if argument `v` is a JS array; returns `true` if it is, otherwise returns `false`.
helpers.array.isArray = function ( v ) {
  return ( ( v !== undefined ) && ( v !== null ) && ( Object.prototype.toString.call( v ) === '[object Array]' ) );
}; // isArray()


// #### sorting helpers

// Set of helpers to sort either numbers or strings. For key/value pairs,
// the format for each element must be `[ key, value ]`.
// Sort helper to sort an array in ascending order.
helpers.array.ascending = function ( a, b ) {
  return ( a > b ) ? 1 :
            ( a === b ) ? 0 : -1;
}; // ascending()

// Sort helper to sort an array in descending order.
helpers.array.descending = function ( a, b ) {
  return ( b > a ) ? 1 :
            ( b === a ) ? 0 : -1;
}; // descending()

// Sort helper to sort an array of `[ key, value ]` in ascending order by **key**.
helpers.array.ascendingOnKey = function ( a, b ) {
  return ( a[ 0 ] > b[ 0 ] ) ? 1 :
            ( a[ 0 ] === b[ 0 ] ) ? 0 : -1;
}; // ascendingOnKey()

// Sort helper to sort an array of `[ key, value ]` in descending order by **key**.
helpers.array.descendingOnKey = function ( a, b ) {
  return ( b[ 0 ] > a[ 0 ] ) ? 1 :
            ( b[ 0 ] === a[ 0 ] ) ? 0 : -1;
}; // descendingOnKey()

// Sort helper to sort an array of `[ key, value ]` in ascending order by **value**.
helpers.array.ascendingOnValue = function ( a, b ) {
  return ( a[ 1 ] > b[ 1 ] ) ? 1 :
            ( a[ 1 ] === b[ 1 ] ) ? 0 : -1;
}; // ascendingOnValue()

// Sort helper to sort an array of `[ key, value ]` in descending order by **value**.
helpers.array.descendingOnValue = function ( a, b ) {
  return ( b[ 1 ] > a[ 1 ] ) ? 1 :
            ( b[ 1 ] === a[ 1 ] ) ? 0 : -1;
}; // descendingOnValue()

// The following two functions generate a suitable function for sorting on a single
// key or on a composite keys (max 2 only). Just a remider, the generated function
// does not sort on two keys; instead it will sort on a key composed of the two
// accessors.
// Sorts in ascending order on `accessor1` & `accessor2` (optional).
helpers.array.ascendingOn = function ( accessor1, accessor2 ) {
  if ( accessor2 ) {
    return ( function ( a, b ) {
      return ( a[ accessor1 ][ accessor2 ] > b[ accessor1 ][ accessor2 ] ) ? 1 :
              ( a[ accessor1 ][ accessor2 ] === b[ accessor1 ][ accessor2 ] ) ? 0 : -1;
    } );
  }
  return ( function ( a, b ) {
    return ( a[ accessor1 ] > b[ accessor1 ] ) ? 1 :
            ( a[ accessor1 ] === b[ accessor1 ] ) ? 0 : -1;
  } );
}; // ascendingOn()

// Sorts in descending order on `accessor1` & `accessor2` (optional).
helpers.array.descendingOn = function ( accessor1, accessor2 ) {
  if ( accessor2 ) {
    return ( function ( a, b ) {
      return ( b[ accessor1 ][ accessor2 ] > a[ accessor1 ][ accessor2 ] ) ? 1 :
              ( b[ accessor1 ][ accessor2 ] === a[ accessor1 ][ accessor2 ] ) ? 0 : -1;
    } );
  }
  return ( function ( a, b ) {
    return ( b[ accessor1 ] > a[ accessor1 ] ) ? 1 :
            ( b[ accessor1 ] === a[ accessor1 ] ) ? 0 : -1;
  } );
}; // descendingOn()

// #### pluck

// Plucks specified element from each element of an **array of array**, and
// returns the resultant array. The element is specified by `i` (default `0`) and
// number of elements to pluck are defined by `limit` (default `a.length`).
helpers.array.pluck = function ( a, key, limit ) {
  var k, plucked;
  k = a.length;
  var i = key || 0;
  var lim = limit || k;
  if ( lim > k ) lim = k;
  plucked = new Array( lim );
  for ( k = 0; k < lim; k += 1 ) plucked[ k ] = a[ k ][ i ];
  return plucked;
}; // pluck()

// #### product

// Finds the Cartesian Product of arrays present inside the array `a`. Therefore
// the array `a` must be an array of 1-dimensional arrays. For example,
// `product( [ [ 9, 8 ], [ 1, 2 ] ] )`
// will produce `[ [ 9, 1 ], [ 9, 2 ], [ 8, 1 ], [ 8, 2 ] ]`.
helpers.array.product = function ( a ) {
  return (
    a.reduce( productReducer, [ [] ] )
  );
};

// #### shuffle

// Randomly shuffles the elements of an array and returns the same.
// Reference: Chapter on Random Numbers/Shuffling in Seminumerical algorithms.
// The Art of Computer Programming Volume II by Donald E Kunth
helpers.array.shuffle = function ( array ) {
  var a = array;
  var balance = a.length;
  var candidate;
  var temp;

  while ( balance ) {
    candidate = Math.floor( Math.random() * balance );
    balance -= 1;

    temp = a[ balance ];
    a[ balance ] = a[ candidate ];
    a[ candidate ] = temp;
  }

  return ( a );
};


// ### Object Helpers

var objectKeys = Object.keys;
var objectCreate = Object.create;

helpers.object = Object.create( null );

// #### is Object

// Tests if argument `v` is a JS object; returns `true` if it is, otherwise returns `false`.
helpers.object.isObject = function ( v ) {
  return ( v && ( Object.prototype.toString.call( v ) === '[object Object]' ) ) ? true : false; // eslint-disable-line no-unneeded-ternary

}; // isObject()

// #### keys

// Returns keys of the `obj` in an array.
helpers.object.keys = function ( obj ) {
  return ( objectKeys( obj ) );
}; // keys()

// #### size

// Returns the number of keys of the `obj`.
helpers.object.size = function ( obj ) {
  return ( ( objectKeys( obj ) ).length );
}; // size()

// #### values

// Returns all values from each key/value pair of the `obj` in an array.
helpers.object.values = function ( obj ) {
  var keys = helpers.object.keys( obj );
  var length = keys.length;
  var values = new Array( length );
  for ( var i = 0; i < length; i += 1 ) {
    values[ i ] = obj[ keys[ i ] ];
  }
  return values;
}; // values()

// #### value Freq

// Returns the frequency of each unique value present in the `obj`, where the
// **key** is the *value* and **value** is the *frequency*.
helpers.object.valueFreq = function ( obj ) {
  var keys = helpers.object.keys( obj );
  var length = keys.length;
  var val;
  var vf = objectCreate( null );
  for ( var i = 0; i < length; i += 1 ) {
    val = obj[ keys[ i ] ];
    vf[ val ] = 1 + ( vf[ val ] || 0 );
  }
  return vf;
}; // valueFreq()

// #### table

// Converts the `obj` in to an array of `[ key, value ]` pairs in form of a table.
// Second argument - `f` is optional and it is a function, which is called with
// each `value`.
helpers.object.table = function ( obj, f ) {
  var keys = helpers.object.keys( obj );
  var length = keys.length;
  var pairs = new Array( length );
  var ak, av;
  for ( var i = 0; i < length; i += 1 ) {
    ak = keys[ i ];
    av = obj[ ak ];
    if ( typeof f === 'function' ) f( av );
    pairs[ i ] = [ ak, av ];
  }
  return pairs;
}; // table()

// ### Validation Helpers

helpers.validate = Object.create( null );

// Create aliases for isObject and isArray.
helpers.validate.isObject = helpers.object.isObject;
helpers.validate.isArray = helpers.array.isArray;

// #### isFiniteInteger

// Validates if `n` is a finite integer.
helpers.validate.isFiniteInteger = function ( n ) {
  return (
    ( typeof n === 'number' ) &&
    !isNaN( n ) &&
    isFinite( n ) &&
    ( n === Math.round( n ) )
  );
}; // isFiniteInteger()

// #### isFiniteNumber

// Validates if `n` is a valid number.
helpers.validate.isFiniteNumber = function ( n ) {
  return (
    ( typeof n === 'number' ) &&
    !isNaN( n ) &&
    isFinite( n )
  );
}; // isFiniteNumber()

// ### cross validation
/**
 *
 * Creates an instance of cross validator useful for machine learning tasks.
 *
 * @param {string[]} classLabels - array containing all the class labels.
 * @return {methods} object conatining set of API methods for tasks like evalutaion,
 * reset and metrics generation.
*/
helpers.validate.cross = function ( classLabels ) {
  // wink's const for unknown predictions!
  const unknown = 'unknown';
  // To ensure that metrics is not computed prior to evaluation.
  var evaluated = false;
  // The confusion matrix.
  var cm;
  var precision;
  var recall;
  var fmeasure;

  // The class labels is assigned to this variable.
  var labels;
  // The length of `labels` array.
  var labelCount;
  var labelsObj = Object.create( null );

  // Returned!
  var methods = Object.create( null );


  /**
   *
   * Resets the current instance for another round of evaluation; the class
   * labels defined at instance creation time are not touched.
   *
   * @return {undefined} nothing!
  */
  var reset = function ( ) {
    evaluated = false;
    cm = Object.create( null );
    precision = Object.create( null );
    recall = Object.create( null );
    fmeasure = Object.create( null );

    // Initialize confusion matrix and metrics.
    for ( let i = 0; i < labelCount; i += 1 ) {
      const row = labels[ i ];
      labelsObj[ row ] = true;
      cm[ row ] = Object.create( null );
      precision[ row ] = 0;
      recall[ row ] = 0;
      fmeasure[ row ] = 0;
      for ( let j = 0; j < labelCount; j += 1 ) {
        const col = labels[ j ];
        cm[ row ][ col ] = 0;
      }
    }
  }; // reset()

  /**
   *
   * Creates an instance of cross validator useful for machine learning tasks.
   *
   * @param {string} truth - the actual class label.
   * @param {string} guess - the predicted class label.
   * @return {boolean} returns true if the evaluation is successful. The evaluation
   * may fail if `truth` or `guess` is not in the array `classLabels` provided at
   * instance creation time; or if guess is equal to `unknown`.
  */
  var evaluate = function ( truth, guess ) {
    // If prediction failed then return false!
    if ( guess === unknown || !labelsObj[ truth ] || !labelsObj[ guess ] ) return false;
    // Update confusion matrix.
    if ( guess === truth ) {
      cm[ truth ][ guess ] += 1;
    } else {
      cm[ guess ][ truth ] += 1;
    }
    evaluated = true;
    return true;
  }; // evaluate()

  /**
   *
   * It computes a detailed metrics consisting of macro-averaged precision,
   * recall and f-measure along with their label-wise values and the confusion
   * matrix.
   *
   * @return {object} object containing macro-averaged `avgPrecision`, `avgRecall`,
   * `avgFMeasure` values along with other details such as label-wise values
   * and the confusion matrix. A value of `null` is returned if no evaluate()
   * has been called before.
  */
  var metrics = function ( ) {
    if ( !evaluated ) return null;
    // Numerators for every label; they are same for precision & recall both.
    var n = Object.create( null );
    // Only denominators differs for precision & recall
    var pd = Object.create( null );
    var rd = Object.create( null );
    // `row` and `col` of confusion matrix.
    var col, row;
    var i, j;
    // Macro average values for metrics.
    var avgPrecision = 0;
    var avgRecall = 0;
    var avgFMeasure = 0;

    // Compute label-wise numerators & denominators!
    for ( i = 0; i < labelCount; i += 1 ) {
      row = labels[ i ];
      for ( j = 0; j < labelCount; j += 1 ) {
        col = labels[ j ];
        if ( row === col ) {
          n[ row ] = cm[ row ][ col ];
        }
        pd[ row ] = cm[ row ][ col ] + ( pd[ row ] || 0 );
        rd[ row ] = cm[ col ][ row ] + ( rd[ row ] || 0 );
      }
    }
    // Ready to compute metrics.
    for ( i = 0; i < labelCount; i += 1 ) {
      row = labels[ i ];
      precision[ row ] = +( n[ row ] / pd[ row ] ).toFixed( 4 );
      // NaN can occur if a label has not been encountered.
      if ( isNaN( precision[ row ] ) ) precision[ row ] = 0;

      recall[ row ] = +( n[ row ] / rd[ row ] ).toFixed( 4 );
      if ( isNaN( recall[ row ] ) ) recall[ row ] = 0;

      fmeasure[ row ] = +( 2 * precision[ row ] * recall[ row ] / ( precision[ row ] + recall[ row ] ) ).toFixed( 4 );
      if ( isNaN( fmeasure[ row ] ) ) fmeasure[ row ] = 0;
    }
    // Compute thier averages, note they will be macro avegages.
    for ( i = 0; i < labelCount; i += 1 ) {
      avgPrecision += ( precision[ labels[ i ] ] / labelCount );
      avgRecall += ( recall[ labels[ i ] ] / labelCount );
      avgFMeasure += ( fmeasure[ labels[ i ] ] / labelCount );
    }
    // Return metrics.
    return (
      {
        // Macro-averaged metrics.
        avgPrecision: +avgPrecision.toFixed( 4 ),
        avgRecall: +avgRecall.toFixed( 4 ),
        avgFMeasure: +avgFMeasure.toFixed( 4 ),
        details: {
          // Confusion Matrix.
          confusionMatrix: cm,
          // Label wise metrics details, from those averages were computed.
          precision: precision,
          recall: recall,
          fmeasure: fmeasure
        }
      }
    );
  }; // metrics()

  if ( !helpers.validate.isArray( classLabels ) ) {
    throw Error( 'cross validate: class labels must be an array.' );
  }
  if ( classLabels.length < 2 ) {
    throw Error( 'cross validate: at least 2 class labels are required.' );
  }
  labels = classLabels;
  labelCount = labels.length;

  reset();

  methods.reset = reset;
  methods.evaluate = evaluate;
  methods.metrics = metrics;

  return methods;
}; // cross()

// ### Object Helpers

helpers.string = Object.create( null );

// Regex for [diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) removal.
var rgxDiacritical = /[\u0300-\u036f]/g;

/**
 *
 * Normalizes the token's value by converting it to lower case and stripping
 * the diacritical marks (if any).
 *
 * @param {string} str — that needs to be normalized.
 * @return {string} the normalized value.
 * @example
 * normalize( 'Nestlé' );
 * // -> nestle
*/
helpers.string.normalize = function ( str ) {
  return (
    str.toLowerCase().normalize( 'NFD' ).replace( rgxDiacritical, '' )
  );
}; // normalize()

module.exports = helpers;

},{}],6:[function(require,module,exports){
//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

var contractions = Object.create( null );

// Tag - word.
var word = 'word';
// Verbs.
contractions[ 'can\'t' ] = [ { value: 'ca', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'CAN\'T' ] = [ { value: 'CA', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Can\'t' ] = [ { value: 'Ca', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'Couldn\'t' ] = [ { value: 'could', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'COULDN\'T' ] = [ { value: 'COULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Couldn\'t' ] = [ { value: 'Could', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'don\'t' ] = [ { value: 'do', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DON\'T' ] = [ { value: 'DO', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Don\'t' ] = [ { value: 'Do', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'doesn\'t' ] = [ { value: 'does', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DOESN\'T' ] = [ { value: 'DOES', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Doesn\'t' ] = [ { value: 'Does', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'didn\'t' ] = [ { value: 'did', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DIDN\'T' ] = [ { value: 'DID', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Didn\'t' ] = [ { value: 'Did', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'hadn\'t' ] = [ { value: 'had', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HADN\'T' ] = [ { value: 'HAD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Hadn\'t' ] = [ { value: 'Had', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mayn\'t' ] = [ { value: 'may', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MAYN\'T' ] = [ { value: 'MAY', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mayn\'t' ] = [ { value: 'May', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mightn\'t' ] = [ { value: 'might', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MIGHTN\'T' ] = [ { value: 'MIGHT', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mightn\'t' ] = [ { value: 'Might', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mustn\'t' ] = [ { value: 'must', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MUSTN\'T' ] = [ { value: 'MUST', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mustn\'t' ] = [ { value: 'Must', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'needn\'t' ] = [ { value: 'need', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'NEEDN\'T' ] = [ { value: 'NEED', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Needn\'t' ] = [ { value: 'Need', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'oughtn\'t' ] = [ { value: 'ought', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'OUGHTN\'T' ] = [ { value: 'OUGHT', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Oughtn\'t' ] = [ { value: 'Ought', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'shan\'t' ] = [ { value: 'sha', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'SHAN\'T' ] = [ { value: 'SHA', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Shan\'t' ] = [ { value: 'Sha', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'shouldn\'t' ] = [ { value: 'should', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'SHOULDN\'T' ] = [ { value: 'SHOULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Shouldn\'t' ] = [ { value: 'Should', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'won\'t' ] = [ { value: 'wo', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WON\'T' ] = [ { value: 'WO', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Won\'t' ] = [ { value: 'Wo', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'wouldn\'t' ] = [ { value: 'would', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WOULDN\'T' ] = [ { value: 'WOULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Wouldn\'t' ] = [ { value: 'Would', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'ain\'t' ] = [ { value: 'ai', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'AIN\'T' ] = [ { value: 'AI', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Ain\'t' ] = [ { value: 'Ai', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'aren\'t' ] = [ { value: 'are', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'AREN\'T' ] = [ { value: 'ARE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Aren\'t' ] = [ { value: 'Are', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'isn\'t' ] = [ { value: 'is', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'ISN\'T' ] = [ { value: 'IS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Isn\'t' ] = [ { value: 'Is', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'wasn\'t' ] = [ { value: 'was', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WASN\'T' ] = [ { value: 'WAS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Wasn\'t' ] = [ { value: 'Was', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'weren\'t' ] = [ { value: 'were', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WEREN\'T' ] = [ { value: 'WERE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Weren\'t' ] = [ { value: 'Were', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'haven\'t' ] = [ { value: 'have', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HAVEN\'T' ] = [ { value: 'HAVE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Haven\'t' ] = [ { value: 'Have', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'hasn\'t' ] = [ { value: 'has', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HASN\'T' ] = [ { value: 'HAS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Hasn\'t' ] = [ { value: 'Has', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'daren\'t' ] = [ { value: 'dare', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DAREN\'T' ] = [ { value: 'DARE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Daren\'t' ] = [ { value: 'Dare', tag: word }, { value: 'n\'t', tag: word } ];


// Pronouns like I, you, they, we, she, and he.
contractions[ 'i\'m' ] = [ { value: 'i', tag: word }, { value: '\'m', tag: word } ];
contractions[ 'I\'M' ] = [ { value: 'I', tag: word }, { value: '\'M', tag: word } ];
contractions[ 'I\'m' ] = [ { value: 'I', tag: word }, { value: '\'m', tag: word } ];

contractions[ 'i\'ve' ] = [ { value: 'i', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'VE' ] = [ { value: 'I', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'ve' ] = [ { value: 'I', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'d' ] = [ { value: 'i', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'I\'D' ] = [ { value: 'I', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'I\'d' ] = [ { value: 'I', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'i\'ll' ] = [ { value: 'i', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'I\'LL' ] = [ { value: 'I', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'I\'ll' ] = [ { value: 'I', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'you\'ve' ] = [ { value: 'you', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'ve' ] = [ { value: 'You', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'YOU\'D' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'You\'d' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'you\'ll' ] = [ { value: 'you', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'YOU\'LL' ] = [ { value: 'YOU', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'You\'ll' ] = [ { value: 'You', tag: word }, { value: '\'ll', tag: word } ];

// they - 've, 'd, 'll, 're
contractions[ 'they\'ve' ] = [ { value: 'they', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'ve' ] = [ { value: 'They', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'d' ] = [ { value: 'they', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THEY\'D' ] = [ { value: 'THEY', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'They\'d' ] = [ { value: 'They', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'they\'ll' ] = [ { value: 'they', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THEY\'LL' ] = [ { value: 'THEY', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'They\'ll' ] = [ { value: 'They', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'they\'re' ] = [ { value: 'they', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THEY\'RE' ] = [ { value: 'THEY', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'They\'re' ] = [ { value: 'They', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'we\'ve' ] = [ { value: 'we', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WE\'VE' ] = [ { value: 'WE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'We\'ve' ] = [ { value: 'We', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'we\'d' ] = [ { value: 'we', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WE\'D' ] = [ { value: 'WE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'We\'d' ] = [ { value: 'We', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'we\'ll' ] = [ { value: 'we', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WE\'LL' ] = [ { value: 'WE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'We\'ll' ] = [ { value: 'We', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'we\'re' ] = [ { value: 'we', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WE\'RE' ] = [ { value: 'WE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'We\'re' ] = [ { value: 'We', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'she\'d' ] = [ { value: 'she', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'SHE\'D' ] = [ { value: 'SHE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'She\'d' ] = [ { value: 'She', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'she\'ll' ] = [ { value: 'she', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'SHE\'LL' ] = [ { value: 'SHE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'She\'ll' ] = [ { value: 'She', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'she\'s' ] = [ { value: 'she', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'SHE\'S' ] = [ { value: 'SHE', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'She\'s' ] = [ { value: 'She', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'he\'d' ] = [ { value: 'he', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'HE\'D' ] = [ { value: 'HE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'He\'d' ] = [ { value: 'He', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'he\'ll' ] = [ { value: 'he', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'HE\'LL' ] = [ { value: 'HE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'He\'ll' ] = [ { value: 'He', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'he\'s' ] = [ { value: 'he', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'HE\'S' ] = [ { value: 'HE', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'He\'s' ] = [ { value: 'He', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'it\'d' ] = [ { value: 'it', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'IT\'D' ] = [ { value: 'IT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'It\'d' ] = [ { value: 'It', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'it\'ll' ] = [ { value: 'it', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'IT\'LL' ] = [ { value: 'IT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'It\'ll' ] = [ { value: 'It', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'it\'s' ] = [ { value: 'it', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'IT\'S' ] = [ { value: 'IT', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'It\'s' ] = [ { value: 'It', tag: word }, { value: '\'s', tag: word } ];

// Wh Pronouns - what, who, when, where, why, how, there, that
contractions[ 'what\'ve' ] = [ { value: 'what', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHAT\'VE' ] = [ { value: 'WHAT', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'What\'ve' ] = [ { value: 'What', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'what\'d' ] = [ { value: 'what', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHAT\'D' ] = [ { value: 'WHAT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'What\'d' ] = [ { value: 'What', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'what\'ll' ] = [ { value: 'what', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHAT\'LL' ] = [ { value: 'WHAT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'What\'ll' ] = [ { value: 'What', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'what\'re' ] = [ { value: 'what', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHAT\'RE' ] = [ { value: 'WHAT', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'What\'re' ] = [ { value: 'What', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'who\'ve' ] = [ { value: 'who', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHO\'VE' ] = [ { value: 'WHO', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Who\'ve' ] = [ { value: 'Who', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'who\'d' ] = [ { value: 'who', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHO\'D' ] = [ { value: 'WHO', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Who\'d' ] = [ { value: 'Who', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'who\'ll' ] = [ { value: 'who', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHO\'LL' ] = [ { value: 'WHO', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Who\'ll' ] = [ { value: 'Who', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'who\'re' ] = [ { value: 'who', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHO\'RE' ] = [ { value: 'WHO', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Who\'re' ] = [ { value: 'Who', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'when\'ve' ] = [ { value: 'when', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHEN\'VE' ] = [ { value: 'WHEN', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'When\'ve' ] = [ { value: 'When', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'when\'d' ] = [ { value: 'when', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHEN\'D' ] = [ { value: 'WHEN', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'When\'d' ] = [ { value: 'When', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'when\'ll' ] = [ { value: 'when', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHEN\'LL' ] = [ { value: 'WHEN', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'When\'ll' ] = [ { value: 'When', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'when\'re' ] = [ { value: 'when', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHEN\'RE' ] = [ { value: 'WHEN', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'When\'re' ] = [ { value: 'When', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'where\'ve' ] = [ { value: 'where', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHERE\'VE' ] = [ { value: 'WHERE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Where\'ve' ] = [ { value: 'Where', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'where\'d' ] = [ { value: 'where', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHERE\'D' ] = [ { value: 'WHERE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Where\'d' ] = [ { value: 'Where', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'where\'ll' ] = [ { value: 'where', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHERE\'LL' ] = [ { value: 'WHERE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Where\'ll' ] = [ { value: 'Where', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'where\'re' ] = [ { value: 'where', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHERE\'RE' ] = [ { value: 'WHERE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Where\'re' ] = [ { value: 'Where', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'why\'ve' ] = [ { value: 'why', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHY\'VE' ] = [ { value: 'WHY', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Why\'ve' ] = [ { value: 'Why', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'why\'d' ] = [ { value: 'why', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHY\'D' ] = [ { value: 'WHY', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Why\'d' ] = [ { value: 'Why', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'why\'ll' ] = [ { value: 'why', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHY\'LL' ] = [ { value: 'WHY', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Why\'ll' ] = [ { value: 'Why', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'why\'re' ] = [ { value: 'why', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHY\'RE' ] = [ { value: 'WHY', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Why\'re' ] = [ { value: 'Why', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'how\'ve' ] = [ { value: 'how', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HOW\'VE' ] = [ { value: 'HOW', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'How\'ve' ] = [ { value: 'How', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'how\'d' ] = [ { value: 'how', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'HOW\'D' ] = [ { value: 'HOW', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'How\'d' ] = [ { value: 'How', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'how\'ll' ] = [ { value: 'how', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'HOW\'LL' ] = [ { value: 'HOW', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'How\'ll' ] = [ { value: 'How', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'how\'re' ] = [ { value: 'how', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'HOW\'RE' ] = [ { value: 'HOW', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'How\'re' ] = [ { value: 'How', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'there\'ve' ] = [ { value: 'there', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THERE\'VE' ] = [ { value: 'THERE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'There\'ve' ] = [ { value: 'There', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'there\'d' ] = [ { value: 'there', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THERE\'D' ] = [ { value: 'THERE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'There\'d' ] = [ { value: 'There', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'there\'ll' ] = [ { value: 'there', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THERE\'LL' ] = [ { value: 'THERE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'There\'ll' ] = [ { value: 'There', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'there\'re' ] = [ { value: 'there', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THERE\'RE' ] = [ { value: 'THERE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'There\'re' ] = [ { value: 'There', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'that\'ve' ] = [ { value: 'that', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THAT\'VE' ] = [ { value: 'THAT', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'That\'ve' ] = [ { value: 'That', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'that\'d' ] = [ { value: 'that', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THAT\'D' ] = [ { value: 'THAT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'That\'d' ] = [ { value: 'That', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'that\'ll' ] = [ { value: 'that', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THAT\'LL' ] = [ { value: 'THAT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'That\'ll' ] = [ { value: 'That', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'that\'re' ] = [ { value: 'that', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THAT\'RE' ] = [ { value: 'THAT', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'That\'re' ] = [ { value: 'That', tag: word }, { value: '\'re', tag: word } ];

// Let us!
contractions[ 'let\'s' ] = [ { value: 'let', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'LET\'S' ] = [ { value: 'THAT', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'Let\'s' ] = [ { value: 'Let', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'could\'ve' ] = [ { value: 'could', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'COULD\'VE' ] = [ { value: 'COULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Could\'ve' ] = [ { value: 'Could', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'should\'ve' ] = [ { value: 'should', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHOULD\'VE' ] = [ { value: 'SHOULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Should\'ve' ] = [ { value: 'Should', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'would\'ve' ] = [ { value: 'would', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WOULD\'VE' ] = [ { value: 'WOULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Would\'ve' ] = [ { value: 'Would', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'ll\'ve' ] = [ { value: 'i', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'LL\'VE' ] = [ { value: 'I', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'ll\'ve' ] = [ { value: 'I', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'ll\'ve' ] = [ { value: 'you', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'LL\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'ll\'ve' ] = [ { value: 'You', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'ll\'ve' ] = [ { value: 'they', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'LL\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'ll\'ve' ] = [ { value: 'They', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'it\'ll\'ve' ] = [ { value: 'it', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'IT\'LL\'VE' ] = [ { value: 'IT', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'It\'ll\'ve' ] = [ { value: 'It', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'he\'ll\'ve' ] = [ { value: 'he', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HE\'LL\'VE' ] = [ { value: 'HE', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'He\'ll\'ve' ] = [ { value: 'He', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'she\'ll\'ve' ] = [ { value: 'she', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHE\'LL\'VE' ] = [ { value: 'SHE', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'She\'ll\'ve' ] = [ { value: 'She', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'shouldn\'t\'ve' ] = [ { value: 'should', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHOULDN\'T\'VE' ] = [ { value: 'SHOULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Shouldn\'t\'ve' ] = [ { value: 'Should', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'couldn\'t\'ve' ] = [ { value: 'could', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'COULDN\'T\'VE' ] = [ { value: 'COULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Couldn\'t\'ve' ] = [ { value: 'Could', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'wouldn\'t\'ve' ] = [ { value: 'would', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WOULDN\'T\'VE' ] = [ { value: 'WOULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Wouldn\'t\'ve' ] = [ { value: 'Would', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'d\'ve' ] = [ { value: 'i', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'D\'VE' ] = [ { value: 'I', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'d\'ve' ] = [ { value: 'I', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d\'ve' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'D\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'d\'ve' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'he\'d\'ve' ] = [ { value: 'he', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HE\'D\'VE' ] = [ { value: 'HE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'He\'d\'ve' ] = [ { value: 'He', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'she\'d\'ve' ] = [ { value: 'she', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHE\'D\'VE' ] = [ { value: 'SHE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'She\'d\'ve' ] = [ { value: 'She', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d\'ve' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'D\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'d\'ve' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'d\'ve' ] = [ { value: 'they', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'D\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'d\'ve' ] = [ { value: 'They', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'there\'d\'ve' ] = [ { value: 'there', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THERE\'D\'VE' ] = [ { value: 'THERE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'There\'d\'ve' ] = [ { value: 'There', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'it\'d\'ve' ] = [ { value: 'it', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'IT\'D\'VE' ] = [ { value: 'IT', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'It\'d\'ve' ] = [ { value: 'It', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

module.exports = contractions;

},{}],7:[function(require,module,exports){
//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var contractions = require( './eng-contractions.js' );
var rgxSpaces = /\s+/g;
// Ordinals only for Latin like 1st, 2nd or 12th or 33rd.
var rgxOrdinalL1 = /1\dth|[04-9]th|1st|2nd|3rd|[02-9]1st|[02-9]2nd|[02-9]3rd|[02-9][04-9]th|\d+\d[04-9]th|\d+\d1st|\d+\d2nd|\d+\d3rd/g;
// Apart from detecting pure integers or decimals, also detect numbers containing
// `. - / ,` so that dates, ip address, fractions and things like codes or part
// numbers are also detected as numbers only. These regex will therefore detected
// 8.8.8.8 or 12-12-1924 or 1,1,1,1.00 or 1/4 or 1/4/66/777 as numbers.
// Latin-1 Numbers.
var rgxNumberL1 = /\d+\/\d+|\d(?:[\.,-\/]?\d)*(?:\.\d+)?/g;
// Devanagari Numbers.
var rgxNumberDV = /[\u0966-\u096F]+\/[\u0966-\u096F]+|[\u0966-\u096F](?:[\.,-\/]?[\u0966-\u096F])*(?:\.[\u0966-\u096F]+)?/g;
var rgxMention = /@\w+/g;
// Latin-1 Hashtags.
var rgxHashtagL1 = /#[a-z][a-z0-9]*/gi;
// Devanagari Hashtags; include Latin-1 as well.
var rgxHashtagDV = /#[\u0900-\u0963\u0970-\u097F][\u0900-\u0963\u0970-\u097F\u0966-\u096F0-9]*/gi;
// EMail is EN character set.
var rgxEmail = /[-!#$%&'*+\/=?^\w{|}~](?:\.?[-!#$%&'*+\/=?^\w`{|}~])*@[a-z0-9](?:-?\.?[a-z0-9])*(?:\.[a-z](?:-?[a-z0-9])*)+/gi;
// Bitcoin, Ruble, Indian Rupee, Other Rupee, Dollar, Pound, Yen, Euro, Wong.
var rgxCurrency = /[₿₽₹₨$£¥€₩]/g;
// These include both the punctuations: Latin-1 & Devanagari.
var rgxPunctuation = /[’'‘’`“”"\[\]\(\){}…,\.!;\?\-:\u0964\u0965]/g;
var rgxQuotedPhrase = /"[^"]*"/g;
// NOTE: URL will support only EN character set for now.
var rgxURL = /(?:https?:\/\/)(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:[\/\w\.\-\?#=]*)*\/?/gi;
var rgxEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/g;
var rgxEmoticon = /:-?[dps\*\/\[\]{}\(\)]|;-?[/(/)d]|<3/gi;
var rgxTime = /(?:\d|[01]\d|2[0-3]):?(?:[0-5][0-9])?\s?(?:[ap]\.?m\.?|hours|hrs)/gi;
// Inlcude [Latin-1 Supplement Unicode Block](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block))
var rgxWordL1 = /[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF][a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF']*/gi;
// Define [Devanagari Unicode Block](https://unicode.org/charts/PDF/U0900.pdf)
var rgxWordDV = /[\u0900-\u094F\u0951-\u0963\u0970-\u097F]+/gi;
// Symbols go here; including Om.
var rgxSymbol = /[\u0950~@#%\^\+=\*\|\/<>&]/g;
// For detecting if the word is a potential contraction.
var rgxContraction = /'/;
// Singular & Plural possessive
var rgxPosSingular = /([a-z]+)('s)$/i;
var rgxPosPlural = /([a-z]+s)(')$/i;
// Regexes and their categories; used for tokenizing via match/split. The
// sequence is *critical* for correct tokenization.
var rgxsMaster = [
  { regex: rgxQuotedPhrase, category: 'quoted_phrase' },
  { regex: rgxURL, category: 'url' },
  { regex: rgxEmail, category: 'email' },
  { regex: rgxMention, category: 'mention' },
  { regex: rgxHashtagL1, category: 'hashtag' },
  { regex: rgxHashtagDV, category: 'hashtag' },
  { regex: rgxEmoji, category: 'emoji' },
  { regex: rgxEmoticon, category: 'emoticon' },
  { regex: rgxTime, category: 'time' },
  { regex: rgxOrdinalL1, category: 'ordinal' },
  { regex: rgxNumberL1, category: 'number' },
  { regex: rgxNumberDV, category: 'number' },
  { regex: rgxCurrency, category: 'currency' },
  { regex: rgxWordL1, category: 'word' },
  { regex: rgxWordDV, category: 'word' },
  { regex: rgxPunctuation, category: 'punctuation' },
  { regex: rgxSymbol, category: 'symbol' }
];

// Used to generate finger print from the tokens.
// NOTE: this variable is being reset in `defineConfig()`.
var fingerPrintCodes = {
  emoticon: 'c',
  email: 'e',
  emoji: 'j',
  hashtag: 'h',
  mention: 'm',
  number: 'n',
  ordinal: 'o',
  quoted_phrase: 'q', // eslint-disable-line camelcase
  currency: 'r',
  // symbol: 's',
  time: 't',
  url: 'u',
  word: 'w',
  alien: 'z'
};

// ### tokenizer
/**
 *
 * Creates an instance of {@link Tokenizer}.
 *
 * @return {Tokenizer} object conatining set of API methods for tokenizing a sentence
 * and defining configuration, plugin etc.
 * @example
 * // Load wink tokenizer.
 * var tokenizer = require( 'wink-tokenizer' );
 * // Create your instance of wink tokenizer.
 * var myTokenizer = tokenizer();
*/
var tokenizer = function () {
  // Default configuration: most comprehensive tokenization. Make deep copy!
  var rgxs = rgxsMaster.slice( 0 );
  // The result of last call to `tokenize()` is retained here.
  var finalTokens = [];
  // Returned!

  /**
   * @classdesc Tokenizer class
   * @class Tokenizer
   * @hideconstructor
   */
  var methods = Object.create( null );

  // ### manageContraction
  /**
   *
   * Splits a contractions into words by first trying a lookup in strandard
   * `contractions`; if the lookup fails, it checks for possessive in `'s` or
   * `s'` forms and separates the possesive part from the word. Otherwise the
   * contraction is treated as a normal word and no splitting occurs.
   *
   * @param {string} word that could be a potential conraction.
   * @param {object[]} tokens where the outcome is pushed.
   * @return {object[]} updated tokens according to the `word.`
   * @private
  */
  var manageContraction = function ( word, tokens ) {
    var ct = contractions[ word ];
    var matches;
    if ( ct === undefined ) {
      // Try possesive of sigular & plural forms
      matches = word.match( rgxPosSingular );
      if ( matches ) {
        tokens.push( { value: matches[ 1 ], tag: 'word' } );
        tokens.push( { value: matches[ 2 ], tag: 'word' } );
      } else {
        matches = word.match( rgxPosPlural );
        if ( matches ) {
          tokens.push( { value: matches[ 1 ], tag: 'word' } );
          tokens.push( { value: matches[ 2 ], tag: 'word' } );
        } else tokens.push( { value: word, tag: 'word' } );
      }
    } else {
      // Manage via lookup; ensure cloning!
      tokens.push( Object.assign( {}, ct[ 0 ] ) );
      tokens.push( Object.assign( {}, ct[ 1 ] ) );
      if ( ct[ 2 ] ) tokens.push( Object.assign( {}, ct[ 2 ] ) );
    }
    return tokens;
  }; // manageContraction()

  // ### tokenizeTextUnit
  /**
   *
   * Attempts to tokenize the input `text` using the `rgxSplit`. The tokenization
   * is carried out by combining the regex matches and splits in the right sequence.
   * The matches are the *real tokens*, whereas splits are text units that are
   * tokenized in later rounds! The real tokens (i.e. matches) are pushed as
   * `object` and splits as `string`.
   *
   * @param {string} text unit that is to be tokenized.
   * @param {object} rgxSplit object containing the regex and it's category.
   * @return {array} of tokens.
   * @private
  */
  var tokenizeTextUnit = function ( text, rgxSplit ) {
    // Regex matches go here; note each match is a token and has the same tag
    // as of regex's category.
    var matches = text.match( rgxSplit.regex );
    // Balance is "what needs to be tokenized".
    var balance = text.split( rgxSplit.regex );
    // The result, in form of combination of tokens & matches, is captured here.
    var tokens = [];
    // The tag;
    var tag = rgxSplit.category;
    // Helper variables.
    var aword,
        i,
        imax,
        k = 0,
        t;

    // Combine tokens & matches in the following pattern [ b0 m0 b1 m1 ... ]
    matches = ( matches ) ? matches : [];
    for ( i = 0, imax = balance.length; i < imax; i += 1 ) {
      t = balance[ i ];
      t = t.trim();
      if ( t ) tokens.push( t );
      if ( k < matches.length ) {
        if ( tag === 'word' ) {
          // Tag type `word` token may have a contraction.
          aword = matches[ k ];
          if ( rgxContraction.test( aword ) ) {
            tokens = manageContraction( aword, tokens );
          } else {
            // Means there is no contraction.
            tokens.push( { value: aword, tag: tag } );
          }
        } else tokens.push( { value: matches[ k ], tag: tag } );
      }
      k += 1;
    }

    return ( tokens );
  }; // tokenizeTextUnit()

  // ### tokenizeTextRecursively
  /**
   *
   * Tokenizes the input text recursively using the array of `regexes` and then
   * the `tokenizeTextUnit()` function. If (or whenever) the `regexes` becomes
   * empty, it simply splits the text on non-word characters instead of using
   * the `tokenizeTextUnit()` function.
   *
   * @param {string} text unit that is to be tokenized.
   * @param {object} regexes object containing the regex and it's category.
   * @return {undefined} nothing!
   * @private
  */
  var tokenizeTextRecursively = function ( text, regexes ) {
    var sentence = text.trim();
    var tokens = [];
    var i, imax;

    if ( !regexes.length ) {
      // No regex left, split on `spaces` and tag every token as **alien**.
      text.split( rgxSpaces ).forEach( function ( tkn ) {
        finalTokens.push( { value: tkn.trim(), tag: 'alien' } );
      } );
      return;
    }

    var rgx = regexes[ 0 ];
    tokens = tokenizeTextUnit( sentence, rgx );

    for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
      if ( typeof tokens[ i ] === 'string' ) {
        // Strings become candidates for further tokenization.
        tokenizeTextRecursively( tokens[ i ], regexes.slice( 1 ) );
      } else {
        finalTokens.push( tokens[ i ] );
      }
    }
  }; // tokenizeTextRecursively()

  // ### defineConfig
  /**
   *
   * Defines the configuration in terms of the types of token that will be
   * extracted by [`tokenize()`](#tokenize) method. Note by default, all types
   * of tokens will be detected and tagged automatically.
   *
   * @method Tokenizer#defineConfig
   * @param {object} config It defines 0 or more properties from the list of
   * **14** properties. A true value for a property ensures tokenization
   * for that type of text; whereas false value will mean that the tokenization of that
   * type of text will not be attempted. It also **resets** the effect of any previous
   * call(s) to the [`addRegex()`](#addregex) API.
   *
   * *An empty config object is equivalent to splitting on spaces. Whatever tokens
   * are created like this are tagged as **alien** and **`z`** is the
   * [finger print](#gettokensfp) code of this token type.*
   *
   * The table below gives the name of each property and it's description including
   * examples. The character with in paranthesis is the [finger print](#gettokensfp) code for the
   * token of that type.
   * @param {boolean} [config.currency=true] such as **$** or **£** symbols (**`r`**)
   * @param {boolean} [config.email=true] for example **john@acme.com** or **superman1@gmail.com** (**`e`**)
   * @param {boolean} [config.emoji=true] any standard unicode emojis e.g. 😊 or 😂 or 🎉 (**`j`**)
   * @param {boolean} [config.emoticon=true] common emoticons such as **`:-)`** or **`:D`** (**`c`**)
   * @param {boolean} [config.hashtag=true] hash tags such as **`#happy`** or **`#followme`** (**`h`**)
   * @param {boolean} [config.number=true] any integer, decimal number, fractions such as **19**, **2.718**
   * or **1/4** and numerals containing "**`, - / .`**", for example 12-12-1924 (**`n`**)
   * @param {boolean} [config.ordinal=true] ordinals like **1st**, **2nd**, **3rd**, **4th** or **12th** or **91st** (**`o`**)
   * @param {boolean} [config.punctuation=true] common punctuation such as **`?`** or **`,`**
   * ( token becomes fingerprint )
   * @param {boolean} [config.quoted_phrase=false] any **"quoted text"** in the sentence. _Note: its default value is **false**._ (**`q`**)
   * @param {boolean} [config.symbol=true] for example **`~`** or **`+`** or **`&`** or **`%`** or **`/`** ( token becomes fingerprint )
   * @param {boolean} [config.time=true] common representation of time such as **4pm** or **16:00 hours** (**`t`**)
   * @param {boolean} [config.mention=true] **@mention**  as in github or twitter (**`m`**)
   * @param {boolean} [config.url=true] URL such as **https://github.com** (**`u`**)
   * @param {boolean} [config.word=true] word such as **faster** or **résumé** or **prévenir** (**`w`**)
   * @return {number} number of properties set to true from the list of above 13.
   * @example
   * // Do not tokenize & tag @mentions.
   * var myTokenizer.defineConfig( { mention: false } );
   * // -> 13
   * // Only tokenize words as defined above.
   * var myTokenizer.defineConfig( {} );
   * // -> 0
  */
  var defineConfig = function ( config ) {
    if ( typeof config === 'object' && Object.keys( config ).length ) {
      rgxs = rgxsMaster.filter( function ( rgx ) {
        // Config for the Category of `rgx`.
        var cc = config[ rgx.category ];
        // Means `undefined` & `null` values are taken as true; otherwise
        // standard **truthy** and **falsy** interpretation applies!!
        return ( cc === undefined || cc === null || !!cc );
      } );
    } else rgxs = [];
    // Count normalized length i.e. ignore multi-script entries.
    const uniqueCats = Object.create( null );
    rgxs.forEach( function ( rgx ) {
      uniqueCats[ rgx.category ] = true;
    } );
    // Reset the `fingerPrintCodes` variable.
    fingerPrintCodes = {
      emoticon: 'c',
      email: 'e',
      emoji: 'j',
      hashtag: 'h',
      mention: 'm',
      number: 'n',
      ordinal: 'o',
      quoted_phrase: 'q', // eslint-disable-line camelcase
      currency: 'r',
      // symbol: 's',
      time: 't',
      url: 'u',
      word: 'w',
      alien: 'z'
    };
    return ( ( Object.keys( uniqueCats ) ).length );
  }; // defineConfig()

  // ### tokenize
  /**
   *
   * Tokenizes the input `sentence` using the configuration specified via
   * [`defineConfig()`](#defineconfig).
   * Common contractions and possessive nouns are split into 2 separate tokens;
   * for example **I'll** splits as `'I'` and `'\'ll'` or **won't** splits as
   * `'wo'` and `'n\'t'`.
   *
   * @method Tokenizer#tokenize
   * @param {string} sentence the input sentence.
   * @return {object[]} of tokens; each one of them is an object with 2-keys viz.
   * `value` and its `tag` identifying the type of the token.
   * @example
   * var s = 'For detailed API docs, check out http://winkjs.org/wink-regression-tree/ URL!';
   * myTokenizer.tokenize( s );
   * // -> [ { value: 'For', tag: 'word' },
   * //      { value: 'detailed', tag: 'word' },
   * //      { value: 'API', tag: 'word' },
   * //      { value: 'docs', tag: 'word' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'check', tag: 'word' },
   * //      { value: 'out', tag: 'word' },
   * //      { value: 'http://winkjs.org/wink-regression-tree/', tag: 'url' },
   * //      { value: 'URL', tag: 'word' },
   * //      { value: '!', tag: 'punctuation' } ]
  */
  var tokenize = function ( sentence ) {
    finalTokens = [];
    tokenizeTextRecursively( sentence, rgxs );
    return finalTokens;
  }; // tokenize()

  // ### getTokensFP
  /**
   *
   * Returns the finger print of the tokens generated by the last call to
   * [`tokenize()`](#tokenize). A finger print is a string created by sequentially
   * joining the unique code of each token's type. Refer to table given under
   * [`defineConfig()`](#defineconfig) for values of these codes.
   *
   * A finger print is extremely useful in spotting patterns present in the sentence
   * using `regexes`, which is otherwise a complex and time consuming task.
   *
   * @method Tokenizer#getTokensFP
   * @return {string} finger print of tokens generated by the last call to `tokenize()`.
   * @example
   * // Generate finger print of sentence given in the previous example
   * // under tokenize().
   * myTokenizer.getTokensFP();
   * // -> 'wwww,wwuw!'
  */
  var getTokensFP = function () {
    var fp = [];
    finalTokens.forEach( function ( t ) {
      fp.push( ( fingerPrintCodes[ t.tag ] ) ? fingerPrintCodes[ t.tag ] : t.value );
    } );
    return fp.join( '' );
  }; // getFingerprint()

  // ### addTag
  var addTag = function (name, fingerprintCode) {
    if (fingerPrintCodes[name]) {
      throw new Error( 'Tag ' + name + ' already exists' );
    }

    fingerPrintCodes[name] = fingerprintCode;
  }; // addTag()

  // ### addRegex
  /**
   * Adds a regex for parsing a new type of token. This regex can either be mapped
   * to an existing tag or it allows creation of a new tag along with its finger print.
   * The uniqueness of the [finger prints](#defineconfig) have to ensured by the user.
   *
   * *The added regex(s) will supersede the internal parsing.*
   *
   * @method Tokenizer#addRegex
   * @param {RegExp} regex the new regular expression.
   * @param {string} tag tokens matching the `regex` will be assigned this tag.
   * @param {string} [fingerprintCode=undefined] required if adding a new
   * tag; ignored if using an existing tag.
   * @return {void} nothing!
   * @example
   * // Adding a regex for an existing tag
   * myTokenizer.addRegex( /\(oo\)/gi, 'emoticon' );
   * myTokenizer.tokenize( '(oo) Hi!' )
   * // -> [ { value: '(oo)', tag: 'emoticon' },
   * //      { value: 'Hi', tag: 'word' },
   * //      { value: '!', tag: 'punctuation' } ]
   *
   * // Adding a regex to parse a new token type
   * myTokenizer.addRegex( /hello/gi, 'greeting', 'g' );
   * myTokenizer.tokenize( 'hello, how are you?' );
   * // -> [ { value: 'hello', tag: 'greeting' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'how', tag: 'word' },
   * //      { value: 'are', tag: 'word' },
   * //      { value: 'you', tag: 'word' },
   * //      { value: '?', tag: 'punctuation' } ]
   * // Notice how "hello" is now tagged as "greeting" and not as "word".
   *
   * // Using definConfig will reset the above!
   * myTokenizer.defineConfig( { word: true } );
   * myTokenizer.tokenize( 'hello, how are you?' );
   * // -> [ { value: 'hello', tag: 'word' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'how', tag: 'word' },
   * //      { value: 'are', tag: 'word' },
   * //      { value: 'you', tag: 'word' },
   * //      { value: '?', tag: 'punctuation' } ]
  */

  var addRegex = function (regex, tag, fingerprintCode) {
    if (!fingerPrintCodes[tag] && !fingerprintCode) {
      throw new Error( 'Tag ' + tag + ' doesn\'t exist; Provide a \'fingerprintCode\' to add it as a tag.' );
    } else if (!fingerPrintCodes[tag]) {
      addTag(tag, fingerprintCode);
    }

    rgxs.unshift( { regex: regex, category: tag } );
  }; // addRegex()

  // Set quoted_phrase as false becuase mostly it is not required.
  defineConfig( { quoted_phrase: false } ); // eslint-disable-line camelcase
  methods.defineConfig = defineConfig;
  methods.tokenize = tokenize;
  methods.getTokensFP = getTokensFP;
  methods.addTag = addTag;
  methods.addRegex = addRegex;
  return methods;
};

module.exports = tokenizer;

},{"./eng-contractions.js":6}],8:[function(require,module,exports){
module.exports=[
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "would",
  "should",
  "could",
  "ought",
  "i'm",
  "you're",
  "he's",
  "she's",
  "it's",
  "we're",
  "they're",
  "i've",
  "you've",
  "we've",
  "they've",
  "i'd",
  "you'd",
  "he'd",
  "she'd",
  "we'd",
  "they'd",
  "i'll",
  "you'll",
  "he'll",
  "she'll",
  "we'll",
  "they'll",
  "let's",
  "that's",
  "who's",
  "what's",
  "here's",
  "there's",
  "when's",
  "where's",
  "why's",
  "how's",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very"
]

},{}],9:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### returnIndexer

/**
 *
 * Returns an Indexer object that contains two functions. The first function `build()`
 * incrementally builds an index for each `element` using `itsIndex` — both passed as
 * parameters to it. The second function — `result()` allows accessing the index anytime.
 *
 * It is typically used with [string.soc](#stringsoc), [string.bong](#stringbong),
 * [string.song](#stringsong), and [tokens.sow](#tokenssow).
 *
 * @alias helper#returnIndexer
 * @return {indexer} used to build and access the index.
 * @example
 * var indexer = returnIndexer();
 * // -> { build: [function], result: [function] }
 */
var returnIndexer = function () {
  var theIndex = Object.create( null );
  var methods = Object.create( null );

  // Builds index by adding the `element` and `itsIndex`. The `itsIndex` should
  // be a valid JS array index; no validation checks are performed while building
  // index.
  var build = function ( element, itsIndex ) {
    theIndex[ element ] = theIndex[ element ] || [];
    theIndex[ element ].push( itsIndex );
    return true;
  }; // build()

  // Returns the index built so far.
  var result = function () {
    return theIndex;
  }; // result()

  methods.build = build;
  methods.result = result;

  return methods;
}; // index()

module.exports = returnIndexer;

},{}],10:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### returnQuotedTextExtractor

/**
 *
 * Returns a function that extracts all occurrences of every quoted text
 * between the `lq` and the `rq` characters from its argument. This argument
 * must be of type string.
 *
 * @alias helper#returnQuotedTextExtractor
 * @param {string} [lq='"'] the left quote character.
 * @param {string} [rq='"'] the right quote character.
 * @return {function} that will accept an input string argument and return an
 * array of all substrings that are quoted between `lq` and `rq`.
 * @example
 * var extractQuotedText = returnQuotedTextExtractor();
 * extractQuotedText( 'Raise 2 issues - "fix a bug" & "run tests"' );
 * // -> [ 'fix a bug', 'run tests' ]
 */
var returnQuotedTextExtractor = function ( lq, rq ) {
  var // Index variable for *for-loop*
      i,
      // Set defaults for left quote, if required.
      lq1 = ( ( lq && ( typeof lq === 'string' ) ) ? lq : '"' ),
      // Extracts its length
      lqLen = lq1.length,
      // The regular expression is created here.
      regex = null,
      // The string containing the regular expression builds here.
      rgxStr = '',
      // Set defaults for right quote, if required.
      rq1 = ( ( rq && ( typeof rq === 'string' ) ) ? rq : lq1 ),
      // Extract its length.
      rqLen = rq1.length;

  // Build `rgxStr`
  for ( i = 0; i < lqLen; i += 1 ) rgxStr += '\\' + lq1.charAt( i );
  rgxStr += '.*?';
  for ( i = 0; i < rqLen; i += 1 ) rgxStr += '\\' + rq1.charAt( i );
  // Create regular expression.
  regex = new RegExp( rgxStr, 'g' );
  // Return the extractor function.
  return ( function ( s ) {
    if ( !s || ( typeof s !== 'string' ) ) return null;
    var // Extracted elements are captured here.
        elements = [],
        // Extract matches with quotes
        matches = s.match( regex );
    if ( !matches || ( matches.length === 0 ) ) return null;
    // Collect elements after removing the quotes.
    for ( var k = 0, kmax = matches.length; k < kmax; k += 1 ) {
      elements.push( matches[ k ].substr( lqLen, matches[ k ].length - ( rqLen + lqLen ) ) );
    }
    return ( elements );
  } );
}; // returnQuotedTextExtractor()

module.exports = returnQuotedTextExtractor;

},{}],11:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### returnWordsFilter

/**
 *
 * Returns an object containing the following functions: (a) `set()`, which returns
 * a set of mapped words given in the input array `words`. (b) `exclude()` that
 * is suitable for array filtering operations.
 *
 * If the second argument `mappers` is provided as an array of maping functions
 * then these are applied on the input array before converting into a set. A
 * mapper function must accept a string as argument and return a string as the result.
 * Examples of mapper functions are typically **string** functionss of **`wink-nlp-utils`**
 * such as `string.lowerCase()`, `string.stem()` and
 * `string.soundex()`.
 *
 * @alias helper#returnWordsFilter
 * @param {string[]} words that can be filtered using the returned wordsFilter.
 * @param {function[]} [mappers=undefined] optionally used to map each word before creating
 * the wordsFilter.
 * @return {wordsFilter} object containg `set()` and `exclude()` functions for `words`.
 * @example
 * var stopWords = [ 'This', 'That', 'Are', 'Is', 'Was', 'Will', 'a' ];
 * var myFilter = returnWordsFilter( stopWords, [ string.lowerCase ] );
 * [ 'this', 'is', 'a', 'cat' ].filter( myFilter.exclude );
 * // -> [ 'cat' ]
 */
var returnWordsFilter = function ( words, mappers ) {
  var mappedWords = words;
  var givenMappers = mappers || [];
  givenMappers.forEach( function ( m ) {
    mappedWords = mappedWords.map( m );
  } );

  mappedWords = new Set( mappedWords );

  var exclude = function ( t ) {
    return ( !( mappedWords.has( t ) ) );
  }; // exclude()

  var set = function () {
    return mappedWords;
  }; // set()

  return {
    set: set,
    exclude: exclude
  };
}; // returnWordsFilter()

module.exports = returnWordsFilter;

},{}],12:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var degrees = [
  /\bm\.?\s*a\b/i,
  /\bb\.?\s*a\b/i,
  /\bb\.?\s*tech\b/i,
  /\bm\.?\s*tech\b/i,
  /\bb\.?\s*des\b/i,
  /\bm\.?\s*des\b/i,
  /\bm\.?\s*b\.?\s*a\b/i,
  /\bm\.?\s*c\.?\s*a\b/i,
  /\bb\.?\s*c\.?\s*a\b/i,
  /\bl\.?\s*l\.?\s*b\b/i,
  /\bl\.?\s*l\.?\s*m\b/i,
  /\bm\.?\s*b\.?\s*b\.?\s*s\b/i,
  /\bm\.?\s*d\b/i,
  /\bd\.?\s*m\b/i,
  /\bm\.?\s*s\b/i,
  /\bd\.?\s*n\.?\s*b\b/i,
  /\bd\.?\s*g\.?\s*o\b/i,
  /\bd\.?\s*l\.?\s*o\b/i,
  /\bb\.?\s*d\.?\s*s\b/i,
  /\bb\.?\s*h\.?\s*m\.?\s*s\b/i,
  /\bb\.?\s*a\.?\s*m\.?\s*s\b/i,
  /\bf\.?\s*i\.?\s*c\.?\s*s\b/i,
  /\bm\.?\s*n\.?\s*a\.?\s*m\.?\s*s\b/i,
  /\bb\.?\s*e\.?\s*m\.?\s*s\b/i,
  /\bd\.?\s*c\.?\s*h\b/i,
  /\bm\.?\s*c\.?\s*h\b/i,
  /\bf\.?\s*r\.?\s*c\.?\s*s\b/i,
  /\bm\.?\s*r\.?\s*c\.?\s*p\b/i,
  /\bf\.?\s*i\.?\s*a\.?\s*c\.?\s*m\b/i,
  /\bf\.?\s*i\.?\s*m\.?\s*s\.?\s*a\b/i,
  /\bp\.?\s*h\.?\s*d\b/i,
 ];

var titleNames = [ 'mr', 'mrs', 'miss', 'ms', 'master', 'er', 'dr', 'shri', 'shrimati', 'sir' ];

var titles = new RegExp( '^(?:' + titleNames.join( '|' ) + ')$', 'i' );

module.exports = {
  degrees: degrees,
  titles: titles
};

},{}],13:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
/* eslint no-underscore-dangle: "off" */
var rgx = Object.create( null );
// Remove repeating characters.
rgx.repeatingChars = /([^c])\1/g;
// Drop first character from character pairs, if found in the beginning.
rgx.kngnPairs = /^(kn|gn|pn|ae|wr)/;
// Drop vowels that are not found in the beginning.
rgx.__vowels = /(?!^)[aeiou]/g;
// Replaces `ough` in the end by 'f'
rgx.ough = /ough$/;
// Replace following 3 instances of `dg` by `j`.
rgx.dge = /dge/g;
rgx.dgi = /dgi/g;
rgx.dgy = /dgy/g;
// Replace `sch` by `sk`.
rgx.sch = /sch/g;
// Drop `c` in `sci, sce, scy`.
rgx.sci = /sci/g;
rgx.sce = /sce/g;
rgx.scy = /scy/g;
// Make 'sh' out of `tio & tia`.
rgx.tio = /tio/g;
rgx.tia = /tia/g;
// `t` is silent in `tch`.
rgx.tch = /tch/g;
// Drop `b` in the end if preceeded by `m`.
rgx.mb_ = /mb$/;
// These are pronounced as `k`.
rgx.cq = /cq/g;
rgx.ck = /ck/g;
// Here `c` sounds like `s`
rgx.ce = /ce/g;
rgx.ci = /ci/g;
rgx.cy = /cy/g;
// And this `f`.
rgx.ph = /ph/g;
// The `sh` finally replaced by `x`.
rgx.sh = /sh|sio|sia/g;
// This is open rgx - TODO: need to finalize.
rgx.vrnotvy = /([aeiou])(r)([^aeiouy])/g;
// `th` sounds like theta - make it 0.
rgx.th = /th/g;
// `c` sounds like `k` except when it is followed by `h`.
rgx.cnoth = /(c)([^h])/g;
// Even `q` sounds like `k`.
rgx.q = /q/g;
// The first `x` sounds like `s`.
rgx._x = /^x/;
// Otherwise `x` is more like `ks`.
rgx.x = /x/g;
// Drop `y` if not followed by a vowel or appears in the end.
rgx.ynotv = /(y)([^aeiou])/g;
rgx.y_ = /y$/;
// `z` is `s`.
rgx.z = /z/g;

// Export rgx.
module.exports = rgx;

},{}],14:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### amplifyNotElision
/**
 *
 * Amplifies the not elision by converting it into not; for example `isn't`
 * becomes `is not`.
 *
 * @alias string#amplifyNotElision
 * @param {string} str the input string.
 * @return {string} input string after not elision amplification.
 * @example
 * amplifyNotElision( "someone's wallet, isn't it?" );
 * // -> "someone's wallet, is not it?"
 */
var amplifyNotElision = function ( str ) {
  return str.replace( rgx.notElision, '$1 not' );
}; // amplifyNotElision()

module.exports = amplifyNotElision;

},{"./util_regexes.js":48}],15:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### bagOfNGrams
/**
 *
 * Generates the bag of ngrams of `size` from the input string. The
 * default size is 2, which means it will generate bag of bigrams by default. It
 * also has an alias **`bong()`**.
 *
 * @alias string#bagOfNGrams
 * @param {string} str the input string.
 * @param {number} [size=2] ngram size.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **unique occurrence of ngram** of `str`; and it receives the ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {object} bag of ngrams of `size` from `str`.
 * @example
 * bagOfNGrams( 'mama' );
 * // -> { ma: 2, am: 1 }
 * bong( 'mamma' );
 * // -> { ma: 2, am: 1, mm: 1 }
 */
var bagOfNGrams = function ( str, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngBOW = Object.create( null ),
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
    if ( tg.length === ng ) {
      // Call `ifn` iff its defined and `tg` is appearing for the first time;
      // this avoids multiple calls to `ifn`. Strategy applies to `song()`,
      // and `bow()`.
      if ( ( typeof ifn === 'function' ) && !ngBOW[ tg ] ) {
          ifn( tg, idx );
      }
      // Now define, if required and then update counts.
      ngBOW[ tg ] = 1 + ( ngBOW[ tg ] || 0 );
    }
  }
  return ( ngBOW );
}; // bong()

module.exports = bagOfNGrams;

},{}],16:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var helpers = require( 'wink-helpers' );
var returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );
var extractQuotedText = returnQuotedTextExtractor( '[', ']' );
// ## string

// ### composeCorpus
/**
 *
 * Generates all possible sentences from the input argument string.
 * The string s must follow a special syntax as illustrated in the
 * example below:<br/>
 * `'[I] [am having|have] [a] [problem|question]'`<br/>
 *
 * Each phrase must be quoted between `[ ]` and each possible option of phrases
 * (if any) must be separated by a `|` character. The corpus is composed by
 * computing the cartesian product of all the phrases.
 *
 * @alias string#composeCorpus
 * @param {string} str the input string.
 * @return {string[]} of all possible sentences.
 * @example
 * composeCorpus( '[I] [am having|have] [a] [problem|question]' );
 * // -> [ 'I am having a problem',
 * //      'I am having a question',
 * //      'I have a problem',
 * //      'I have a question' ]
 */
var composeCorpus = function ( str ) {
  if ( !str || ( typeof str !== 'string' ) ) return [];

  var quotedTextElems = extractQuotedText( str );
  var corpus = [];
  var finalCorpus = [];

  if ( !quotedTextElems ) return [];
  quotedTextElems.forEach( function ( e ) {
    corpus.push( e.split( '|' ) );
  } );

  helpers.array.product( corpus ).forEach( function ( e ) {
    finalCorpus.push( e.join( ' ' ) );
  } );
  return ( finalCorpus );
}; // composeCorpus()

module.exports = composeCorpus;

},{"./helper-return-quoted-text-extractor.js":10,"wink-helpers":5}],17:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### edgeNGrams
/**
 *
 * Generates the edge ngrams from the input string.
 *
 * @alias string#edgeNGrams
 * @param {string} str the input string.
 * @param {number} [min=2] size of ngram generated.
 * @param {number} [max=8] size of ngram is generated.
 * @param {number} [delta=2] edge ngrams are generated in increments of this value.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every edge ngram of `str`; and it receives the edge ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {string[]} of edge ngrams.
 * @example
 * edgeNGrams( 'decisively' );
 * // -> [ 'de', 'deci', 'decisi', 'decisive' ]
 * edgeNGrams( 'decisively', 8, 10, 1 );
 * // -> [ 'decisive', 'decisivel', 'decisively' ]
 */
var edgeNGrams = function ( str, min, max, delta, ifn, idx ) {
  var dlta = ( delta || 2 ),
      eg,
      egs = [],
      imax = Math.min( ( max || 8 ), str.length ) + 1,
      start = ( min || 2 );

  // Generate edge ngrams
  for ( var i = start; i < imax; i += dlta ) {
    eg = str.slice( 0, i );
    egs.push( eg );
    if ( typeof ifn === 'function' ) {
        ifn( eg, idx );
    }
  }
  return ( egs );
}; // edgeNGrams()

module.exports = edgeNGrams;

},{}],18:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );
var ncrgx = require( './name_cleaner_regexes.js' );

// ## string

// ### extractPersonsName
/**
 *
 * Attempts to extract person's name from input string.
 * It assmues the following name format:<br/>
 * `[<salutations>] <name part as FN [MN] [LN]> [<degrees>]`<br/>
 * Entities in square brackets are optional.
 *
 * @alias string#extractPersonsName
 * @param {string} str the input string.
 * @return {string} extracted name.
 * @example
 * extractPersonsName( 'Dr. Sarah Connor M. Tech., PhD. - AI' );
 * // -> 'Sarah Connor'
 */
var extractPersonsName = function ( str ) {
  // Remove Degrees by making the list of indexes of each degree and subsequently
  // finding the minimum and slicing from there!
  var indexes = ncrgx.degrees.map( function ( r ) {
    var m = r.exec( str );
    return ( m ) ? m.index : 999999;
  } );
  var sp = Math.min.apply( null, indexes );

  // Generate an Array of Every Elelemnt of Name (e.g. title, first name,
  // sir name, honours, etc)
  var aeen = str.slice( 0, sp ).replace( rgx.notAlpha, ' ').replace( rgx.spaces, ' ').trim().split(' ');
  // Remove titles from the beginning.
  while ( aeen.length && ncrgx.titles.test( aeen[0] ) ) aeen.shift();
  return aeen.join(' ');
}; // extractPersonsName()

module.exports = extractPersonsName;

},{"./name_cleaner_regexes.js":12,"./util_regexes.js":48}],19:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );
var trim = require( './string-trim.js' );
// ## string

// ### extractRunOfCapitalWords
/**
 *
 * Extracts the array of text appearing as Title Case or in ALL CAPS from the
 * input string.
 *
 * @alias string#extractRunOfCapitalWords
 * @param {string} str the input string.
 * @return {string[]} of text appearing in Title Case or in ALL CAPS; if no such
 * text is found then `null` is returned.
 * @example
 * extractRunOfCapitalWords( 'In The Terminator, Sarah Connor is in Los Angeles' );
 * // -> [ 'In The Terminator', 'Sarah Connor', 'Los Angeles' ]
 */
var extractRunOfCapitalWords = function ( str ) {
  var m = str.match( rgx.rocWords );
  return ( ( m ) ? m.map( trim ) : m );
}; // extractRunOfCapitalWords()

module.exports = extractRunOfCapitalWords;

},{"./string-trim.js":37,"./util_regexes.js":48}],20:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### lowerCase
/**
 *
 * Converts the input string to lower case.
 *
 * @alias string#lowerCase
 * @param {string} str the input string.
 * @return {string} input string in lower case.
 * @example
 * lowerCase( 'Lower Case' );
 * // -> 'lower case'
 */
var lowerCase = function ( str ) {
  return ( str.toLowerCase() );
}; // lowerCase()

module.exports = lowerCase;

},{}],21:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### marker
/**
 *
 * Generates `marker` of the input string; it is defined as 1-gram, sorted
 * and joined back as a string again. Marker is a quick and aggressive way
 * to detect similarity between short strings. Its aggression may lead to more
 * false positives such as `Meter` and `Metre` or `no melon` and `no lemon`.
 *
 * @alias string#marker
 * @param {string} str the input string.
 * @return {string} the marker.
 * @example
 * marker( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var marker = function ( str ) {
  var uniqChars = Object.create( null );
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    uniqChars[ str[ i ] ] = true;
  }
  return ( Object.keys( uniqChars ).sort().join('') );
}; // marker()

module.exports = marker;

},{}],22:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### ngram
/**
 *
 * Generates an array of ngrams of a specified size from the input string. The
 * default size is 2, which means it will generate bigrams by default.
 *
 * @alias string#ngram
 * @param {string} str the input string.
 * @param {number} [size=2] ngram's size.
 * @return {string[]} ngrams of `size` from `str`.
 * @example
 * ngram( 'FRANCE' );
 * // -> [ 'FR', 'RA', 'AN', 'NC', 'CE' ]
 * ngram( 'FRENCH' );
 * // -> [ 'FR', 'RE', 'EN', 'NC', 'CH' ]
 * ngram( 'FRANCE', 3 );
 * // -> [ 'FRA', 'RAN', 'ANC', 'NCE' ]
 */
var ngram = function ( str, size ) {
  var ng = ( size || 2 ),
      ngramz = [],
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
    if ( tg.length === ng ) ngramz.push( tg );
  }
  return ( ngramz );
}; // ngram()

module.exports = ngram;

},{}],23:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var phnrgx = require( './phonetize_regexes.js' );
/* eslint no-underscore-dangle: "off" */

// ## string

// ### phonetize
/**
 *
 * Phonetizes the input string using an algorithmic adaptation of Metaphone; It
 * is not an exact implementation of Metaphone.
 *
 * @alias string#phonetize
 * @param {string} word the input word.
 * @return {string} phonetic code of `word`.
 * @example
 * phonetize( 'perspective' );
 * // -> 'prspktv'
 * phonetize( 'phenomenon' );
 * // -> 'fnmnn'
 */
var phonetize = function ( word ) {
  var p = word.toLowerCase();
  // Remove repeating letters.
  p = p.replace( phnrgx.repeatingChars, '$1');
  // Drop first character of `kgknPairs`.
  if ( phnrgx.kngnPairs.test( p ) ) {
    p = p.substr( 1, p.length - 1 );
  }
  // Run Regex Express now!
  p = p
      // Change `ough` in the end as `f`,
      .replace( phnrgx.ough, 'f' )
      // Change `dg` to `j`, in `dge, dgi, dgy`.
      .replace( phnrgx.dge, 'je' )
      .replace( phnrgx.dgi, 'ji' )
      .replace( phnrgx.dgy, 'jy' )
      // Change `c` to `k` in `sch`
      .replace( phnrgx.sch, 'sk' )
      // Drop `c` in `sci, sce, scy`.
      .replace( phnrgx.sci, 'si' )
      .replace( phnrgx.sce, 'se' )
      .replace( phnrgx.scy, 'sy' )
      // Drop `t` if it appears as `tch`.
      .replace( phnrgx.tch, 'ch' )
      // Replace `tio & tia` by `sh`.
      .replace( phnrgx.tio, 'sh' )
      .replace( phnrgx.tia, 'sh' )
      // Drop `b` if it appears as `mb` in the end.
      .replace( phnrgx.mb_, 'm' )
      // Drop `r` if it preceeds a vowel and not followed by a vowel or `y`
      // .replace( rgx.vrnotvy, '$1$3' )
      // Replace `c` by `s` in `ce, ci, cy`.
      .replace( phnrgx.ce, 'se' )
      .replace( phnrgx.ci, 'si' )
      .replace( phnrgx.cy, 'sy' )
      // Replace `cq` by `q`.
      .replace( phnrgx.cq, 'q' )
      // Replace `ck` by `k`.
      .replace( phnrgx.ck, 'k' )
      // Replace `ph` by `f`.
      .replace( phnrgx.ph, 'f' )
      // Replace `th` by `0` (theta look alike!).
      .replace( phnrgx.th, '0' )
      // Replace `c` by `k` if it is not followed by `h`.
      .replace( phnrgx.cnoth, 'k$2' )
      // Replace `q` by `k`.
      .replace( phnrgx.q, 'k' )
      // Replace `x` by `s` if it appears in the beginning.
      .replace( phnrgx._x, 's' )
      // Other wise replace `x` by `ks`.
      .replace( phnrgx.x, 'ks' )
      // Replace `sh, sia, sio` by `x`. Needs to be done post `x` processing!
      .replace( phnrgx.sh, 'x' )
      // Drop `y` if it is now followed by a **vowel**.
      .replace( phnrgx.ynotv, '$2' )
      .replace( phnrgx.y_, '' )
      // Replace `z` by `s`.
      .replace( phnrgx.z, 's' )
      // Drop all **vowels** excluding the first one.
      .replace( phnrgx.__vowels, '' );

      return ( p );
}; // phonetize()

module.exports = phonetize;

},{"./phonetize_regexes.js":13}],24:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### removeElisions
/**
 *
 * Removes basic elisions found in the input string. Typical example of elisions
 * are `it's, let's, where's, I'd, I'm, I'll, I've, and Isn't` etc. Note it retains
 * apostrophe used to indicate possession.
 *
 * @alias string#removeElisions
 * @param {string} str the input string.
 * @return {string} input string after removal of elisions.
 * @example
 * removeElisions( "someone's wallet, isn't it?" );
 * // -> "someone's wallet, is it?"
 */
var removeElisions = function ( str ) {
  return ( str
            .replace( rgx.elisionsSpl, '$2' )
            .replace( rgx.elisions1, '$1' )
            .replace( rgx.elisions2, '$1' )
         );
}; // removeElisions()

module.exports = removeElisions;

},{"./util_regexes.js":48}],25:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### removeExtraSpaces
/**
 *
 * Removes leading, trailing and any extra in-between whitespaces from the input
 * string.
 *
 * @alias string#removeExtraSpaces
 * @param {string} str the input string.
 * @return {string} input string after removal of leading, trailing and extra
 * whitespaces.
 * @example
 * removeExtraSpaces( '   Padded   Text    ' );
 * // -> 'Padded Text'
 */
var removeExtraSpaces = function ( str ) {
  return ( str
            .trim()
            .replace( rgx.spaces, ' ')
         );
}; // removeExtraSpaces()

module.exports = removeExtraSpaces;

},{"./util_regexes.js":48}],26:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### removeHTMLTags
/**
 *
 * Removes each HTML tag by replacing it with a whitespace.
 *
 * Extra spaces, if required, may be removed using [string.removeExtraSpaces](#stringremoveextraspaces)
 * function.
 *
 * @alias string#removeHTMLTags
 * @param {string} str the input string.
 * @return {string} input string after removal of HTML tags.
 * @example
 * removeHTMLTags( '<p>Vive la France&nbsp;&#160;!</p>' );
 * // -> ' Vive la France  ! '
 */
var removeHTMLTags = function ( str ) {
  return ( str
            .replace( rgx.htmlTags, ' ' )
            .replace( rgx.htmlEscSeq1, ' ' )
            .replace( rgx.htmlEscSeq2, ' ' )
         );
}; // removeHTMLTags()

module.exports = removeHTMLTags;

},{"./util_regexes.js":48}],27:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### removePunctuations
/**
 *
 * Removes each punctuation mark by replacing it with a whitespace. It looks for
 * the following punctuations — `.,;!?:"!'... - () [] {}`.
 *
 * Extra spaces, if required, may be removed using [string.removeExtraSpaces](#stringremoveextraspaces)
 * function.
 *
 * @alias string#removePunctuations
 * @param {string} str the input string.
 * @return {string} input string after removal of punctuations.
 * @example
 * removePunctuations( 'Punctuations like "\'\',;!?:"!... are removed' );
 * // -> 'Punctuations like               are removed'
 */
var removePunctuations = function ( str ) {
  return str.replace( rgx.punctuations, ' ' );
}; // removePunctuations()

module.exports = removePunctuations;

},{"./util_regexes.js":48}],28:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### removeSplChars
/**
 *
 * Removes each special character by replacing it with a whitespace. It looks for
 * the following special characters — `~@#%^*+=`.
 *
 * Extra spaces, if required, may be removed using [string.removeExtraSpaces](#stringremoveextraspaces)
 * function.
 *
 * @alias string#removeSplChars
 * @param {string} str the input string.
 * @return {string} input string after removal of special characters.
 * @example
 * removeSplChars( '4 + 4*2 = 12' );
 * // -> '4   4 2   12'
 */
var removeSplChars = function ( str ) {
  return str.replace( rgx.splChars, ' ' );
}; // removeSplChars()

module.exports = removeSplChars;

},{"./util_regexes.js":48}],29:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### retainAlphaNums
/**
 *
 * Retains only apha, numerals, and removes all other characters from
 * the input string, including leading, trailing and extra in-between
 * whitespaces.
 *
 * @alias string#retainAlphaNums
 * @param {string} str the input string.
 * @return {string} input string after removal of non-alphanumeric characters,
 * leading, trailing and extra whitespaces.
 * @example
 * retainAlphaNums( ' This, text here, has  (other) chars_! ' );
 * // -> 'This text here has other chars'
 */
var retainAlphaNums = function ( str ) {
  return ( str
            .replace( rgx.notAlphaNumeric, ' ')
            .replace( rgx.spaces, ' ')
            .trim()
          );
}; // retainAlphaNums()

module.exports = retainAlphaNums;

},{"./util_regexes.js":48}],30:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
// Abbreviations with `.` but are never are EOS.
const abbrvNoEOS = Object.create( null );
abbrvNoEOS[ 'mr.' ] = true;
abbrvNoEOS[ 'mrs.' ] = true;
abbrvNoEOS[ 'ms.' ] = true;
abbrvNoEOS[ 'er.' ] = true;
abbrvNoEOS[ 'dr.' ] = true;
abbrvNoEOS[ 'miss.' ] = true;
abbrvNoEOS[ 'shri.' ] = true;
abbrvNoEOS[ 'smt.' ] = true;
abbrvNoEOS[ 'i.e.' ] = true;
abbrvNoEOS[ 'ie.' ] = true;
abbrvNoEOS[ 'e.g.' ] = true;
abbrvNoEOS[ 'eg.' ] = true;
abbrvNoEOS[ 'viz.' ] = true;
abbrvNoEOS[ 'pvt.' ] = true;
// et al.
abbrvNoEOS[ 'et.' ] = true;
abbrvNoEOS[ 'al.' ] = true;
// Mount Kailash!
abbrvNoEOS[ 'mt.' ] = true;
// Pages!
abbrvNoEOS[ 'pp.' ] = true;

const abbrvMayBeEOS = Object.create( null );
abbrvMayBeEOS[ 'inc.' ] = true;
abbrvMayBeEOS[ 'ltd.' ] = true;
abbrvMayBeEOS[ 'al.' ] = true;
// Regex to test potential End-Of-Sentence.
const rgxPotentialEOS = /\.$|\!$|\?$/;
// Regex to test special cases of "I" at eos.
const rgxSplI = /i\?$|i\!$/;
// Regex to test first char as alpha only
const rgxAlphaAt0 = /^[^a-z]/i;

// ## string

// ### sentences
/**
 *
 * Detects the sentence boundaries in the input `paragraph` and splits it into
 * an array of sentence(s).
 *
 * @alias string#sentences
 * @param {string} paragraph the input string.
 * @return {string[]} of sentences.
 * @example
 * sentences( 'AI Inc. is focussing on AI. I work for AI Inc. My mail is r2d2@yahoo.com' );
 * // -> [ 'AI Inc. is focussing on AI.',
 * //      'I work for AI Inc.',
 * //      'My mail is r2d2@yahoo.com' ]
 *
 * sentences( 'U.S.A is my birth place. I was born on 06.12.1924. I climbed Mt. Everest.' );
 * // -> [ 'U.S.A is my birth place.',
 * //      'I was born on 06.12.1924.',
 * //      'I climbed Mt. Everest.' ]
 */
var punkt = function ( paragraph ) {
  // The basic idea is to split the paragraph on `spaces` and thereafter
  // examine each word ending with an EOS punctuation for a possible EOS.

  // Split on **space** to obtain all the `tokens` in the `para`.
  const paraTokens = paragraph.split( ' ' );
  var sentenceTokens = [];
  var sentences = [];

  for ( let k = 0; k < paraTokens.length; k += 1 ) {
    // A para token.
    const pt = paraTokens[ k ];
    // A lower cased para token.
    const lcpt = pt.toLowerCase();
    if ( ( rgxPotentialEOS.test( pt ) ) && !abbrvNoEOS[ lcpt ] && ( pt.length !== 2 || rgxAlphaAt0.test( pt ) || rgxSplI.test( lcpt ) ) ) {
      // Next para token that is non-blank.
      let nextpt;
      // Append this token to the current sentence tokens.
      sentenceTokens.push( pt );
      // If the current token is one of the abbreviations that may also mean EOS.
      if ( abbrvMayBeEOS[ lcpt ] ) {
        for ( let j = k + 1; j < paraTokens.length && !nextpt; j += 1 ) {
          nextpt = paraTokens[ j ];
        }
      }
      // If no next para token or if present then starts from a Cap Letter then
      // only complete sentence and start a new one!
      if ( nextpt === undefined || ( /^[A-Z]/ ).test( nextpt ) ) {
        sentences.push( sentenceTokens.join( ' ' ) );
        sentenceTokens = [];
      }
    } else sentenceTokens.push( pt );
  }

  if ( sentenceTokens.length > 0 ) sentences.push( sentenceTokens.join( ' ' ) );

  return sentences;
}; // punkt()

module.exports = punkt;

},{}],31:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### setOfChars
/**
 *
 * Creates a set of chars from the input string `s`. This is useful
 * in even more aggressive string matching using Jaccard or Tversky compared to
 * `marker()`. It also has an alias **`soc()`**.
 *
 * @alias string#setOfChars
 * @param {string} str the input string.
 * @param {function} [ifn=undefined] a function to build index; it receives the first
 * character of `str` and the `idx` as input arguments. The `build()` function of
 * [helper.returnIndexer](#helperreturnindexer) may be used as `ifn`. If `undefined`
 * then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {string} the soc.
 * @example
 * setOfChars( 'the quick brown fox jumps over the lazy dog' );
 * // -> ' abcdefghijklmnopqrstuvwxyz'
 */
var setOfChars = function ( str, ifn, idx ) {
  var cset = new Set( str );
  if ( typeof ifn === 'function' ) {
      ifn( str[ 0 ], idx );
  }
  return ( cset );
}; // soc()

module.exports = setOfChars;

},{}],32:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### setOfNGrams
/**
 *
 * Generates the set of ngrams of `size` from the input string. The
 * default size is 2, which means it will generate set of bigrams by default.
 * It also has an alias **`song()`**.
 *
 * @alias string#setOfNGrams
 * @param {string} str the input string.
 * @param {number} [size=2] ngram size.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **unique occurrence of ngram** of `str`; and it receives the ngram and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {set} of ngrams of `size` of `str`.
 * @example
 * setOfNGrams( 'mama' );
 * // -> Set { 'ma', 'am' }
 * song( 'mamma' );
 * // -> Set { 'ma', 'am', 'mm' }
 */
var setOfNGrams = function ( str, size, ifn, idx ) {
  var ng = ( size || 2 ),
      ngSet = new Set(),
      tg;
  for ( var i = 0, imax = str.length; i < imax; i += 1 ) {
    tg = str.slice( i, i + ng );
    if ( tg.length === ng ) {
      if ( ( typeof ifn === 'function' ) && !ngSet.has( tg ) ) {
          ifn( tg, idx );
      }
      ngSet.add( tg );
    }
  }
  return ( ngSet );
}; // song()

module.exports = setOfNGrams;

},{}],33:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var sndx = require( 'wink-distance/src/soundex.js' );

// ## string

// ### soundex
/**
 *
 * Produces the soundex code from the input `word`.
 *
 * @alias string#soundex
 * @param {string} word the input word.
 * @param {number} [maxLength=4] of soundex code to be returned.
 * @return {string} soundex code of `word`.
 * @example
 * soundex( 'Burroughs' );
 * // -> 'B620'
 * soundex( 'Burrows' );
 * // -> 'B620'
 */
var soundex = function ( word, maxLength ) {
  return sndx( word, maxLength );
}; // soundex()

module.exports = soundex;

},{"wink-distance/src/soundex.js":4}],34:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### splitElisions
/**
 *
 * Splits basic elisions found in the input string. Typical example of elisions
 * are `it's, let's, where's, I'd, I'm, I'll, I've, and Isn't` etc. Note it does
 * not touch apostrophe used to indicate possession.
 *
 * @alias string#splitElisions
 * @param {string} str the input string.
 * @return {string} input string after splitting of elisions.
 * @example
 * splitElisions( "someone's wallet, isn't it?" );
 * // -> "someone's wallet, is n't it?"
 */
var splitElisions = function ( str ) {
  return ( str
            .replace( rgx.elisionsSpl, '$2 $3' )
            .replace( rgx.elisions1, '$1 $2' )
            .replace( rgx.elisions2, '$1 $2' )
         );
}; // splitElisions()

module.exports = splitElisions;

},{"./util_regexes.js":48}],35:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var winkTokenize = require( 'wink-tokenizer' )().tokenize;

// ## string

// ### tokenize
/**
 *
 * Tokenizes the input `sentence` according to the value of `detailed` flag.
 * Any occurance of `...` in the `sentence` is
 * converted to ellipses. In `detailed = true` mode, it
 * tags every token with its type; the supported tags are currency, email,
 * emoji, emoticon, hashtag, number, ordinal, punctuation, quoted_phrase, symbol,
 * time, mention, url, and word.
 *
 * @alias string#tokenize
 * @param {string} sentence the input string.
 * @param {boolean} [detailed=false] if true, each token is a object cotaining
 * `value` and `tag` of each token; otherwise each token is a string. It's default
 * value of **false** ensures compatibility with previous version.
 * @return {(string[]|object[])} an array of strings if `detailed` is false otherwise
 * an array of objects.
 * @example
 * tokenize( "someone's wallet, isn't it? I'll return!" );
 * // -> [ 'someone', '\'s', 'wallet', ',', 'is', 'n\'t', 'it', '?',
 * //      'I', '\'ll', 'return', '!' ]
 *
 * tokenize( 'For details on wink, check out http://winkjs.org/ URL!', true );
 * // -> [ { value: 'For', tag: 'word' },
 * //      { value: 'details', tag: 'word' },
 * //      { value: 'on', tag: 'word' },
 * //      { value: 'wink', tag: 'word' },
 * //      { value: ',', tag: 'punctuation' },
 * //      { value: 'check', tag: 'word' },
 * //      { value: 'out', tag: 'word' },
 * //      { value: 'http://winkjs.org/', tag: 'url' },
 * //      { value: 'URL', tag: 'word' },
 * //      { value: '!', tag: 'punctuation' } ]
 */
var tokenize = function ( sentence, detailed ) {
  var tokens = winkTokenize( sentence.replace( '...', '…' ) );
  var i;
  if ( !detailed ) {
    for ( i = 0; i < tokens.length; i += 1 ) tokens[ i ] = tokens[ i ].value;
  }

  return tokens;
}; // tokenize()

module.exports = tokenize;

},{"wink-tokenizer":7}],36:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var removeElisions = require( './string-remove-elisions.js' );
var amplifyNotElision = require( './string-amplify-not-elision.js' );
var rgx = require( './util_regexes.js' );

// ## string

// ### tokenize0
/**
 *
 * Tokenizes by splitting the input string on **non-words**. This means tokens would
 * consists of only alphas, numerals and underscores; all other characters will
 * be stripped as they are treated as separators. It also removes all elisions;
 * however negations are retained and amplified.
 *
 * @alias string#tokenize0
 * @param {string} str the input string.
 * @return {string[]} of tokens.
 * @example
 * tokenize0( "someone's wallet, isn't it?" );
 * // -> [ 'someone', 's', 'wallet', 'is', 'not', 'it' ]
 */
var tokenize0 = function ( str ) {
  var tokens = removeElisions( amplifyNotElision( str ) )
                .replace( rgx.cannot, '$1 $2' )
                .split( rgx.nonWords );
  // Check the 0th and last element of array for empty string because if
  // fisrt/last characters are non-words then these will be empty stings!
  if ( tokens[ 0 ] === '' ) tokens.shift();
  if ( tokens[ tokens.length - 1 ] === '' ) tokens.pop();
  return tokens;
}; // tokenize0()

module.exports = tokenize0;

},{"./string-amplify-not-elision.js":14,"./string-remove-elisions.js":24,"./util_regexes.js":48}],37:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### trim
/**
 *
 * Trims leading and trailing whitespaces from the input string.
 *
 * @alias string#trim
 * @param {string} str the input string.
 * @return {string} input string with leading & trailing whitespaces removed.
 * @example
 * trim( '  Padded   ' );
 * // -> 'Padded'
 */
var trim = function ( str ) {
  return ( str.trim() );
}; // trim()

module.exports = trim;

},{}],38:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### upperCase
/**
 *
 * Converts the input string to upper case.
 *
 * @alias string#upperCase
 * @param {string} str the input string.
 * @return {string} input string in upper case.
 * @example
 * upperCase( 'Upper Case' );
 * // -> 'UPPER CASE'
 */
var upperCase = function ( str ) {
  return ( str.toUpperCase() );
}; // upperCase()

module.exports = upperCase;

},{}],39:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## tokens

// ### appendBigrams
/**
 *
 * Generates bigrams from the input tokens and appends them to the input tokens.
 *
 * @alias tokens#appendBigrams
 * @param {string[]} tokens the input tokens.
 * @return {string[]} the input tokens appended with their bigrams.
 * @example
 * appendBigrams( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'he',
 * //      'acted',
 * //      'decisively',
 * //      'today',
 * //      'he_acted',
 * //      'acted_decisively',
 * //      'decisively_today' ]
 */
var appendBigrams = function ( tokens ) {
  var i, imax;
  for ( i = 0, imax = tokens.length - 1; i < imax; i += 1 ) {
    tokens.push( tokens[ i ] + '_' + tokens[ i + 1 ] );
  }
  return tokens;
}; // appendBigrams()

module.exports = appendBigrams;

},{}],40:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## tokens

// ### bigrams
/**
 *
 * Generates bigrams from the input tokens.
 *
 * @alias tokens#bigrams
 * @param {string[]} tokens the input tokens.
 * @return {string[]} the bigrams.
 * @example
 * bigrams( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ [ 'he', 'acted' ],
 * //      [ 'acted', 'decisively' ],
 * //      [ 'decisively', 'today' ] ]
 */
var bigrams = function ( tokens ) {
  // Bigrams will be stored here.
  var bgs = [];
  // Helper variables.
  var i, imax;
  // Create bigrams.
  for ( i = 0, imax = tokens.length - 1; i < imax; i += 1 ) {
    bgs.push( [ tokens[ i ], tokens[ i + 1 ] ] );
  }
  return bgs;
}; // bigrams()

module.exports = bigrams;

},{}],41:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### bagOfWords
/**
 *
 * Generates the bag of words from the input string. By default it
 * uses `word count` as it's frequency; but if `logCounts` parameter is set to true then
 * it will use `log2( word counts + 1 )` as it's frequency. It also has an alias **`bow()`**.
 *
 * @alias tokens#bagOfWords
 * @param {string[]} tokens the input tokens.
 * @param {number} [logCounts=false] a true value flags the use of `log2( word count + 1 )`
 * instead of just `word count` as frequency.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **unique occurrence of word** in `tokens`; and it receives the word and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {object} bag of words from tokens.
 * @example
 * bagOfWords( [ 'rain', 'rain', 'go', 'away' ] );
 * // -> { rain: 2, go: 1, away: 1 }
 * bow( [ 'rain', 'rain', 'go', 'away' ], true );
 * // -> { rain: 1.584962500721156, go: 1, away: 1 }
 */
var bagOfWords = function ( tokens, logCounts, ifn, idx ) {
  var bow1 = Object.create( null ),
      i, imax,
      token,
      words;
  for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
    token = tokens[ i ];
    if ( ( typeof ifn === 'function' ) && !bow1[ token ] ) {
        ifn( token, idx );
    }
    bow1[ token ] = 1 + ( bow1[ token ] || 0 );
  }
  if ( !logCounts ) return ( bow1 );
  words = Object.keys( bow1 );
  for ( i = 0, imax = words.length; i < imax; i += 1 ) {
    // Add `1` to ensure non-zero count! (Note: log2(1) is 0)
    bow1[ words[ i ] ] = Math.log2( bow1[ words[ i ] ] + 1 );
  }
  return ( bow1 );
}; // bow()

module.exports = bagOfWords;

},{}],42:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var stringPhonetize = require( './string-phonetize.js' );

// ## tokens

// ### phonetize
/**
 *
 * Phonetizes input tokens using using an algorithmic adaptation of Metaphone.
 *
 * @alias tokens#phonetize
 * @param {string[]} tokens the input tokens.
 * @return {string[]} phonetized tokens.
 * @example
 * phonetize( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'h', 'aktd', 'dssvl', 'td' ]
 */
var phonetize = function ( tokens ) {
  return tokens.map( stringPhonetize );
}; // phonetize()

module.exports = phonetize;

},{"./string-phonetize.js":23}],43:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = require( './util_regexes.js' );

// ## string

// ### propagateNegations
/**
 *
 * It looks for negation tokens in the input array of tokens and propagates
 * negation to subsequent `upto` tokens by prefixing them by a `!`. It is useful
 * in handling text containing negations during tasks like similarity detection,
 * classification or search.
 *
 * @alias tokens#propagateNegations
 * @param {string[]} tokens the input tokens.
 * @param {number} [upto=2] number of tokens to be negated after the negation
 * token. Note, tokens are only negated either `upto` tokens or up to the token
 * preceeding the **`, . ; : ! ?`** punctuations.
 * @return {string[]} tokens with negation propagated.
 * @example
 * propagateNegations( [ 'mary', 'is', 'not', 'feeling', 'good', 'today' ] );
 * // -> [ 'mary', 'is', 'not', '!feeling', '!good', 'today' ]
 */
var propagateNegations = function ( tokens, upto ) {
  var i, imax, j, jmax;
  var tkns = tokens;
  var limit = upto || 2;
  for ( i = 0, imax = tkns.length; i < imax; i += 1 ) {
    if ( rgx.negations.test( tkns[ i ] ) ) {
      for ( j = i + 1, jmax = Math.min( imax, i + limit + 1 ); j < jmax; j += 1 ) {
        // Hit a punctuation mark, break out of the loop otherwise go *upto the limit*.
        // > TODO: promote to utilities regex, after test cases have been added.
        if ( ( /[\,\.\;\:\!\?]/ ).test( tkns[ j ] ) ) break;
        // Propoage negation: invert the token by prefixing a `!` to it.
        tkns[ j ] = '!' + tkns[ j ];
      }
      i = j;
    }
  }
  return tkns;
}; // propagateNegations()

module.exports = propagateNegations;

},{"./util_regexes.js":48}],44:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var defaultStopWords = require( './dictionaries/stop_words.json' );
var words = require( './helper-return-words-filter.js' );
defaultStopWords = words( defaultStopWords );

// ## tokens

// ### removeWords
/**
 *
 * Removes the stop words from the input array of tokens.
 *
 * @alias tokens#removeWords
 * @param {string[]} tokens the input tokens.
 * @param {wordsFilter} [stopWords=defaultStopWords] default stop words are
 * loaded from `stop_words.json` located under the `src/dictionaries/` directory.
 * Custom stop words can be created using [helper.returnWordsFilter ](#helperreturnwordsfilter).
 * @return {string[]} balance tokens.
 * @example
 * removeWords( [ 'this', 'is', 'a', 'cat' ] );
 * // -> [ 'cat' ]
 */
var removeWords = function ( tokens, stopWords ) {
  var givenStopWords = ( stopWords || defaultStopWords );
  return tokens.filter( givenStopWords.exclude );
}; // removeWords()

module.exports = removeWords;

},{"./dictionaries/stop_words.json":8,"./helper-return-words-filter.js":11}],45:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var stringSoundex = require( './string-soundex.js' );

// ## tokens

// ### soundex
/**
 *
 * Generates the soundex coded tokens from the input tokens.
 *
 * @alias tokens#soundex
 * @param {string[]} tokens the input tokens.
 * @return {string[]} soundex coded tokens.
 * @example
 * soundex( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'H000', 'A233', 'D221', 'T300' ]
 */
var soundex = function ( tokens ) {
  // Need to send `maxLength` as `undefined`.
  return tokens.map( ( t ) => stringSoundex( t ) );
}; // soundex()

module.exports = soundex;

},{"./string-soundex.js":33}],46:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## string

// ### setOfWords
/**
 *
 * Generates the set of words from the input string. It also has an alias **`sow()`**.
 *
 * @alias tokens#setOfWords
 * @param {string[]} tokens the input tokens.
 * @param {function} [ifn=undefined] a function to build index; it is called for
 * every **member word of the set **; and it receives the word and the `idx`
 * as input arguments. The `build()` function of [helper.returnIndexer](#helperreturnindexer)
 * may be used as `ifn`. If `undefined` then index is not built.
 * @param {number} [idx=undefined] the index; passed as the second argument to the `ifn`
 * function.
 * @return {set} of words from tokens.
 * @example
 * setOfWords( [ 'rain', 'rain', 'go', 'away' ] );
 * // -> Set { 'rain', 'go', 'away' }
 */
var setOfWords = function ( tokens, ifn, idx ) {
  var tset = new Set( tokens );
  if ( typeof ifn === 'function' ) {
    tset.forEach( function ( m ) {
        ifn( m, idx );
    } );
  }
  return ( tset );
}; // bow()

module.exports = setOfWords;

},{}],47:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ## tokens

// ### stem
/**
 *
 * Stems input tokens using Porter Stemming Algorithm Version 2.
 *
 * @alias tokens#stem
 * @param {string[]} tokens the input tokens.
 * @return {string[]} stemmed tokens.
 * @example
 * stem( [ 'he', 'acted', 'decisively', 'today' ] );
 * // -> [ 'he', 'act', 'decis', 'today' ]
 */
var stem = function ( tokens ) {
  return tokens.map( porter2Stemmer );
}; // stem()

module.exports = stem;

},{"wink-porter2-stemmer":50}],48:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var rgx = Object.create( null );

// Matches standard english punctuations in a text.
rgx.punctuations = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\,\.\!\;\?\/\-\:]/ig;
// End Of Sentence Punctuations - useful for splitting text into sentences.
rgx.eosPunctuations = /([\.\?\!])\s*(?=[a-z]|\s+\d)/gi;

// Matches special characters: `* + % # @ ^ = ~ | \` in a text.
rgx.splChars = /[\*\+\%\#\@\^\=\~\|\\]/ig;

// Matches common english elisions including n't.
// These are special ones as 's otherwise may be apostrophe!
rgx.elisionsSpl = /(\b)(it|let|that|who|what|here|there|when|where|why|how)(\'s)\b/gi;
// Single (1) character elisions.
rgx.elisions1 = /([a-z])(\'d|\'m)\b/gi;
// Two (2) character elisions.
rgx.elisions2 = /([a-z])(\'ll|\'ve|\'re|n\'t)\b/gi;
// Sperate not elision 'nt.
rgx.notElision = /([a-z])(n\'t)\b/gi;
// Specially handle cannot
rgx.cannot = /\b(can)(not)\b/gi;

// Matches space, tab, or new line characters in text.
rgx.spaces = /\s+/ig;
// Matches anything other than space, tab, or new line characters.
rgx.notSpace = /\S/g;
// Matches alpha and space characters in a text.
rgx.alphaSpace = /[a-z\s]/ig;
// Matches alphanumerals and space characters in a text.
rgx.alphaNumericSpace = /[a-z0-9\s]/ig;
// Matches non alpha characters in a text.
rgx.notAlpha = /[^a-z]/ig;
// Matches non alphanumerals in a text.
rgx.notAlphaNumeric = /[^a-z0-9]/ig;
// Matches one or more non-words characters.
rgx.nonWords = /\W+/ig;
// Matches complete negation token
rgx.negations = /^(never|none|not|no)$/i;

// Matches run of capital words in a text.
rgx.rocWords = /(?:\b[A-Z][A-Za-z]*\s*){2,}/g;

// Matches integer, decimal, JS floating point numbers in a text.
rgx.number = /[0-9]*\.[0-9]+e[\+\-]{1}[0-9]+|[0-9]*\.[0-9]+|[0-9]+/ig;

// Matches time in 12 hour am/pm format in a text.
rgx.timeIn12HrAMPM = /(?:[0-9]|0[0-9]|1[0-2])((:?:[0-5][0-9])){0,1}\s?(?:[aApP][mM])/ig;

// Matches HTML tags - in fact any thing enclosed in angular brackets including
// the brackets.
rgx.htmlTags = /(?:<[^>]*>)/g;
// Matches the HTML Esc Sequences
// Esc Seq of type `&lt;` or `&nbsp;`
rgx.htmlEscSeq1 = /(?:&[a-z]{2,6};)/gi;
// Esc Seq of type `&#32;`
rgx.htmlEscSeq2 = /(?:&#[0-9]{2,4};)/gi;

// Tests if a given string is possibly in the Indian mobile telephone number format.
rgx.mobileIndian = /^(0|\+91)?[789]\d{9}$/;
// Tests if a given string is in the valid email format.
rgx.email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Extracts any number and text from a <number><text> format text.
// Useful in extracting value and UoM from strings like `2.7 Kgs`.
rgx.separateNumAndText = /([0-9]*\.[0-9]+e[\+\-]{1}[0-9]+|[0-9]*\.[0-9]+|[0-9]+)[\s]*(.*)/i;

// Crude date parser for a string containg date in a valid format.
// > TODO: Need to improve this one!
rgx.date = /(\d+)/ig;

// Following 3 regexes are specially coded for `tokenize()` in prepare_text.
// Matches punctuations that are not a part of a number.
rgx.nonNumPunctuations = /[\.\,\-](?=\D)/gi;
rgx.otherPunctuations = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\!\;\?\/\:]/ig;
// > TODO: Add more currency symbols here.
rgx.currency = /[\$\£\¥\€]/ig;

//
module.exports = rgx;

},{}],49:[function(require,module,exports){
//     wink-nlp-utils
//     NLP Functions for amplifying negations, managing elisions,
//     creating ngrams, stems, phonetic codes to tokens and more.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp-utils”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var porter2Stemmer = require( 'wink-porter2-stemmer' );

// ### Prepare Name Space

// Create prepare name space.
var prepare = Object.create( null );

/**
 * Helper
 * @namespace helper
 */
prepare.helper = Object.create( null );

// Words
prepare.helper.returnWordsFilter = require( './helper-return-words-filter.js' );
prepare.helper.words = prepare.helper.returnWordsFilter;
// Make better **alias** name for the `word()` function.

// Index
prepare.helper.index = require( './helper-return-indexer.js' );
// Make better **alias** name for the `index()` function.
prepare.helper.returnIndexer = prepare.helper.index;

// Return Quoted Text Extractor
prepare.helper.returnQuotedTextExtractor = require( './helper-return-quoted-text-extractor.js' );

/**
 * String
 * @namespace string
 */
prepare.string = Object.create( null );

// Lower Case
prepare.string.lowerCase = require( './string-lower-case.js' );
// Upper Case
prepare.string.upperCase = require( './string-upper-case.js' );
// Trim
prepare.string.trim = require( './string-trim.js' );
// Remove Extra Spaces
prepare.string.removeExtraSpaces = require( './string-remove-extra-spaces.js' );
// Retain Alpha-numerics
prepare.string.retainAlphaNums = require( './string-retain-alpha-nums.js' );
// Extract Person's Name
prepare.string.extractPersonsName = require( './string-extract-persons-name.js' );
// Extract Run of Capital Words
prepare.string.extractRunOfCapitalWords = require( './string-extract-run-of-capital-words.js' );
// Remove Punctuations
prepare.string.removePunctuations = require( './string-remove-punctuations.js' );
// Remove Special Chars
prepare.string.removeSplChars = require( './string-remove-spl-chars.js' );
// Remove HTML Tags
prepare.string.removeHTMLTags = require( './string-remove-html-tags.js' );
// Remove Elisions
prepare.string.removeElisions = require( './string-remove-elisions.js' );
// Split Elisions
prepare.string.splitElisions = require( './string-split-elisions.js' );
// Amplify Not Elision
prepare.string.amplifyNotElision = require( './string-amplify-not-elision' );
// Marker
prepare.string.marker = require( './string-marker.js' );
// SOC
prepare.string.soc = require( './string-soc.js' );
prepare.string.setOfChars = require( './string-soc.js' );
// NGrams
prepare.string.ngrams = require( './string-ngram.js' );
// Edge NGrams
prepare.string.edgeNGrams = require( './string-edge-ngrams.js' );
// BONG
prepare.string.bong = require( './string-bong.js' );
prepare.string.bagOfNGrams = require( './string-bong.js' );
// SONG
prepare.string.song = require( './string-song.js' );
prepare.string.setOfNGrams = require( './string-song.js' );
// Sentences
prepare.string.sentences = require( './string-sentences.js' );
// Compose Corpus
prepare.string.composeCorpus = require( './string-compose-corpus.js' );
// Tokenize0
prepare.string.tokenize0 = require( './string-tokenize0.js' );
// Tokenize
prepare.string.tokenize = require( './string-tokenize.js' );
// #### Stem
prepare.string.stem = porter2Stemmer;
// Phonetize
prepare.string.phonetize = require( './string-phonetize.js' );
// Soundex
prepare.string.soundex = require( './string-soundex.js' );

/**
 * Tokens
 * @namespace tokens
 */
prepare.tokens = Object.create( null );

// Stem
prepare.tokens.stem = require( './tokens-stem.js' );
// Phonetize
prepare.tokens.phonetize = require( './tokens-phonetize.js' );
// Soundex
prepare.tokens.soundex = require( './tokens-soundex.js' );
// Remove Words
prepare.tokens.removeWords = require( './tokens-remove-words.js' );
// BOW
prepare.tokens.bow = require( './tokens-bow.js' );
prepare.tokens.bagOfWords = require( './tokens-bow.js' );
// SOW
prepare.tokens.sow = require( './tokens-sow.js' );
prepare.tokens.setOfWords = require( './tokens-sow.js' );
// Propagate Negations
prepare.tokens.propagateNegations = require( './tokens-propagate-negations.js' );
// Bigrams
prepare.tokens.bigrams = require( './tokens-bigrams.js' );
// Append Bigrams
prepare.tokens.appendBigrams = require( './tokens-append-bigrams.js' );

// Export prepare.
module.exports = prepare;

},{"./helper-return-indexer.js":9,"./helper-return-quoted-text-extractor.js":10,"./helper-return-words-filter.js":11,"./string-amplify-not-elision":14,"./string-bong.js":15,"./string-compose-corpus.js":16,"./string-edge-ngrams.js":17,"./string-extract-persons-name.js":18,"./string-extract-run-of-capital-words.js":19,"./string-lower-case.js":20,"./string-marker.js":21,"./string-ngram.js":22,"./string-phonetize.js":23,"./string-remove-elisions.js":24,"./string-remove-extra-spaces.js":25,"./string-remove-html-tags.js":26,"./string-remove-punctuations.js":27,"./string-remove-spl-chars.js":28,"./string-retain-alpha-nums.js":29,"./string-sentences.js":30,"./string-soc.js":31,"./string-song.js":32,"./string-soundex.js":33,"./string-split-elisions.js":34,"./string-tokenize.js":35,"./string-tokenize0.js":36,"./string-trim.js":37,"./string-upper-case.js":38,"./tokens-append-bigrams.js":39,"./tokens-bigrams.js":40,"./tokens-bow.js":41,"./tokens-phonetize.js":42,"./tokens-propagate-negations.js":43,"./tokens-remove-words.js":44,"./tokens-soundex.js":45,"./tokens-sow.js":46,"./tokens-stem.js":47,"wink-porter2-stemmer":50}],50:[function(require,module,exports){
//     wink-porter2-stemmer
//     Implementation of Porter Stemmer Algorithm V2 by Dr Martin F Porter
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-porter2-stemmer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

// Implements the Porter Stemmer Algorithm V2 by Dr Martin F Porter.
// Reference: https://snowballstem.org/algorithms/english/stemmer.html

// ## Regex Definitions

// Regex definition of `double`.
var rgxDouble = /(bb|dd|ff|gg|mm|nn|pp|rr|tt)$/;
// Definition for Step Ia suffixes.
var rgxSFXsses = /(.+)(sses)$/;
var rgxSFXiedORies2 = /(.{2,})(ied|ies)$/;
var rgxSFXiedORies1 = /(.{1})(ied|ies)$/;
var rgxSFXusORss = /(.+)(us|ss)$/;
var rgxSFXs = /(.+)(s)$/;
// Definition for Step Ib suffixes.
var rgxSFXeedlyOReed = /(.*)(eedly|eed)$/;
var rgxSFXedORedlyORinglyORing = /([aeiouy].*)(ed|edly|ingly|ing)$/;
var rgxSFXatORblORiz = /(at|bl|iz)$/;
// Definition for Step Ic suffixes.
var rgxSFXyOR3 = /(.+[^aeiouy])([y3])$/;
// Definition for Step II suffixes; note we have spot the longest suffix.
var rgxSFXstep2 = /(ization|ational|fulness|ousness|iveness|tional|biliti|lessli|entli|ation|alism|aliti|ousli|iviti|fulli|enci|anci|abli|izer|ator|alli|bli|ogi|li)$/;
var rgxSFXstep2WithReplacements = [
  // Length 7.
  { rgx: /ational$/, replacement: 'ate' },
  { rgx: /ization$/, replacement: 'ize' },
  { rgx: /fulness$/, replacement: 'ful' },
  { rgx: /ousness$/, replacement: 'ous' },
  { rgx: /iveness$/, replacement: 'ive' },
  // Length 6.
  { rgx: /tional$/, replacement: 'tion' },
  { rgx: /biliti$/, replacement: 'ble' },
  { rgx: /lessli$/, replacement: 'less' },
  // Length 5.
  { rgx: /iviti$/, replacement: 'ive' },
  { rgx: /ousli$/, replacement: 'ous' },
  { rgx: /ation$/, replacement: 'ate' },
  { rgx: /entli$/, replacement: 'ent' },
  { rgx: /(.*)(alism|aliti)$/, replacement: '$1al' },
  { rgx: /fulli$/, replacement: 'ful' },
  // Length 4.
  { rgx: /alli$/, replacement: 'al' },
  { rgx: /ator$/, replacement: 'ate' },
  { rgx: /izer$/, replacement: 'ize' },
  { rgx: /enci$/, replacement: 'ence' },
  { rgx: /anci$/, replacement: 'ance' },
  { rgx: /abli$/, replacement: 'able' },
  // Length 3.
  { rgx: /bli$/, replacement: 'ble' },
  { rgx: /(.*)(l)(ogi)$/, replacement: '$1$2og' },
  // Length 2.
  { rgx: /(.*)([cdeghkmnrt])(li)$/, replacement: '$1$2' }
];
// Definition for Step III suffixes; once again spot the longest one first!
var rgxSFXstep3 = /(ational|tional|alize|icate|iciti|ative|ical|ness|ful)$/;
var rgxSFXstep3WithReplacements = [
  { rgx: /ational$/, replacement: 'ate' },
  { rgx: /tional$/, replacement: 'tion' },
  { rgx: /alize$/, replacement: 'al' },
  { rgx: /(.*)(icate|iciti|ical)$/, replacement: '$1ic' },
  { rgx: /(ness|ful)$/, replacement: '' },
];
// Definition for Step IV suffixes.
var rgxSFXstep4 = /(ement|ance|ence|able|ible|ment|ant|ent|ism|ate|iti|ous|ive|ize|al|er|ic)$/;
var rgxSFXstep4Full = /(ement|ance|ence|able|ible|ment|ant|ent|ism|ate|iti|ous|ive|ize|ion|al|er|ic)$/;
var rgxSFXstep4ion = /(.*)(s|t)(ion)$/;
// Exceptions Set I.
var exceptions1 = {
  // Mapped!
  'skis': 'ski',
  'skies': 'sky',
  'dying': 'die',
  'lying': 'lie',
  'tying': 'tie',
  'idly': 'idl',
  'gently': 'gentl',
  'ugly': 'ugli',
  'early': 'earli',
  'only': 'onli',
  'singly': 'singl',
  // Invariants!
  'sky': 'sky',
  'news': 'news',
  'atlas': 'atlas',
  'cosmos': 'cosmos',
  'bias': 'bias',
  'andes': 'andes'
};
// Exceptions Set II.
// Note, these are to be treated as full words.
var rgxException2 = /^(inning|outing|canning|herring|proceed|exceed|succeed|earring)$/;

// ## Private functions

// ### prelude
/**
 * Performs initial pre-processing by transforming the input string `s` as
 * per the replacements.
 *
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var prelude = function ( s ) {
  return ( s
            // Handle `y`'s.
            .replace( /^y/, '3' )
            .replace( /([aeiou])y/, '$13' )
            // Handle apostrophe.
            .replace( /\’s$|\'s$/, '' )
            .replace( /s\’$|s\'$/, '' )
            .replace( /[\’\']$/, '' )
         );
}; // prelude()

// ### isShort
/**
 * @param {String} s Input string
 * @return {Boolean} `true` if `s` is a short syllable, `false` otherwise
 * @private
 */
var isShort = function ( s ) {
  // (a) a vowel followed by a non-vowel other than w, x or 3 and
  // preceded by a non-vowel, **or** (b) a vowel at the beginning of the word
  // followed by a non-vowel.
  return (
    (
      (
        ( /[^aeiouy][aeiouy][^aeiouywx3]$/ ).test( s ) ||
        ( /^[aeiouy][^aeiouy]{0,1}$/ ).test( s ) // Removed this new changed??
      )
    )
  );
}; // isShort()

// ### markRegions
/**
 * @param {String} s Input string
 * @return {Object} the `R1` and `R2` regions as an object from the input string `s`.
 * @private
 */
var markRegions = function ( s ) {
  // Matches of `R1` and `R2`.
  var m1, m2;
  // To detect regions i.e. `R1` and `R2`.
  var rgxRegions = /[aeiouy]+([^aeiouy]{1}.+)/;
  m1 = rgxRegions.exec( s );
  if ( !m1 ) return ( { r1: '', r2: '' } );
  m1 = m1[ 1 ].slice( 1 );
  // Handle exceptions here to prevent over stemming.
  m1 = ( ( /^(gener|commun|arsen)/ ).test( s ) ) ? s.replace( /^(gener|commun|arsen)(.*)/, '$2') : m1;
  m2 = rgxRegions.exec( m1 );
  if ( !m2 ) return ( { r1: m1, r2: '' } );
  m2 = m2[ 1 ].slice( 1 );
  return ( { r1: m1, r2: m2 } );
}; // markRegions()

// ### step1a
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1a = function ( s ) {
  var wordPart;
  if ( rgxSFXsses.test( s ) ) return ( s.replace( rgxSFXsses, '$1ss' ) );
  if ( rgxSFXiedORies2.test( s ) ) return ( s.replace( rgxSFXiedORies2, '$1i' ) );
  if ( rgxSFXiedORies1.test( s ) ) return ( s.replace( rgxSFXiedORies1, '$1ie' ) );
  if ( rgxSFXusORss.test( s ) ) return ( s );
  wordPart = s.replace( rgxSFXs, '$1' );
  if ( ( /[aeiuouy](.+)$/ ).test( wordPart ) ) return ( s.replace( rgxSFXs, '$1' ) );
  return ( s );
}; // step1a()

// ### step1b
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1b = function ( s ) {
  var rgn = markRegions( s ),
  sd;
  // Search for the longest among the `eedly|eed` suffixes.
  if ( rgxSFXeedlyOReed.test( s ) )
    // Replace by ee if in R1.
    return ( rgxSFXeedlyOReed.test( rgn.r1 ) ? s.replace( rgxSFXeedlyOReed, '$1ee' ) : s );
  // Delete `ed|edly|ingly|ing` if the preceding word part contains a vowel.
  if ( rgxSFXedORedlyORinglyORing.test( s ) ) {
    sd = s.replace( rgxSFXedORedlyORinglyORing, '$1' );
    rgn = markRegions( sd );
    // And after deletion, return either
    return ( rgxSFXatORblORiz.test( sd ) ) ? ( sd + 'e' ) :
            // or
            ( rgxDouble.test( sd ) ) ? ( sd.replace( /.$/, '' ) ) :
              // or
              ( ( isShort( sd ) ) && ( rgn.r1 === '' ) ) ? ( sd + 'e' ) :
                // or
                sd;
  }
  return ( s );
}; // step1b()

// ### step1c
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1c = function ( s ) {
  return ( s.replace( rgxSFXyOR3, '$1i') );
}; // step1c()

// ### step2
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step2 = function ( s ) {
  var i, imax,
      rgn = markRegions( s ),
      us; // updated s.
  var match = s.match( rgxSFXstep2 );
  match = ( match === null ) ? '$$$$$' : match[ 1 ];
  if ( rgn.r1.indexOf( match ) !== -1 ) {
    for ( i = 0, imax = rgxSFXstep2WithReplacements.length; i < imax; i += 1 ) {
      us = s.replace( rgxSFXstep2WithReplacements[ i ].rgx, rgxSFXstep2WithReplacements[ i ].replacement );
      if ( s !== us ) return ( us );
    }
  }
  return ( s );
}; // step2()

// ### step3
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step3 = function ( s ) {
  var i, imax,
      rgn = markRegions( s ),
      us; // updated s.
  var match = s.match( rgxSFXstep3 );
  match = ( match === null ) ? '$$$$$' : match[ 1 ];

  if ( rgn.r1.indexOf( match ) !== -1 ) {
    for ( i = 0, imax = rgxSFXstep3WithReplacements.length; i < imax; i += 1 ) {
      us = s.replace( rgxSFXstep3WithReplacements[ i ].rgx, rgxSFXstep3WithReplacements[ i ].replacement );
      if ( s !== us ) return ( us );
    }
    if ( ( /ative/ ).test( rgn.r2 ) ) return s.replace( /ative$/, '' );
  }
  return ( s );
}; // step3()

// ### step4
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step4 = function ( s ) {
  var rgn = markRegions( s );
  var match = s.match( rgxSFXstep4Full );
  match = ( match === null ) ? '$$$$$' : match[ 1 ];
  if ( rgxSFXstep4Full.test( s ) &&  rgn.r2.indexOf( match ) !== -1 ) {
    return rgxSFXstep4.test( s ) ? s.replace( rgxSFXstep4, '' ) :
    (
      rgxSFXstep4ion.test( s ) ?
      s.replace( rgxSFXstep4ion, '$1$2') :
      s
    );
  }
  return ( s );
}; // step4()

// ### step5
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step5 = function ( s ) {
  var preceding, rgn;
  // Search for the `e` suffixes.
  rgn = markRegions( s );
  if ( ( /e$/i ).test( s ) ) {
    preceding = s.replace( /e$/, '' );
    return (
              // Found: delete if in R2, or in R1 and not preceded by a short syllable
              ( /e/ ).test( rgn.r2 ) || ( ( /e/ ).test( rgn.r1 ) && !isShort( preceding ) ) ?
              preceding : s
           );
  }
  // Search for the `l` suffixes.
  if ( ( /l$/ ).test( s ) ) {
    rgn = markRegions( s );
    // Found: delete if in R2
    return ( rgn.r2 && ( /l$/ ).test( rgn.r2 ) ? s.replace( ( /ll$/ ), 'l' ) : s );
  }
  // If nothing happens, must return the string!
  return ( s );
}; // step5()

// ## Public functions
// ### stem
/**
 *
 * Stems an inflected `word` using Porter2 stemming algorithm.
 *
 * @param {string} word — word to be stemmed.
 * @return {string} — the stemmed word.
 *
 * @example
 * stem( 'consisting' );
 * // -> consist
 */
var stem = function ( word ) {
  var str = word.toLowerCase();
  if ( str.length < 3 ) return ( str );
  if ( exceptions1[ str ] ) return ( exceptions1[ str ] );
  str = prelude( str );
  str = step1a( str );

  if ( !rgxException2.test( str ) ) {
    str = step1b( str );
    str = step1c( str );
    str = step2( str );
    str = step3( str );
    str = step4( str );
    str = step5( str );
  }

  str = str.replace( /3/g , 'y' );
  return ( str );
}; // stem()

// Export stem function.
module.exports = stem;

},{}],51:[function(require,module,exports){
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

},{"wink-bm25-text-search":3,"wink-bm25-text-search/runkit/get-spotted-terms.js":1,"wink-bm25-text-search/sample-data/demo-data-for-wink-bm25.json":2,"wink-nlp-utils":49}]},{},[51]);
