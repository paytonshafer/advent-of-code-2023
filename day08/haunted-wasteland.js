const fs = require('fs');

// Part 1
let file = fs.readFileSync('input.txt', 'utf-8').split('\n')
let instructions = file[0]
let data = {}

file.slice(2).forEach((line) => {
    data[line.slice(0,3)] = {L: line.slice(7, 10), R: line.slice(12, 15)}
})

let cur = 'AAA'
let steps1 = 0
for(let i = 0; i < instructions.length; i++){
    steps1 += 1
    cur = data[cur][instructions[i]]
    if(cur == 'ZZZ') i = instructions.length
    if(i == instructions.length - 1) i = -1
}

console.log('Part1: ' + steps1)

// Part 2
file = fs.readFileSync('input.txt', 'utf-8').split('\n')
instructions = file[0]
data = {}
file.slice(2).forEach((line) => {
    data[line.slice(0,3)] = {L: line.slice(7, 10), R: line.slice(12, 15)}
})

let curr = Object.keys(data).filter(k => k.endsWith('A'));
//console.log('Step 0', curr)
let steps2 = BigInt(0)
for(let i = 0; i < instructions.length; i++){
    steps2 += BigInt(1)
    for(let j = 0; j < curr.length; j++){
        curr[j] = data[curr[j]][instructions[i]]
    }
    let test = curr.filter(n => n.endsWith('Z'))
    if(test.length === curr.length) i = instructions.length
    if(i == instructions.length - 1) i = -1
    //console.log('Step ' + steps2, curr)
}
console.log('Part2: ' + steps2)