/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// take a middle => check left side , right side  , decrease search space by half

const binary_search = (nums, target) => {
  let l = 0
  let r = (nums?.length || 0) - 1
  let midIdx = -1
  while (l + 1 < r) { // this suggests they are adjacent to each other.
    midIdx = Math.floor(l + (r - l) / 2)

    if (nums[midIdx] <= target) { // first position of target
      l = midIdx
    } else {
      r = midIdx
    }

    // if (nums[midIdx] > target) { // last position of target
    //   r = midIdx
    // } else {
    //   l = midIdx
    // }
  }
  if (nums[l] === target) return l
  if (nums[r] === target) return r
  return midIdx
}

const nums = [-1, 0, 5, 7, 3, 3, 5, 9, 12]
console.log('idx', nums, binary_search(nums, 3))


//isBadVersion problem

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
  let start_version = 1;
  let end_version = n;

  if(isBadVersion(start_version)) return start_version;

  while(start_version + 1 < end_version ){
      let middle_bad_version = Math.floor((start_version + end_version) / 2 )
      if(isBadVersion(middle_bad_version)){
          end_version = middle_bad_version;
      }
      else{
          start_version = middle_bad_version;
      }
  }
  return end_version;
  };
};

//also check k closest in sorted array leetcode problem.



class ArrayReader {
  constructor(array) {
    this.array = array;
  }

  get(k) {
    if (k < 0 || k >= this.array.length) return 2147483647;
    return this.array[k];
  }
}

const searchBigSortedArray = (reader, target) => {
  // Step 1: Find the range by doubling kth until we reach a value >= target // this needs to be done first to estimate search space.
  let kth = 1;
  while (reader.get(kth - 1) < target) {
    kth *= 2;
  }

  // Step 2: Binary Search within the range [0, kth - 1]
  let start = 0;
  let end = kth - 1;

  while (start + 1 < end) {
    const mid = Math.floor(start + (end - start) / 2);
    if (reader.get(mid) < target) {
      start = mid;
    } else {
      end = mid;
    }
  }

  // Step 3: Check if start or end holds the target value
  if (reader.get(start) === target) return start;
  if (reader.get(end) === target) return end;
  return -1;
};

// Testing
const reader = new ArrayReader([1, 3, 6, 9, 21, 35, 45]);
console.log(searchBigSortedArray(reader, 3)); // Output: 1
console.log(searchBigSortedArray(reader, 4)); // Output: -1


const findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;

  // When the array is already sorted and not rotated
  if (nums[left] < nums[right]) return nums[left];

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If nums[mid] > nums[right], minimum must be in the right half
    if (nums[mid] > nums[right]) { // that means it was rotated other wise why would the order break and if it was rotated then the min element must be in right.
      left = mid + 1;
    } else {
      // Otherwise, minimum is in the left half, including mid
      right = mid;
    }
  }

  return nums[left];
};

// Testing
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0
console.log(findMin([1, 2, 3, 4, 5]));       // Output: 1 (already sorted)
console.log(findMin([3, 4, 5, 1, 2]));       // Output: 1


// peak problems . eliminate search space identify where the peak is
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function(arr) {
  let left = 0;
let right = arr.length - 1;

while( left<=right){
  let mid = Math.floor((left+right)/2)
  if( arr[mid] > arr[mid+1] && arr[mid] > arr[mid-1] ){
      return mid;
  }
  else if(arr[mid] < arr[mid+1] ){
      left  = mid + 1;  // eliminated left
  }
  else if(arr[mid] > arr[mid+1] ){
      right = mid - 1;
  }
}

return -1;
};


//search in 2d matrix striver . do this and revise all others.
