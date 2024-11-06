//returns new array . nums1 and nums2 are sorted.
const mergeArrays1 = (nums1, m, nums2, n) => {
  let new_arr = new Array(m + n).fill(-1)
  let left = 0
  let right = 0
  let index = 0
  while (left < m && right < n) {
    if (nums1[left] < nums2[right]) {
      new_arr[index] = nums1[left]
      left += 1
    } else {
      new_arr[index] = nums2[right]
      right += 1
    }
    index += 1
  }

  while (left < m) {
    new_arr[index] = nums1[left]
    left++
    index++
  }

  while (right < n) {
    new_arr[index] = nums2[right]
    right++
    index++
  }

  return new_arr
}

//modify nums1 in place and return new array both.
const mergeArrays2 = (nums1, m, nums2, n) => {
  // Set pointers for nums1 and nums2
  let i = m - 1 // Last element of the first part of nums1
  let j = n - 1 // Last element of nums2
  let k = m + n - 1 // Last position in nums1

  // While there are elements in nums2
  while (j >= 0) {
    // If there are no elements left in nums1, or current element in nums2 is greater
    if (i < 0 || nums2[j] > nums1[i]) {
      nums1[k] = nums2[j] // Place nums2's element in nums1
      j-- // Move to the next element in nums2
    } else {
      nums1[k] = nums1[i] // Place nums1's element in nums1
      i-- // Move to the next element in nums1
    }
    k-- // Move to the next position in nums1
  }
}

// Example usage:
// let nums1 = [1, 2, 3, 0, 0, 0];
// let m = 3;
// let nums2 = [2, 5, 6];
// let n = 3;

// merge(nums1, m, nums2, n);
// console.log(nums1); // Output: [1, 2, 2, 3, 5, 6]

const generateRandomArrayOfLengthNSorted = (n) => {
  return Array.from({ length: n }, () => Math.floor(100 * Math.random())).sort(
    (a, b) => a - b
  )
}

const n = 10
const m = 20
const arr1 = generateRandomArrayOfLengthNSorted(n)
const arr2 = generateRandomArrayOfLengthNSorted(m)
// const merged_arr = mergeArrays1(arr1 , n , arr2 , m)

// console.log({arr1 , arr2 , merged_arr});

/////////////////////////////

//Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

//my approach possibly bad.

var moveZeroes = function (nums) {
  const mapForStoringIndicesOfZeroes = new Map() // can use array!
  //all zeroes and no zeroes are possible edge cases
  for (let i = 0; i < nums.length; i++) {
    if (!nums[i]) {
      mapForStoringIndicesOfZeroes.set(0, [
        ...(mapForStoringIndicesOfZeroes.get(0) || []),
        i
      ])
    }
  }
  const positionOfAllZeroes = mapForStoringIndicesOfZeroes.get(0);
  positionOfAllZeroes.forEach((idx)=>{
    delete nums[idx];
  })

  nums.splice(nums.length-1,0 , ...positionOfAllZeroes.map(el => 0))

}


const nums = [0, 1, 0, 3, 12]
console.log({nums})
moveZeroes(nums)
console.log({nums})
