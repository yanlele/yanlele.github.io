/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:15
 */
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for(let i = 0;i<=2;i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if(bird.top>pencil.bottom || bird.bottom< pencil.top || bird.right< pencil.left || bird.left>pencil.right) {
            s = true;
        }
        return !s;
    }

    // 判断小鸟装机地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        // 地板的装机判断
        if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true;
            console.log('撞击地板');
        }

        // 小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0]+ birds.birdsWidth[0]
        };

        // 创建铅笔边框模型
        const length = pencils.length;
        for (let i =0;i<length;i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞击水管');
                this.isGameOver = true;
            }
        }

        // 加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
            score.isScore = false;
            score.scoreNumber ++;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();

                // 铅笔回收的时候，就可以去开启积分
                this.dataStore.get('score').isScore = true;
            }

            if(pencils[0].x<=(DataStore.getInstance().canvas.width - pencils[0].width)/2 && pencils.length === 2) {
                this.createPencil()
            }

            this.dataStore.get('pencils').forEach(function(value) {
                value.draw();
            });

            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());        // 循环执行
            this.dataStore.put('timer', timer);
            // cancelAnimationFrame(this.dataStore.get('timer'));          // 这个函数可以终止动画循环
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }

    }
}