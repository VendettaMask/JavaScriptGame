# JavaScript游戏练习
## 扫雷游戏
### 演示
[演示地址](http://test.vonallen.net/sweeper/)
### 上手指南
本文讲帮助你理解创建扫雷游戏中的关键步骤，具体细节请参考下述章节。
### 基础要求
- html基础语法
- javascript基础语法
- css基础语法
### 关键步骤
#### 创建游戏基础
```js
for(i = 0 ;i < width * width;i++){
        const grid = document.createElement('div');
        grid.setAttribute('id',i);
        gameBox[0].appendChild(grid); 
```
循环创建100个`<div>`作为游戏运行的基础，并添加id用以选择
#### 生成雷以及空白块
```js
let bombArray = new Array(bumbNumber).fill('bomb');
let nomalArray = new Array(width * width - bumbNumber).fill('nomal');
```
创建两个不同的数组，一个数组90个元素作为空白块，另一个元素10个块作为雷，使用洗牌算法混合
#### 对雷周围循环统计得到数字
判断一个格子周围8个格子中有没有雷，有的话数目加1，由于采用非数组方法，因此需要注意左右上下边界的判断，容易出现误判
```
// 左
 if(!isLeftEdge && grids[i - 1].classList.contains('bomb')) num++ 
 ```
 #### 创建点击函数，讲点击函数附加到每一个格子上
 ```
 function click(){
 }
 ```
 这时候能实现对格子的点击
 #### 判断点击是不是雷
 ```
  if(grid.classList.contains('bomb')){
        gameOver();
    }
 ```
 
 是雷结束游戏，不是雷显示周围有多少颗雷
 
 自动点开可以通过对周围的8个位置进行点击循环，并判断是不是雷，不是雷自动点开并继续判断周围8个点，遇到雷和非0块的时候停止
 #### 添加旗帜
 ```
 oncontextmenu = function(e){
            e.preventDefault();
 ```
 检测鼠标右键点击事件并阻止默认，判断原位置有没有旗帜，没有就附加`flag`属性,有就消除属性
 #### 胜负检测
 循环检测所有的块，如果每一个雷同时具有`flag`和`bomb`属性，说明游戏胜利
 
 
