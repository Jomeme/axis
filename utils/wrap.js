/**
 * Used to elegantly handle synchronous and asynchronous errors from within a request.
 * The caveat is all asynchronous codes within this wrapper must return Promise.
 *
 * @param {Promise} fn
 * @returns {void} Nothing
 */
 module.exports = (fn) => (...args) => fn(...args).catch(args[2]);
