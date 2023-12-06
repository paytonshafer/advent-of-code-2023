const fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf-8')
const data = file.split('\n').filter(i => i !== '')
//const data = file.split(':')

// Part 1
// Parse Data
const seeds = data[0].split(' ').slice(1)
//console.log(seeds)

const map_ranges = {}
let curr_map = 0
data.slice(1).forEach((line) => {
    if(line.includes(':')) curr_map += 1
    else map_ranges[curr_map] ? map_ranges[curr_map].push(line.split(' ')) : map_ranges[curr_map] = [line.split(' ')]
})

// Create Mappings
/* Cant use, uses too much memory
const mappings = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}}
for(let i = 1; i < 8; i++){
    map_ranges[i].forEach((range) => {
        const dest = Number(range[0])
        const source = Number(range[1])
        const length = Number(range[2])

        for(let j = 0; j < length; j++){
            mappings[i][source + j] = dest + j
        }
    })
}
console.log('Mappings Made')
*/
//console.log(mappings[1])

/* Cant use, uses to much memory
// Helper function to convert the source given its map
const convert = (source, map) => {
    return map[source] ? map[source] : source
}

// Helper function to create a mapping
const create_map = (num) => {
    let mapping = {}
    map_ranges[num].forEach((range) => {
        const dest = Number(range[0])
        const source = Number(range[1])
        const length = Number(range[2])

        for(let j = 0; j < length; j++){
            mapping[source + j] = dest + j
        }
    })
    return mapping
}*/

const convert = (cur_source, stage) => {
    let res = -1
    map_ranges[stage].forEach((range) => {
        const dest_start = Number(range[0])
        const source_start = Number(range[1])
        const length = Number(range[2])
    
        if(cur_source >= source_start && cur_source < source_start + length){
            res = dest_start + (cur_source - source_start)
        } 
    })
    return res == -1 ? cur_source : res
}

// Loop through each seed and convert it
let converted = [seeds]
let temp = []
for(let i = 1; i < 8; i++){
    converted[i-1].forEach((elem) => {
        temp.push(convert(Number(elem), i))
    })
    converted.push(temp)
    temp = []
}
console.log('Part1: ' + Math.min(...converted[7]))

// Part 2
const generateNumberList = (start, range) => {
    const numberList = [];

    for (let i = start; i < start + range; i++) {
        numberList.push(i);
    }

    return numberList;
}

let min = -1
let current
for(let i = 0; i < seeds.length; i += 2){
    console.log(i)
    for (let seed = Number(seeds[i]); seed < Number(seeds[i]) + Number(seeds[i+1]); seed++) {
        current = seed
        for(let j = 1; j < 8; j++){
            current = convert(current, j)
        }
        min == -1 ? min = current : min > current ? min = current : null
    }
}

console.log('Part2: ' + min)