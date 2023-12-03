from collections import defaultdict
from functools import reduce
import re

file = open("input.txt").read().strip()
lines = file.split('\n')

points = [] # what points to check around special chars
dirs = [(-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0)] # positions to check around special chars

# fill points with points that needed to be checked
for row, line in enumerate(lines):
    for idx, c in enumerate(line):
        if not c.isdigit() and c != '.':
            for dir in dirs:
              points.append((row+dir[0],idx+dir[1]))          
res1 = 0
possible_gear = defaultdict(list)

for row, line in enumerate(lines):
    nums = re.findall(r'(\d+)', line) # find all numbers in the line
    end = 0
    for num in nums:
        idx = line.find(num,end) # get start of num
        end = idx+len(num) # get end of num
        for col in range(idx,idx+len(num)):
            if ((row,col)) in points:
                res1 += int(num) # if number is touching a special char add it
                gear_idx = int(points.index((row,col))/8)
                possible_gear[gear_idx].append(int(num))
                break

gear_ratio = sum(map(lambda x: reduce(lambda y, z: y * z, x[1]) if len(x[1]) > 1 else 0, possible_gear.items())) # get gear ratio

print("part1: ", res1)
print("part2: ", gear_ratio)