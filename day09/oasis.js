const fs = require('fs');

// Part 1
const data = fs.readFileSync('input.txt', 'utf-8').split('\n')

let sum1 = 0

data.forEach(line => {
    const levels = [line.split(' ')]
    let level = 0
    while(!levels[level].every(element => element === 0)){
        let next = []
        for(let i = 0; i < levels[level].length-1; i++){
            next.push(Number(levels[level][i + 1]) - Number(levels[level][i]))
        }
        levels.push(next)
        next = []
        level += 1
    }
    for(let i = level; i >= 0; i --){
        if(i == level) levels[i].push(0)
        else{
            levels[i].push(Number(levels[i][levels[i].length - 1]) + Number(levels[i+1][levels[i+1].length - 1] ))
        }
    }
    sum1 += Number(levels[0][levels[0].length - 1])
})

console.log('Part1: ' + sum1)

// Part 2
let sum2 = 0

data.forEach(line => {
    const levels = [line.split(' ')]
    let level = 0
    while(!levels[level].every(element => element === 0)){
        let next = []
        for(let i = 0; i < levels[level].length-1; i++){
            next.push(Number(levels[level][i + 1]) - Number(levels[level][i]))
        }
        levels.push(next)
        next = []
        level += 1
    }
    for(let i = level; i >= 0; i --){
        if(i == level) levels[i].unshift(0)
        else{
            levels[i].unshift(Number(levels[i][0]) - Number(levels[i+1][0] ))
        }
    }
    sum2 += Number(levels[0][0])
})

console.log('Part2: ' + sum2)