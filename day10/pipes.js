const fs = require('fs');

// Part 1
const data = fs.readFileSync('input.txt', 'utf-8').split('\n')

// gives next point and dirrection given the directions coming from and current point
const next = (p, dir) => {
    let next_char
    switch(dir){
        case 'n':
            next_char = data[p[1] + 1][p[0]]
            switch(next_char){
                case '|':
                    return [[p[0], p[1] + 1], 'n']
                case 'L':
                    return [[p[0], p[1] + 1], 'w']
                case 'J':
                    return [[p[0], p[1] + 1], 'e']
            }
            break
        case 'e':
            next_char = data[p[1]][p[0] - 1]
            switch(next_char){
                case '-':
                    return [[p[0] - 1, p[1]], 'e']
                case 'L':
                    return [[p[0] - 1, p[1]], 's']
                case 'F':
                    return [[p[0] - 1, p[1]], 'n']
            }
            break  
        case 's':
            next_char = data[p[1] - 1][p[0]]
            switch(next_char){
                case '|':
                    return [[p[0], p[1] - 1], 's']
                case '7':
                    return [[p[0], p[1] - 1], 'e']
                case 'F':
                    return [[p[0], p[1] - 1], 'w']
            }
            break  
        case 'w':
            next_char = data[p[1]][p[0]+1]
            switch(next_char){
                case '-':
                    return [[p[0] + 1, p[1]], 'w']
                case 'J':
                    return [[p[0] + 1, p[1]], 's']
                case '7':
                    return [[p[0] + 1, p[1]], 'n']
            }
            break  
    }
}

// Functionalty to dermine where to go from S
let S //coordinates (x, y)
data.forEach(line => {
    let x = line.indexOf('S')
    if(x !== -1) S = [x, data.indexOf(line)]
})

let up = data[S[1] - 1] ? data[S[1] - 1][S[0]] : null // | F 7
let down = data[S[1] + 1][S[0]] // | L J
let left = data[S[1]][S[0] - 1] // - L F
let right = data[S[1]][S[0] + 1] // - J 7

let path1, path2

if('|F7'.includes(up)){
    switch(up){
        case '|':
            path1 = [[S[0], S[1] - 1], 's']
            break
        case 'F':
            path1 = [[S[0], S[1] - 1], 'w']
            break
        case '7':
            path1 = [[S[0], S[1] - 1], 'e']
            break
    }
}

if('|LJ'.includes(down)){
    switch(down){
        case '|':
            !path1 ? path1 = [[S[0], S[1] + 1], 'n'] : path2 = [[S[0], S[1] + 1], 'n']
            break
        case 'L':
            !path1 ? path1 = [[S[0], S[1] + 1], 'w'] : path2 = [[S[0], S[1] + 1], 'w']
            break
        case 'J':
            !path1 ? path1 = [[S[0], S[1] + 1], 'e'] : path2 = [[S[0], S[1] + 1], 'e']
            break
    }
}

if('-LF'.includes(left)){
    switch(left){
        case '-':
            !path1 ? path1 = [[S[0] - 1, S[1]], 'n'] : path2 = [[S[0] - 1, S[1]], 'e']
            break
        case 'L':
            !path1 ? path1 = [[S[0] - 1, S[1]], 'w'] : path2 = [[S[0] - 1, S[1]], 's']
            break
        case 'F':
            !path1 ? path1 = [[S[0] - 1, S[1]], 'e'] : path2 = [[S[0] - 1, S[1]], 'n']
            break
    }
}

if('-J7'.includes(right)){
    switch(right){
        case '-':
            !path1 ? path1 = [[S[0] + 1, S[1]], 'n'] : path2 = [[S[0] + 1, S[1]], 'w']
            break
        case 'J':
            !path1 ? path1 = [[S[0] + 1, S[1]], 'w'] : path2 = [[S[0] + 1, S[1]], 's']
            break
        case '7':
            !path1 ? path1 = [[S[0] + 1, S[1]], 'e'] : path2 = [[S[0] + 1, S[1]], 'n']
            break
    }
}

// making map of loop for p2
const map = Array.from({ length: data.length }, () => '0'.repeat(data[0].length));

map[S[1]] = map[S[1]].slice(0, S[0]) + 'S' + map[S[1]].slice(S[0] + 1)

// take two paths and find next until the two hit the same point
let count1 = 1
while(!(path1[0][0] === path2[0][0] && path1[0][1] === path2[0][1])){
    path1 = next(path1[0], path1[1])
    map[path1[0][1]] = map[path1[0][1]].slice(0, path1[0][0]) + '1' + map[path1[0][1]].slice(path1[0][0] + 1)
    path2 = next(path2[0], path2[1])
    map[path2[0][1]] = map[path2[0][1]].slice(0, path2[0][0]) + '1' + map[path2[0][1]].slice(path2[0][0] + 1)
    count1 += 1
}

console.log('Part1: ' + count1)

// Part 2
const check_dir = (p, dir) => {
    if(dir === 'up'){
        for(let i = p[1]; i >= 0; i--){
            //console.log(i, map[i][p[0]])
            if(map[i][p[0]] === '1') return true 
            if(map[i][p[0]] === 'S' || map[i][p[0]] === '*') return false 
        }
        return false
    }else if(dir === 'down'){
        for(let i = p[1]; i < map.length; i++){
            //console.log(i, map[i][p[0]])
            if(map[i][p[0]] === '1') return true 
            if(map[i][p[0]] === 'S' || map[i][p[0]] === '*') return false 
        }
        return false
    }else if(dir === 'left'){
        for(let i = p[0]; i >= 0; i--){
            //console.log(i, map[p[1]][i])
            if(map[p[1]][i] === '1') return true 
            if(map[p[1]][i] === 'S' || map[p[1]][i] === '*') return false 
        }
        return false
    }else{ // right
        for(let i = p[0]; i < map[p[1]].length ; i++){
            //console.log(i, map[p[1]][i])
            if(map[p[1]][i] === '1') return true 
            if(map[p[1]][i] === 'S' || map[p[1]][i] === '*') return false 
        }
        return false
    }
}

const enclosed = p => {
    let dirs = [false, false, false, false] // false for up, down, left right
    const directions = ['up', 'down', 'left', 'right']

    for(let i = 0; i < 4; i++){
        dirs[i] = check_dir(p, directions[i])
    }
        
    if(dirs[0] && dirs[1] && dirs[2] && dirs[3]) return true
    else return false
}

for(let x = 0; x < 10; x++){
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(map[i][j] == 0){
                if(enclosed([j, i])){
                    //count2 += 1
                    //console.log(j, i)
                }else{
                    map[i] = map[i].slice(0, j) + '*' + map[i].slice(j + 1)
                }
            }
        }
    }
}


let count2 = 0
for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[i].length; j++){
        if(map[i][j] == 0) count2 += 1
    }
}

console.log('Part2: ' + count2)