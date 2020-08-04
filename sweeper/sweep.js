const gameBox = document.getElementsByClassName('grid');
let width = 10;
let bumbNumber = 10;
let flag = 0;

let grids = [];
function addFlag(grid) {
    if(!grid.classList.contains('checked') && (flag < bumbNumber)){
        if (!grid.classList.contains('flags')) {
            grid.classList.add('flags');
            flag ++ 
            gameWin();
        }
    }
        else{
            grid.classList.remove('flags');
            flag --
        }
 }

function reStart() {
    // 
    location.reload();
    // const btn = document.querySelector('#resbtn');
    // gameBox[0].innerHTML = '';
    // console.log(gameBox);
    // let grids = [];
    // createMap();
}
// const btn = document.querySelector('#resbtn');
// btn.addEventListener('click',createMap())
//  生成随机炸弹
function randomBomb() {
    let bombArray = new Array(bumbNumber).fill('bomb');
    let nomalArray = new Array(width * width - bumbNumber).fill('nomal');
    gameArray = nomalArray.concat(bombArray);
    // sort用法
    // gameArray.sort(() => Math.random() - 0.5);
    return shuffle(gameArray);
    // console.log(gameArray)
    // ;
}
// Fisher–Yatess算法 洗牌算法
function shuffle(array) {
    let i = array.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
}

function createMap() {
    const addBomb = randomBomb();
    for(i = 0 ;i < width * width;i++){
        const grid = document.createElement('div');
        grid.setAttribute('id',i);
        gameBox[0].appendChild(grid);  
        grid.setAttribute('class', addBomb[i]);
        grids.push(grid);
        // console.log(grids)
        grid.addEventListener('click',(e) => {click(grid)});
        grid.oncontextmenu = function(e){
            e.preventDefault();
            addFlag(grid);
        }
    }
    // 统计地雷数
    for(i = 0 ;i < width * width;i++){
        let num = 0;
        const isLeftEdge = (i % width === 0);
        const isRightEdge = (i % width === width -1);
        if(grids[i].classList.contains('nomal')){
            // 左
            if(!isLeftEdge && grids[i - 1].classList.contains('bomb')) num++ 
            // 上
            if(i > (width - 1) && grids[i - width].classList.contains('bomb')) num++
            // 右
            if(!isRightEdge && grids[i + 1].classList.contains('bomb')) num++
            // 下
            if(i< width * width - width && grids[i + width].classList.contains('bomb')) num++
            // 左上
            if(!isLeftEdge && i > width - 1 &&  grids[i - width - 1].classList.contains('bomb')) num++
            //右上
            if(!isRightEdge && i > width - 1 &&  grids[i - width + 1].classList.contains('bomb')) num++
            //左下
            if(!isLeftEdge && i < width * width - width &&  grids[i + width - 1].classList.contains('bomb')) num++
            // 右下
            if(!isRightEdge && i < width * width - width &&  grids[i + width + 1].classList.contains('bomb')) num++
            grids[i].setAttribute('num', num);
        }
    }
}
function click(grid){
    let currentId = grid.id;
    if(grid.classList.contains('bomb')){
        gameOver();
    }
    if (grid.classList.contains('checked') || grid.classList.contains('flags') ) return 
    if(grid.classList.contains('nomal')){
        let num = grid.getAttribute('num');
        if (num != 0){
            if (num == 1) grid.classList.add('one')
            if (num == 2) grid.classList.add('two')
            if (num == 3) grid.classList.add('three')
            if (num == 4) grid.classList.add('four')
            if (num == 5) grid.classList.add('five')
            if (num == 6) grid.classList.add('six')
            if (num == 7) grid.classList.add('seven')
            if (num == 8) grid.classList.add('eight')
            grid.innerHTML = num;
        }else{
            checkNext(grid, currentId);   
        }  
    grid.classList.replace('nomal', 'checked');
    }
}  
function gameOver(){
    const bomb = document.querySelectorAll('.bomb');
    grids.forEach((e) =>{e.classList.replace('nomal', 'checked')})
    bomb.forEach((e) => {e.classList.add('bombshow', 'checked')})
}
function gameWin(){
    let matches = 0;
    for (let i = 0; i < grids.length; i++) {
      if (grids[i].classList.contains('flags') && grids[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bumbNumber) {
        gameBox[0].innerHTML = 'YOU WIN!'}
    }
}

function checkNext(grid, currentId) {
    setTimeout(() => {
        const isLeftEdge = (currentId % width == 0);
    const isRightEdge = (currentId % width == width - 1);
    // 左边检测
    if (!isLeftEdge){
        const newId = grids[parseInt(currentId) - 1].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 右边检测
    if (!isRightEdge){
        const newId = grids[parseInt(currentId) + 1].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 上边检测
    if (parseInt(currentId) > width - 1){
        const newId = grids[parseInt(currentId) - width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 下边检测
    if (parseInt(currentId) < (width * width - width) ){
        const newId = grids[parseInt(currentId) + width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 左上检测
    if (!isLeftEdge && parseInt(currentId) > width - 1 ){
        const newId = grids[parseInt(currentId) - 1 - width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 右上检测
    if (!isRightEdge && parseInt(currentId) > width - 1){
        const newId = grids[parseInt(currentId) + 1 - width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 左下检测
    if (!isLeftEdge && parseInt(currentId) < (width * width - width)){
        const newId = grids[parseInt(currentId) - 1 + width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }
    // 右下检测
    if (!isRightEdge && parseInt(currentId) < (width * width - width)){
        const newId = grids[parseInt(currentId) + 1 + width].id;
        const newGrid = document.getElementById(newId);
        click(newGrid);
    }}, 10)    
}

createMap();
