import CacheFunctions from "./CacheFunctions";
import {localCache} from "./LocalCache";
import {path} from "../SmallComponents/Path";

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