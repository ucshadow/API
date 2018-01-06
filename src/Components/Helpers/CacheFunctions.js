import {localCache} from './LocalCache';
import {heroCache} from './HeroCache';

/**
 * server data is stored locally, once a fetch is performed, if the same data is needed again
 * it will be taken from the local copy
 */
export default class CacheFunctions {

  // toDo: maybe clear the cache once in a while

  /**
   * Checks if some data is stored locally
   * @param id_ {string, int} the identifier for the data
   * @returns {boolean} data is stored
   */
  static isCached = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if all heroes are cached locally.
   * @returns {boolean} all heroes are cached
   */
  static areHeroesCached = () => {
    return heroCache.length > 0;
  };

  /**
   * Gets the cached data
   * @param id_ {string, int} the identifier for the data
   */
  static getFromCache = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return localCache[i].data;
      }
    }
  };

}