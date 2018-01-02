import {localCache} from "./LocalCache";
import {heroCache} from "./HeroCache";

export default class CacheFunctions {

  // toDo: maybe clear the cache once in a while

  static isCached = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return true;
      }
    }
    return false;
  };

  static areHeroesCached = () => {
    return heroCache.length > 0;
  };

  static getFromCache = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return localCache[i].data;
      }
    }
  };

}