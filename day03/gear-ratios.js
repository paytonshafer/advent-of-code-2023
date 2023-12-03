const fs = require('fs');

// Part 1
const data = fs.readFileSync('input.txt', 'utf-8')
const lines = data.split('\n')

let sum1 = 0
let list = []

for(let i = 0; i < lines.length; i++){
    const norm_chars = '1234567890.'
    let line = lines[i]
    let nums = line.match(/\d+/g)
    let above = '.'.repeat(line.length)
    let below = '.'.repeat(line.length)

    if(i == 0){ // first line
        below = lines[1]
    }else if(i == lines.length -1){ // last line
        above = lines[lines.length - 2]
    }else{ // any line in the middle
        above = lines[i-1]
        below = lines[i+1]
    }

    if(nums){
        let count = 0
        nums.forEach((num) => {
            let valid = false
            let start = line.indexOf(num)
            let end = start + num.length
    
            if(start == 0){ // num at beginning
                end = end + 1
                // check above and below
                for(let j = start; j < end; j++){
                    if(!norm_chars.includes(above[j])) valid = true
                    if(!norm_chars.includes(below[j])) valid = true
                }
                // check right
                if(!norm_chars.includes(line[end - 1])) valid = true
    
            }else if(end == line.length){ // num at end
                start = start - 1
                // check above and below
                for(let j = start; j < end; j++){
                    if(!norm_chars.includes(above[j])) valid = true
                    if(!norm_chars.includes(below[j])) valid = true
                }
                // check left
                if(!norm_chars.includes(line[start])) valid = true
            }else{ // num in middle
                start = start - 1
                end = end + 1
                // check above and below
                for(let j = start; j < end; j++){
                    if(!norm_chars.includes(above[j])) valid = true
                    if(!norm_chars.includes(below[j])) valid = true
                }
                // check right
                if(!norm_chars.includes(line[end - 1])) valid = true
                // check left
                if(!norm_chars.includes(line[start])) valid = true
            }

            if(valid){
                //console.log(above.slice(start, end))
                //console.log(line.slice(start, end))
                //console.log(below.slice(start, end))
            }
    
            if(valid) sum1 += Number(num)
            if(valid) list.push(num)
        })
    }
}


console.log('Part1: ' + sum1)