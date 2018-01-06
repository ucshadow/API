import CacheFunctions from './CacheFunctions';
import {localCache} from './LocalCache';
import {path} from '../SmallComponents/Path';

/**
 * Wrapper for the fetch function. It fetches data from the server or from the local cached
 * Once fetched, the data is passed to a function that updates the state for the specific Component
 * @param stateName {string} the React state name to be updated (each component has it's own state name)
 * @param cacheCheck {string, int} the identifier for the required data
 * @param url {string} if the data is not present locally, the url is used to perform a fetch from the server
 * @param callback {function} the method that updates the specific Component state with data
 * @returns {*} calls the callback method with the data
 */
export default function provider(stateName, cacheCheck, url, callback) {
  let obj = {};
  if (CacheFunctions.isCached(cacheCheck)) {
    obj[stateName] = CacheFunctions.getFromCache(cacheCheck);
    return callback(obj)
  }
  fetch(path + url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      obj[stateName] = res;
      localCache.push({id_: cacheCheck, data: res});
      return callback(obj);
    })
}