const fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf-8')
const data = file.split('\n')

// Part 1
// Parse Data
const times = data[0].split(' ').slice(1).filter(i => i !== '')
const records = data[1].split(' ').slice(1).filter(i => i !== '')

// Get Counts
const counts = Array(times.length).fill(0)
for(let i = 0; i <= times.length; i++){
    for(let j = 0; j < times[i]; j++){
        let dist = j * (times[i] - j)
        dist > records[i] ? counts[i] += 1 : null
    }
} 
console.log('Part1: ' + counts.reduce((prod, val) => prod * val, 1))

// Part2
const time = Number(times.join(''))
const record = Number(records.join(''))

let count = 0

for(let i = 0; i <= time; i++){
    let dist = i * (time - i)
    dist > record ? count += 1 : null
}

console.log('Part2: ' + count)