/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:13
 */
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class StartButton extends Sprite{
    constructor() {
        const image = Sprite.getImage('startButton');
        super(
            image,
            0,0,
            image.width, image.height,
            (DataStore.getInstance().canvas.width - image.width)/2, (DataStore.getInstance().canvas.height - image.height)/2.5,
            image.width, image.height
        );
    }
}