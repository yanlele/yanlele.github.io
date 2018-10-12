/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:13
 */
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class BackGround extends Sprite {
    constructor() {
        const image = Sprite.getImage('background');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
    }
}