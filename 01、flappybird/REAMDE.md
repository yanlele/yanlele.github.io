# bird-small-game
微信小游戏


小程序踩坑：

1、首先小程序是不认识 document.getElementById('game_canvas')
要改为 wx.createCanvas();

2、canvas创建图片new Image() 要改为 wx.createImage();

3、wx不认识window对象和document对象；

4、canvas.addEventListener 这个也不能用了
改为用这个： wx.onTouchStart(function callback)