import _curry2 from './internal/_curry2';
import _isString from './internal/_isString';
import _isArrayLike from './internal/_isArrayLike';


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

var nth = _curry2(function nth(offset, list) {

  if (_isString(list)) {
    var idx = offset < 0 ? list.length + offset : offset;
    return list.charAt(idx);
  }

  if (_isArrayLike(list)) {
    var idx = offset < 0 ? list.length + offset : offset;
    return list[idx];
  }

  if (list[symIterator] != null) {
    var iter = list[symIterator]();
    var step = iter.next();
    for(var i=0; i < offset && !step.done; i++) {
      step = iter.next();
    }
    return step.value;
  }

  return undefined;
});

export default nth;
