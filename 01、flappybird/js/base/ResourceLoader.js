/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:10
 */
import {Resources} from "./Resources.js";


// 资源文件加载器，确保在canvas完成后才进行渲染
export class ResourceLoader {
    constructor() {
        this.map = new Map(Resources);
        for(let [key, value] of this.map) {
            const image = new Image();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0 ;
        for(let value of this.map.values()) {
            value.onload = ()=> {
                loadedCount++;
                if(loadedCount>=this.map.size) {
                    callback(this.map)
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}