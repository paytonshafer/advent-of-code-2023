const fs = require('fs');
const { stringify } = require('querystring');

// Part 1
fs.readFile('input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n')
    
    let sum = 0

    lines.map((line) => {
        let first = ''
        let last = ''
        let nums = '123456789'
        for(let i = 0; i < line.length; i++){
            if(nums.includes(line[i])){
                if(first === ''){
                    first = line[i]
                }else{
                    last = line[i]
                }
            }
        }
        if(last === ''){
            last = first
        }
        sum += Number(first + last)
    })

    console.log('Part1: ' + sum)
});

// Part 2
const textToInt = (x) => {
    switch(x) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return x * 1;
    }
}
fs.readFile('input.txt', 'utf8', (err, data) => {
    let sum = 0
    const lines = data.split("\n")
    lines.forEach((line) => {
        const firstText = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/)
        const firstInt = textToInt(firstText[1])
        const lastText = line.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine).*/)
        const lastInt = textToInt(lastText[1])
        sum += (10 * firstInt) + (1 * lastInt)
    });

    console.log("Part2:", sum)
})



// Worked with test but not input soooo had to find a new way as shown above
/*
fs.readFile('input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n')
    
    let sum = 0

    lines.map((line) => {
        let first = {pos: null, val: null}
        let last = {pos: null, val: null}
        const nums = ['one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5', 'six', '6', 'seven', '7', 'eight', '8', 'nine', '9']
        const digits = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9']

        //two1nine
        nums.map(num => {
            let index = line.indexOf(num)
            if(index !== -1){
                let val = digits[nums.indexOf(num)]
                if(first.pos === null){
                    first = {pos: index, val: val}
                }else{
                    if(first.pos > index){
                        let temp = first
                        first = {pos: index, val: val}
                        if(last.pos == null){
                            last = temp
                        }else{
                            if(last.pos < temp.pos){
                                last = temp
                            }
                        }
                    }else{
                        if(last.pos < index){
                            last = {pos: index, val: val}
                        }
                    }
                }
            }
        })

        if(last.pos === null){
            last = first
        }
        sum += Number(first.val + last.val)
    })

    console.log('Part2: ' + sum)
});
*/