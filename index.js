const blockBox = document.querySelector('.block_box');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const best_el = document.querySelector('.best_el');
const score = document.querySelector('.score');
const moveSound = document.querySelector('.move_sound');
const menuSound = document.querySelector('.menu_sound');
let blocks = [];
let oldBlocks = [];
let maxNum = 2;
let scoreNum = 0;
let oldscoreNum = 0;
let newscoreNum = 0;
let t_open = false;
let b_open = false;
let l_open = false;
let r_open = false;
let timeout = 300;
let isHanzi = false;
const Hanzi = ['壹', '貳', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾貳', '拾叁', '拾肆', '拾伍', '拾陆', '拾柒']
const color0 = ['#92F4F3', '#00DCF4', '#01A7F5', '#729FFC', '#0078E1', '#2E5093', '#0341E4', '#5F56DE', '#23426f',
    '#582b9e', '#002dff', '#8f40be', '#cf95f1', '#a883be', '#430469'];
const color1 = ['#FDB5C3', '#F48CB1', '#FE7694', '#FE5CB1', '#E24289', '#E2436C', '#FE2852', '#C70048', '#9a3145',
    '#733d47', '#bf4eb2', '#ca4343', '#f59999', '#ff72bb', '#c985c4'];
const color2 = ['#AED582', '#8BC24A', '#73D572', '#42BD41', '#259B23', '#097F05', '#548B2E', '#33691E', '#4e860e',
    '#76b582', '#26cd46', '#07972c', '#0a6121', '#41704e', '#61a23a'];
const color3 = ['#EE251D', '#EF251D', '#C30000', '#C30001', '#FE3D3E', '#FE3D3E', '#D54949', '#D74C4A', '#bc4444',
    '#EE251D', '#EF251D', '#C30000', '#C30001', '#FE3D3E', '#bc4444'];
const color4 = []
const colors = [color0, color1, color2, color3, color4];
let colorArr = color0;
let speedClass = getSpeed();

const srcs = ['', './钢琴88音/c4.mp3', './钢琴88音/d4.mp3', './钢琴88音/e4.mp3', './钢琴88音/f4.mp3', './钢琴88音/g4.mp3', './钢琴88音/a4.mp3', './钢琴88音/b4.mp3', './钢琴88音/c4.mp3'];
const low = ['', './钢琴88音/c3.mp3', './钢琴88音/d3.mp3', './钢琴88音/e3.mp3', './钢琴88音/f3.mp3', './钢琴88音/g3.mp3', './钢琴88音/a3.mp3', './钢琴88音/b3.mp3', './钢琴88音/c3.mp3'];
const high = ['', './钢琴88音/c5.mp3', './钢琴88音/d5.mp3', './钢琴88音/e5.mp3', './钢琴88音/f5.mp3', './钢琴88音/g5.mp3', './钢琴88音/a5.mp3', './钢琴88音/b5.mp3', './钢琴88音/c5.mp3'];
const music2 = document.querySelector('.music2');
const music1 = document.querySelector('.music1');
const littleStar = [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1, 5, 5, 4, 4, 3, 3, 2, 5, 5, 4, 4, 3, 3, 2];
const chongerfei = [3, 3, 3, 4, 5, '3-', 2, 2, 1, 1, 1, 2, 3, '3-', '.7', '.7', '.6', 3, 2, '.6', 3, 2, '.6', 3, 2, 1, 1, 3, 2, 5, 4, '3-', 3, '2-', 2, 5, 4, 3, 4, 5, 3, 2, 1, '.6', 3, 2, 1, '.5', 2, 1, 1, 4, 3, 4, 3, 1, 4, 3, 4, 3, 1, 2, 1]
const OdeToJoy = [3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 2, 3, 1, 2, 3, 4, 3, 1, 2, 3, 4, 3, 2, 1, 2, '.5', 3, 3, 3, 4, 5, 5, 4, 3, 4, 2, 1, 1, 2, 3, 3, 1, 1]
const twoTigers = [1, 2, 3, 1, 1, 2, 3, 1, 3, 4, 5, 3, 4, 5, 5, 6, 5, 4, 3, 1, 5, 6, 5, 4, 3, 1, 1, '.5', 1, 1, '.5', 1]
const songbie = [5, '3-', 5, '1.', 7, 6, '1.', 5, 5, '1-', 2, 3, '2-', 1, 2, 5, '3-', 5, '1.', 7, 6, '1.', 5, 5, '2-', 3, 4, '.7', 1, 6, '1.', '1.', 7, '6-', 7, '1.', '6-', 7, '1.', '6-', 5, '3-', 1, 2, 5, '3-', 5, '1.', 7, 6, '1.', 5, 5, '2-', 3, 4, '.7', 1,]
const qifengle = [2, 1, 2, 1, 2, 3, 5, '3-', 2, 2, 1, 2, 1, 2, 3, 2, 1, '.5', 2, 1, 2, 1, 2, 3, 5, '3-', 2, 2, 3, 2, '1-', 2, 2, 2, 1, 2, 1, 2, 3, 5, '3-', 2, 2, 3, 2, '1-', '.6', '.6', 3, 2, 1, 2, 1, 3, 2, 1, 2, 1, '.5', 3, 2, 1, 2, 1, 1, 2, 3, 1, 6, 5, '6-', 6, 1, 7, 6, '7-', 7, 7, 6, '7-', 7, 3, '1.', '2.', '1.-', 7, 6, 5, 6, 5, '6-', 6, 5, 6, 5, 6, 5, '2-', 2, '5-', 3, 3, 1, 2, 3, 1, 6, 5, '6-', 6, 1, 7, 6, '7-', 7, 7, 6, '7-', 7, 3, '1.', '2.', '1.-', 7, 6, 5, 6, '3.', '3.-', '3.', 5, 6, '3.', '3.-', '3.', '5-', 6, 6]
const xiyangyang = ['1.', 6, '1.', '2.', '1.', '1.', 5, 5, 5, 5, '1.', '1.', 5, 5, 3, 5, 5, 5, 6, '1.', '1.', 6, '1.', '3.', '1.', 6, '1.', '1.', 5, '1.', '1.', 6, '1.', '1.', '2.', '2.', '1.', 5, 5, 3, 5, 5, 5, 6, '1.', '1.', 6, '1.', '3.', '1.']
const qyqx = ['1.', '2.', '3.', '1.', '5.', '3.', '2.', '5.', '2.', '1.', 6, '3.', '1.', 7, 7, 6, 7, '1.', '2.', 5, '1.', '2.', '3.', '4.', '4.', '3.', '2.', '1.', '2.', '1.', '2.', '3.', '1.', '5.', '3.', '2.', '5.', '2.', '1.', 6, 6, 7, '1.', 5, 5, 6, 7, '1.', '2.', 5, '1.', '2.', '3.', '4.', '4.', '3.', '2.', '1.', '1.-', '1.', '3.', '4.', '5.', '5.', '5.', '5.', '5.', '6.', '5.', '4.', '3.', '3.', '3.', '3.', '3.', '4.', '3.', '2.', '1.', '1.', '1.', 7, 6, 7, 7, '1.', '2.', '2.', '3.', '2.', '3.', '2.', '3.', '4.', '5.', '5.', '5.', '5.', '5.', '6.', '5.', '4.', '3.', '3.', '3.', '3.', '4.', '3.', '2.', '1.', 7, 6, 7, '1.', '2.', 5, '1.', '2.', '3.', '2.', '2.', '2.', '1.', '1.']
const guoge = ['.5', 1, 1, 1, 1, '.5', '.6', '.7', 1, 1, 3, 1, 2, 3, 5, 5, 3, 3, 1, 3, 5, 3, 2, 2, 6, 5, 2, 3, 5, 3, 5, 3, 2, 3, 1, 3, '.5', '.6', 1, 1, 3, 3, 5, 5, 2, 2, 2, '.6', 2, '.5', 1, 1, 3, 3, 5, 1, 3, 5, 5, 6, 5, 3, 1, 5, 5, 5, 3, 1, '.5', 1, 3, 1, 5, 5, 5, 3, 1, '.5', 1, '.5', 1, '.5', 1, 1]
const woniu = [5, 5, 5, 5, 3, 5, 1, 6, 5, 5, 5, 5, 5, 3, 2, 1, 3, 2, 5, 5, 5, 5, 3, 5, 1, 6, 5, 5, 5, 5, 5, 3, 2, 1, 3, 2, 2, 3, 5, 5, 5, 3, 3, 2, 1, 1, 2, 3, 1, 1, '.6', '.5', '.6', '.5', 5, 5, 5, 5, 3, 2, 1, 6, 5, 5, 6, 1, 2, 1, 2, 3, 2, 1]
const canon = ['5.', '3.', '4.', '5.', '3.', '4.', '5.', 5, 6, 7, '1.', '2.', '3.', '4.', '3.', '1.', '2.', '3.', 3, 4, 5, 6, 5, 4, 5, '1.', 7, '1.',6,'1.',7,6,5,4,5,4,3,4,5,'1.',7,'1.',6,'1.',7,'1.',7,6,5,7,'1.','2.','3.','4.']

const musics = [littleStar, chongerfei, OdeToJoy, twoTigers, songbie, qifengle, xiyangyang, qyqx, guoge, woniu, canon];
let noteIndex = 0;
// let musicIndex = musics.length - 1;
let musicIndex=7

function playMusic(music = music1) {
    let active = musics[musicIndex];
    let note = active[noteIndex++];
    music.src = ''
    if (typeof note === 'string' && note.indexOf('.') === 0) {
        note = note.replace('.', '')
        note = note.length > 1 ? note.replace('-', '') : note
        music.src = low[Number(note)]
        music.play();
    } else if (typeof note === 'string' && note.indexOf('.') === 1) {
        note = note.replace('.', '')
        note = note.length > 1 ? note.replace('-', '') : note
        music.src = high[Number(note)]
        music.play();
    } else if (typeof note === 'string' && note.indexOf('-') === 1) {
        music.src = srcs[Number(note.replace('-', ''))]
        music.play()
        setTimeout(() => {
            playMusic(music2)
        }, 200);
    } else {
        music.src = srcs[note]
        music.play();
    }
    if (noteIndex === active.length) {
        noteIndex = 0
        musicIndex++
        if (musicIndex === musics.length) {
            musicIndex = 0
        }
    }
}

function createBlock() {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const element = document.createElement('div')
            element.setAttribute('class', 'block');
            // element.style.left = i * 97.5 + 'px';
            // element.style.top = j * + 97.5 + 'px';
            fragment.appendChild(element);
            ctx.beginPath()
            ctx.fillStyle = '#CDF5F4'
            ctx.rect((i * 97.5) + 5, (j * + 97.5) + 5, 87.5, 87.5)
            ctx.fill()
            const block = {
                element,
                left: undefined,
                right: undefined,
                top: undefined,
                bottom: undefined,
                num: undefined,
                x: i,
                y: j,
                _t: 0,
                _b: 0,
                _l: 0,
                _r: 0,
            }
            blocks.push(block)
        }
    }
    blockBox.appendChild(fragment)
}
createBlock()

function setPosition() {
    blocks.forEach((block, index) => {
        const x = block.x
        const y = block.y
        block._b = 0;
        block._t = 0;
        block._l = 0;
        block._r = 0;
        block.left = undefined;
        block.right = undefined;
        block.top = undefined;
        block.bottom = undefined;
        block.element.style.left = x * 97.5 + 'px';
        block.element.style.top = y * + 97.5 + 'px';
        if (block.num === undefined) return
        if (y > 0) {
            getTop(block, index, 'top')
        }
        if (y < 3) {
            getBottom(block, index, 'bottom')
        }
        if (x > 0) {
            getLeft(block, index, 'left')
        }
        if (x < 3) {
            getRight(block, index, 'right')
        }
    });
    t_open = true;
    b_open = true;
    l_open = true;
    r_open = true;
}

function getBottom(block, index, position) {
    if (blocks[index + 1].num !== undefined) {
        block.bottom = blocks[index + 1]
    } else if (blocks[index + 1].y < 3) {
        block._b += 1
        getBottom(block, index + 1, position)
    } else {
        block._b += 1
        block.bottom = undefined
    }
}

function getTop(block, index, position) {
    if (blocks[index - 1].num !== undefined) {
        block.top = blocks[index - 1]
    } else if (blocks[index - 1].y > 0) {
        block._t += 1
        getTop(block, index - 1, position)
    } else {
        block._t += 1
        block.top = undefined
    }
}

function getLeft(block, index, position) {
    if (blocks[index - 4].num !== undefined) {
        block.left = blocks[index - 4]
    } else if (blocks[index - 4].x > 0) {
        block._l += 1
        getLeft(block, index - 4, position)
    } else {
        block._l += 1
        block.left = undefined
    }
}

function getRight(block, index, position) {
    if (blocks[index + 4].num !== undefined) {
        block.right = blocks[index + 4]
    } else if (blocks[index + 4].x < 3) {
        block._r += 1
        getRight(block, index + 4, position)
    } else {
        block._r += 1
        block.right = undefined
    }
}

function initialize() {
    let i1 = Math.floor(Math.random() * blocks.length)
    const iniBlock1 = blocks[i1];
    iniBlock1.num = 2;
    iniBlock1.element.className = `block block_active ${speedClass}`;
    iniBlock1.element.style.backgroundColor = colorArr[Math.log2(iniBlock1.num) - 1]
    if (isHanzi) {
        iniBlock1.element.innerText = Hanzi[Math.log2(iniBlock1.num) - 1]
    } else {
        iniBlock1.element.innerText = iniBlock1.num;
    }

    let i2 = Math.floor(Math.random() * blocks.length)
    while (i2 === i1) {
        i2 = Math.floor(Math.random() * blocks.length)
    }
    const iniBlock2 = blocks[i2];
    iniBlock2.num = 2;
    iniBlock2.element.className = `block block_active ${speedClass}`;
    iniBlock2.element.style.backgroundColor = colorArr[Math.log2(iniBlock2.num) - 1]
    if (isHanzi) {
        iniBlock2.element.innerText = Hanzi[Math.log2(iniBlock2.num) - 1]
    } else {
        iniBlock2.element.innerText = iniBlock2.num;
    }

    const nextIndex = getNext();
    blocks.nextIndex = nextIndex;
}

initialize()

setPosition()

function getNext() {
    let count = 0
    blocks.forEach(block => {
        if (block.num === undefined) {
            count++;
        }
    })
    if (count === 0) return undefined
    const index = Math.floor(Math.random() * count)
    return index
}

// 赋予没有数字的随机方块数字
function block(index) {
    if (index === undefined) return
    const inactivity = []
    blocks.forEach(block => {
        if (block.num === undefined) {
            inactivity.push(block);
        }
    })
    const num = Math.random() >= 1 / 2 ? 2 : 4;
    const block = inactivity[index]
    block.num = num;
    block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`;
    block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1]
    if (isHanzi) {
        block.element.innerText = Hanzi[Math.log2(block.num) - 1]
    } else {
        block.element.innerText = block.num;
    }
}

const leftbtn = document.querySelector('.leftbtn');
const rightbtn = document.querySelector('.rightbtn');
const topbtn = document.querySelector('.topbtn');
const bottombtn = document.querySelector('.bottombtn');
const a = [];

leftbtn.addEventListener('click', function (e) {
    if (!l_open) return
    t_open = false;
    b_open = false;
    l_open = false;
    r_open = false;
    oldBlocks.nextIndex = blocks.nextIndex;
    playMusic()
    // let zIndex = 1
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        oldBlocks[i] = Object.assign({}, block)
        if (block.num === undefined) continue
        let count = getCount(block, 'left', '_l', block._l);
        if (block.left && block.left.num === block.num) {
            count++;
            block.num = block.num * 2;
            block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1];
            block.element.className += ' above'
            block._l += 1;
            if (isHanzi) {
                block.element.innerText = Hanzi[Math.log2(block.num) - 1];
            } else {
                block.element.innerText = block.num;
            }
            newscoreNum += block.num;
            if (block.num > maxNum) {
                maxNum = block.num;
                best_el.innerText = maxNum;
            }
        }
        // 先移动，500ms后替换位置
        block.element.style.left = (block.x - count) * 97.5 + 'px';
        setTimeout(() => {
            block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
            reposition(block, 'left', count);
        }, timeout)
    }
    oldscoreNum = scoreNum;
    scoreNum = newscoreNum;
    score.innerText = scoreNum;
    setTimeout(() => {
        block(blocks.nextIndex)
        setPosition()
        blocks.nextIndex = getNext()
    }, timeout + 100)
})

rightbtn.addEventListener('click', function (e) {
    if (!r_open) return
    t_open = false;
    b_open = false;
    l_open = false;
    r_open = false;
    oldBlocks.nextIndex = blocks.nextIndex;
    playMusic()
    // let zIndex = 1
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i]
        oldBlocks[i] = Object.assign({}, block)
        if (block.num === undefined) continue
        let count = getCount(block, 'right', '_r', block._r);
        if (block.right && block.right.num === block.num) {
            count++;
            block.num = block.num * 2;
            block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1];
            block.element.className += ' above'
            block._r += 1;
            if (isHanzi) {
                block.element.innerText = Hanzi[Math.log2(block.num) - 1];
            } else {
                block.element.innerText = block.num;
            }
            newscoreNum += block.num;
            if (block.num > maxNum) {
                maxNum = block.num;
                best_el.innerText = maxNum;
            }
        }
        block.element.style.left = (block.x + count) * 97.5 + 'px';
        setTimeout(() => {
            block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
            reposition(block, 'right', count);
        }, timeout);
    }
    
    oldscoreNum = scoreNum;
    scoreNum = newscoreNum;
    score.innerText = scoreNum;
    setTimeout(() => {
        block(blocks.nextIndex)
        setPosition()
        blocks.nextIndex = getNext()
    }, timeout + 100)
})

topbtn.addEventListener('click', function (e) {
    if (!t_open) return
    t_open = false;
    b_open = false;
    l_open = false;
    r_open = false;
    oldBlocks.nextIndex = blocks.nextIndex;
    playMusic()
    // let zIndex = 1
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        oldBlocks[i] = Object.assign({}, block)
        if (block.num === undefined) continue
        let count = getCount(block, 'top', '_t', block._t);
        if (block.top && block.top.num === block.num) {
            count++;
            block.num = block.num * 2;
            block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1];
            // 添加above类改变block的z-index
            block.element.className += ' above'
            block._t += 1;
            if (isHanzi) {
                block.element.innerText = Hanzi[Math.log2(block.num) - 1]
            } else {
                block.element.innerText = block.num;
            }
            newscoreNum += block.num;
            if (block.num > maxNum) {
                maxNum = block.num;
                best_el.innerText = maxNum;
            }
        }
        block.element.style.top = (block.y - count) * 97.5 + 'px';
        setTimeout(() => {
            // 去除掉above类
            block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
            reposition(block, 'top', count);
        }, timeout);
    }
    oldscoreNum = scoreNum;
    scoreNum = newscoreNum;
    score.innerText = scoreNum;
    setTimeout(() => {
        block(blocks.nextIndex)
        setPosition();
        blocks.nextIndex = getNext()
    }, timeout + 100)
})

bottombtn.addEventListener('click', function (e) {
    if (!b_open) return
    t_open = false;
    b_open = false;
    l_open = false;
    r_open = false;
    oldBlocks.nextIndex = blocks.nextIndex;
    playMusic()
    // let zIndex = 1
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        oldBlocks[i] = Object.assign({}, block)
        if (block.num === undefined) continue
        let count = getCount(block, 'bottom', '_b', block._b);
        if (block.bottom && block.bottom.num === block.num) {
            count++;
            block.num = block.num * 2;
            block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1];
            block.element.className += ' above'
            block._b += 1;
            if (isHanzi) {
                block.element.innerText = Hanzi[Math.log2(block.num) - 1]
            } else {
                block.element.innerText = block.num;
            }
            newscoreNum += block.num;
            if (block.num > maxNum) {
                maxNum = block.num;
                best_el.innerText = maxNum;
            }
        }
        block.element.style.top = (block.y + count) * 97.5 + 'px';
        setTimeout(() => {
            block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
            reposition(block, 'bottom', count);
        }, timeout);
    }
    oldscoreNum = scoreNum;
    scoreNum = newscoreNum;
    score.innerText = scoreNum;
    setTimeout(() => {
        block(blocks.nextIndex)
        setPosition()
        blocks.nextIndex = getNext()
    }, timeout + 100)
})

function getCount(block, position, _, count = 0) {
    if (!block[position]) {
        return count
    } else {
        return getCount(block[position], position, _, count + block[position][_])
    }
}

function reposition(block, position, count) {
    if (count === 0) return
    const x = block.x
    const y = block.y
    const index = x * 4 + y
    if (position === 'left') {
        // 方块的落点
        const block0 = blocks[index - count * 4]
        block.x = block0.x
        block.y = block0.y
        block0.x = x
        block0.y = y
        blocks[index] = block0
        blocks[index - count * 4] = block
        block0.element.style.left = x * 97.5 + 'px';
        block0.element.style.top = y * + 97.5 + 'px';
        block0.element.style.backgroundColor = ''
        block0.element.className = 'block';
        block0.element.innerText = '';
        // block0.element.style.backgroundColor = 'red'
        block0.num = undefined
    }
    else if (position === 'right') {
        // 方块的落点
        const block0 = blocks[index + count * 4]
        block.x = block0.x
        block.y = block0.y
        block0.x = x
        block0.y = y
        blocks[index] = block0
        blocks[index + count * 4] = block
        block0.element.style.left = x * 97.5 + 'px';
        block0.element.style.top = y * + 97.5 + 'px';
        block0.element.style.backgroundColor = ''
        block0.element.className = 'block'
        block0.element.innerText = ''
        // block0.element.style.backgroundColor = 'red'
        block0.num = undefined
    }
    else if (position === 'top') {
        // 方块的落点
        const block0 = blocks[index - count * 1]
        block.x = block0.x
        block.y = block0.y
        block0.x = x
        block0.y = y
        blocks[index] = block0
        blocks[index - count * 1] = block
        block0.element.style.left = x * 97.5 + 'px';
        block0.element.style.top = y * + 97.5 + 'px';
        block0.element.style.backgroundColor = ''
        block0.element.className = 'block'
        block0.element.innerText = ''
        // block0.element.style.backgroundColor = 'red'
        block0.num = undefined
    }
    if (position === 'bottom') {
        // 方块的落点
        const block0 = blocks[index + count * 1]
        block.x = block0.x
        block.y = block0.y
        block0.x = x
        block0.y = y
        blocks[index] = block0
        blocks[index + count * 1] = block
        block0.element.style.left = x * 97.5 + 'px';
        block0.element.style.top = y * + 97.5 + 'px';
        block0.element.style.backgroundColor = ''
        block0.element.className = 'block'
        block0.element.innerText = ''
        // block0.element.style.backgroundColor = 'red'
        block0.num = undefined
    }
}

const mask = document.querySelector('.mask')
let x0 = ''
let y0 = ''
mask.addEventListener('mousedown', function (e) {
    x0 = e.offsetX;
    y0 = e.offsetY;
})

mask.addEventListener('mouseup', function (e) {
    const x1 = e.offsetX;
    const y1 = e.offsetY;
    let l = false
    let r = false
    let t = false
    let b = false
    if (x1 - x0 >= 50) {
        r = true
    }
    if (x1 - x0 <= -50) {
        l = true
    }
    if (y1 - y0 >= 50) {
        b = true
    }
    if (y1 - y0 <= -50) {
        t = true
    }
    if (l && !t && !b) {
        leftbtn.click()
    }
    if (r && !t && !b) {
        rightbtn.click()
    }
    if (t && !r && !l) {
        topbtn.click()
    }
    if (b && !r && !l) {
        bottombtn.click()
    }
})

// 撤回
const recall = document.querySelector('.recall');
recall.addEventListener('click', function () {
    playMusic()
    if (oldBlocks.length <= 0) { return }
    let blocks0 = []
    oldBlocks.forEach((block) => {
        const x = block.x;
        const y = block.y;
        block.element.style.left = x * 97.5 + 'px';
        block.element.style.top = y * + 97.5 + 'px';
        if (block.num === undefined) {
            block.element.className = `block ${speedClass}`
            block.element.innerText = ''
            block.element.style.backgroundColor = ''
        } else {
            block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`;
            block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1]
            if (isHanzi) {
                block.element.innerText = Hanzi[Math.log2(block.num) - 1]
            } else {
                block.element.innerText = block.num;
            }
        }
        blocks0.push(Object.assign({}, block))
    })
    blocks = blocks0
    blocks.nextIndex = oldBlocks.nextIndex
    setPosition();
    scoreNum = oldscoreNum;
    newscoreNum = oldscoreNum;
    score.innerText = scoreNum;
})

const menu = document.querySelector('.menu')
const menus = document.querySelector('.menus')
menu.addEventListener('click', function (e) {
    playMusic()
    menus.className = 'menus menus_active'
})

const back = document.querySelector('.back')
back.addEventListener('click', function () {
    playMusic()
    menus.className = 'menus menus_leave'
})

const volume = document.querySelector('.volume');
const volumeLevel = document.querySelector('.volume_level')
volume.addEventListener('click', function () {
    playMusic()
    let width = Number(volumeLevel.style.width.replace('px', ''))
    switch (width) {
        case 70:
            width = 23;
            menuSound.volume = 0.3;
            moveSound.volume = 0.3;
            break
        case 46:
            width = 70;
            menuSound.volume = 1;
            moveSound.volume = 1;
            break
        case 23:
            width = 46;
            menuSound.volume = 0.6;
            moveSound.volume = 0.6;
            break
    }
    volumeLevel.style.width = width + 'px'
})

const speed = document.querySelector('.speed');
const speedLevel = document.querySelector('.speed_level')
speed.addEventListener('click', function () {
    playMusic()
    let width = Number(speedLevel.style.width.replace('px', ''))
    switch (width) {
        case 14:
            width = 28;
            timeout = 200;
            break
        case 28:
            width = 42;
            timeout = 300;
            break
        case 42:
            width = 56;
            timeout = 400;
            break
        case 56:
            width = 70;
            timeout = 500;
            break
        case 70:
            width = 14;
            timeout = 100;
            break
    }
    speedLevel.style.width = width + 'px';
    speedClass = getSpeed();
    blocks.forEach((block) => {
        if (block.num === undefined) return
        block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
    })
})

function getSpeed() {
    let speedClass = ''
    switch (timeout) {
        case 500:
            speedClass = 'five_hundred';
            break;
        case 400:
            speedClass = 'four_hundred';
            break;
        case 300:
            speedClass = 'three_hundred';
            break;
        case 200:
            speedClass = 'two_hundred';
            break;
        case 100:
            speedClass = 'one_hundred';
            break;
    }
    return speedClass
}

const resetBtn = document.querySelector('.reset_btn');
const resetConfirm = document.querySelector('.reset_confirm');
const container = document.querySelector('.container')
resetBtn.addEventListener('click', function () {
    playMusic()
    resetConfirm.className += ' reset_confirm_active';
})
resetConfirm.addEventListener('click', function () {
    playMusic()
    blocks.forEach((block) => {
        block._b = 0;
        block._t = 0;
        block._l = 0;
        block._r = 0;
        block.left = undefined;
        block.right = undefined;
        block.top = undefined;
        block.bottom = undefined;
        block.element.style.backgroundColor = '';
        if (block.num) {
            block.num = undefined
            block.element.className = `block ${speedClass}`
            block.element.innerText = ''
        }
    })
    oldBlocks = [];
    scoreNum = 0;
    oldscoreNum = 0;
    newscoreNum = 0;
    score.innerText = 0;
    maxNum = 2;
    initialize();
    setPosition();
    resetConfirm.className = 'reset_confirm';
    container.className += ' container_leave';
    menus.className = 'menus menus_leave';
    setTimeout(() => { container.className = 'container' }, 2000);
});

const interfaceBtn = document.querySelector('.interface_btn');
const interfaceMain = document.querySelector('.interface_main');
interfaceBtn.addEventListener('click', function (e) {
    playMusic()
    interfaceMain.className = 'interface_main box1 interface_active';
});

const interfaceBack = document.querySelector('.interface_back');
interfaceBack.addEventListener('click', function () {
    playMusic()
    interfaceMain.className = 'interface_main box1 interface_leave'
});

const theme = document.querySelector('.theme');
const slider = document.querySelector('.slider');
slider.style.left = 0 + 'px'
theme.addEventListener('click', function (e) {
    playMusic()
    let left = Number(slider.style.left.replace('px', ''))
    switch (left) {
        case 0:
            left = 37
            isHanzi = false
            break
        case 37:
            left = 74
            isHanzi = false
            break
        case 74:
            left = 111
            isHanzi = true
            break
        case 111:
            left = 148
            isHanzi = false
            break
        case 148:
            left = 0
            isHanzi = false
            break
    }
    changeTheme(left / 37)
    slider.style.left = left + 'px';
})

const bcColors = ['#44A8A8', '#9B4667', '#70A875', '#D40203', ''];
const menuColors = ['#3ECBD2', '#FB749F', '#5ABF71', '#FE2524', ''];
const btnColors = ['#82DADC', '#FE93AD', '#8EE096', '#C30000', ''];
const mainColors = ['#D5FFFE', '#FED4F0', '#B0D9B8', '#FCDDB1', ''];
const rectColors = ['#CDF5F4', '#F4CCE7', '#A9D0B3', '#F0D3A9', ''];
const root = document.querySelector('.root');
const box1s = document.querySelectorAll('.box1');
const btns = document.querySelectorAll('.btn');
const lefts = document.querySelectorAll('.left');
const content = document.querySelector('.content');
function changeTheme(index) {
    colorArr = colors[index]
    blocks.forEach(block => {
        ctx.beginPath()
        ctx.fillStyle = rectColors[index]
        ctx.rect((block.x * 97.5) + 5, (block.y * + 97.5) + 5, 87.5, 87.5)
        ctx.fill()
        if (block.num === undefined) return
        block.element.style.backgroundColor = colorArr[Math.log2(block.num) - 1]
        block.element.className = `block block_active ${speedClass} ${isHanzi ? 'Hanzi' : ''}`
        block.element.innerText = isHanzi ? Hanzi[Math.log2(block.num) - 1] : block.num
    });
    btns.forEach(item => {
        item.style.backgroundColor = btnColors[index]
    });
    box1s.forEach(box1 => {
        box1.style.backgroundColor = menuColors[index]
    })
    lefts.forEach(left => {
        left.style.backgroundColor = btnColors[index];
    })
    root.style.backgroundColor = bcColors[index];
    menus.style.backgroundColor = menuColors[index];
    blockBox.style.backgroundColor = mainColors[index];
    content.style.backgroundColor = mainColors[index]
}

