/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:14
 */
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class UpPencil extends Pencil{
    constructor(top) {
        const image = Sprite.getImage('pencilUp');
        super(image, top)
    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}