/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:12
 */
import {DataStore} from "../base/DataStore.js";

// 积分器
export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;

        // 因为canvas 刷新很快，需要一个变量控制加分，一次只加一次
        this.isScore = true
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbce';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width/2,
            DataStore.getInstance().canvas.height/18,
            1000
        )
    }
}