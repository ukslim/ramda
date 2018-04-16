var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

function Reducible(arr) {
  this.arr = arr;
}

Reducible.prototype.reduce = function(f, init) {
  var acc = init;
  for (var i = 0; i < this.arr.length; i += 1) {
    acc = f(acc, this.arr[i]);
  }
  return acc;
};

Reducible.prototype[symIterator] = function() {
  var a = this.arr;
  return {
    _pos: 0,

    next: function() {
      if (this._pos < a.length) {
        var v = a[this._pos];
        this._pos += 1;
        return {
          value: v,
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
};

module.exports = Reducible;
