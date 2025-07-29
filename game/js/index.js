const bigBox = document.querySelector("#big-box");
// 游戏状态管理
let currentPlayer = 'black'; // 'black' 或 'white'

// 设置网格布局（14行14列）
bigBox.style.gridTemplateColumns = 'repeat(14, 1fr)';
bigBox.style.gridTemplateRows = 'repeat(14, 1fr)';

// 创建小盒子
const totalBoxes = 14 * 14;
for (let i = 0; i < totalBoxes; i++) {
    const smallBox = document.createElement('div');
    smallBox.className = 'small-box';
    bigBox.appendChild(smallBox);
}

// 获取黑棋和白棋容器
const star1 = document.querySelector("#Bblack");
const star2 = document.querySelector("#Bwhite");

// 设置网格布局
star1.style.gridTemplateColumns = 'repeat(15, 1fr)';
star1.style.gridTemplateRows = 'repeat(15, 1fr)';
star2.style.gridTemplateColumns = 'repeat(15, 1fr)';
star2.style.gridTemplateRows = 'repeat(15, 1fr)';

// 创建棋盘状态数组 (15x15)
const boardState = Array(15).fill().map(() => Array(15).fill(null));

// 创建黑棋子布局
const totalBoxesblack = 15 * 15;
for (let i = 0; i < totalBoxesblack; i++) {
    const row = Math.floor(i / 15);
    const col = i % 15;

    const blackBox = document.createElement('div');
    blackBox.className = 'big-black';
    blackBox.dataset.row = row;
    blackBox.dataset.col = col;

    const innerBlack = document.createElement('div');
    innerBlack.className = 'black';
    blackBox.appendChild(innerBlack);

    star1.appendChild(blackBox);
}

// 创建白棋子布局
const totalBoxeswhite = 15 * 15;
for (let i = 0; i < totalBoxeswhite; i++) {
    const row = Math.floor(i / 15);
    const col = i % 15;

    const whiteBox = document.createElement('div');
    whiteBox.className = 'big-white';
    whiteBox.dataset.row = row;
    whiteBox.dataset.col = col;

    const innerWhite = document.createElement('div');
    innerWhite.className = 'white';
    whiteBox.appendChild(innerWhite);

    star2.appendChild(whiteBox);
}

// 添加点击事件处理函数
function handleBoardClick(event) {
    const target = event.target;
    const container = target.closest('.big-black, .big-white');

    if (!container) return;

    const row = parseInt(container.dataset.row);
    const col = parseInt(container.dataset.col);

    // 检查位置是否已被占用
    if (boardState[row][col] !== null) {
        console.log('位置已被占用');
        return;
    }

    // 检查是否是当前玩家的回合
    const isBlack = container.classList.contains('big-black');
    if ((isBlack && currentPlayer !== 'black') || (!isBlack && currentPlayer !== 'white')) {
        console.log('不是当前玩家的回合');
        return;
    }

    // 更新棋盘状态
    boardState[row][col] = currentPlayer;

    // 显示棋子
    const stone = container.querySelector('.black, .white');
    if (stone) {
        stone.classList.add('show');
    }
    // 在handleBoardClick函数内，显示棋子后添加胜利检查
    if (checkWin(row, col, currentPlayer)) {
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '黑棋' : '白棋'}获胜！`);
            resetGame();
        }, 10);
        return;
    }

    // 切换玩家
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';

    // 更新禁用状态
    if (currentPlayer === 'black') {
        star1.classList.remove('disable-clicks');
        star2.classList.add('disable-clicks');
    } else {
        star1.classList.add('disable-clicks');
        star2.classList.remove('disable-clicks');
    }

    
}

// 添加事件监听器
star1.addEventListener('click', handleBoardClick);
star2.addEventListener('click', handleBoardClick);

// 初始禁用状态
star2.classList.add('disable-clicks'); // 初始黑棋先行



// 在现有代码最后添加以下函数
function checkWin(row, col, player) {
    // 检查方向：水平、垂直、对角线
    const directions = [
        [0, 1],  // 水平
        [1, 0],  // 垂直
        [1, 1],  // 对角线
        [1, -1]  // 反对角线
    ];

    for (const [dx, dy] of directions) {
        let count = 1;

        // 正向检查
        for (let i = 1; i < 5; i++) {
            const r = row + dx * i;
            const c = col + dy * i;
            if (r >= 0 && r < 15 && c >= 0 && c < 15 && boardState[r][c] === player) {
                count++;
            } else {
                break;
            }
        }

        // 反向检查
        for (let i = 1; i < 5; i++) {
            const r = row - dx * i;
            const c = col - dy * i;
            if (r >= 0 && r < 15 && c >= 0 && c < 15 && boardState[r][c] === player) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) return true;
    }
    return false;
}

function resetGame() {
    // 重置棋盘状态
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            boardState[i][j] = null;
        }
    }

    // 隐藏所有棋子
    document.querySelectorAll('.black.show, .white.show').forEach(stone => {
        stone.classList.remove('show');
    });

    // 重置玩家和禁用状态
    currentPlayer = 'black';
    star1.classList.remove('disable-clicks');
    star2.classList.add('disable-clicks');
}


