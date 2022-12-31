import Benchmark from 'benchmark';
import {nums, k} from './data.js';

const topKFrequent1 = function(nums, k) {
  const map = {}
  nums.forEach(n => {
    map[n] = map[n] ? ++map[n] : 1
  })

  let result = []
  const frequencies = []
  for (const [digit, appearance] of Object.entries(map)) {
    if (frequencies[appearance]) {
      frequencies[appearance].push(parseInt(digit))
    } else {
      frequencies[appearance] = [parseInt(digit)]
    }
  }

  for (let i = nums.length; result.length < k; i--) {
    result = result.concat(frequencies[i] || [])
  }

  return result
}

const topKFrequent2 = function(nums, k) {
  let map = {};
  let i = nums.length;
  let n;
  while(i) {
    n = nums[--i];
    if(map[n]) {
      map[n]++;
    } else {
      map[n] = 1;
    }
  }

  let freq = {};
  let keys = Object.keys(map);
  let score;

  i = keys.length;

  while(i--) {
    n = keys[i];
    score = map[n];
    if(freq[score]){
      freq[score].push(+n)
    } else {
      freq[score] = [+n];
    }
  }

  let result = new Array(k);

  keys = Object.keys(freq);
  i = keys.length;
  let arr;
  let j;
  while(k && i) {
    arr = freq[keys[--i]];
    let len = arr.length;
    j = 0;
    while (k && j < len) {
      result[--k] = arr[j++]
    }
  }

  return result;
};

var topKFrequent3 = function(nums, k) {
  const frequencyMap = nums.reduce((accumulator, curr) => {
    return accumulator.set(curr, accumulator.get(curr) + 1 || 1);
  }, new Map());

  return Array.from(frequencyMap).sort((a, b) => b[1] - a[1]).slice(0, k).map(elem => elem[0]);
};

var suite = new Benchmark.Suite;



// add tests
suite
  .add('topKFrequent original', function () {
    topKFrequent1(nums, k);
  })
  .add('topKFrequent refactored', function() {
    topKFrequent2(nums, k);
  })
  .add('topKFrequent top', function() {
    topKFrequent3(nums, k);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': false });
