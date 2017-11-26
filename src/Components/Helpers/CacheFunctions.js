import {localCache} from "./LocalCache";
import {heroCache} from "./HeroCache";

export default class CacheFunctions {

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

  static getFromHeroCache = (id_) => {
    for (let i = 0; i < heroCache[0].length; i++) {
      if (heroCache[0][i].id === id_ * 1) { // type conversion lol
        return heroCache[0][i];
      }
    }
  }

}