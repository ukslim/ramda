var R = require('..');
var eq = require('./shared/eq');
var Reducible = require('./shared/Reducible');

describe('reduce', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('folds simple functions over arrays with the supplied accumulator', function() {
    eq(R.reduce(add, 0, [1, 2, 3, 4]), 10);
    eq(R.reduce(mult, 1, [1, 2, 3, 4]), 24);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.reduce(add, 0, obj), 'override');
    eq(R.reduce(add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.reduce(add, 0, []), 0);
    eq(R.reduce(mult, 1, []), 1);
    eq(R.reduce(R.concat, [], []), []);
  });

  it('Prefers the use of the iterator of an object over reduce (and handles short-circuits)', function() {
    var xf = R.take(2);
    var apendingT = { };
    apendingT['@@transducer/result'] = R.identity;
    apendingT['@@transducer/step'] = R.flip(R.append);

    var rfn = xf(apendingT);
    var list = new Reducible([1, 2, 3, 4, 5, 6]);

    eq(R.reduce(rfn, [], list), [1, 2]);
  });
});
