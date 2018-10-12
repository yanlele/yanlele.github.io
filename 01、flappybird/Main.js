/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:16
 */
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Bird} from "./js/player/Bird.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');

        // 初始化dataStore
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map=>this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        //　第一次加载完成的时候要给dataStore赋予一些常量的值, 放在这里是不希望销毁map的时候，一起销毁了
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;

        this.init();

    }

    init() {
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Bird)
            .put('score', Score)
            .put('startButton', StartButton);
        this.registerEvent();
        // 要在游戏开始之前创建
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e=>{
            e.preventDefault();
            if(this.director.isGameOver) {
                console.log('游戏重新开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }
}