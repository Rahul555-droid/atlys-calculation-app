//nums[l]+nums[r]+nums[k] = 0;
//nums[l]+nums[r] = -nums[k]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (!nums.length) return []
  const n = nums.length

  //sort the array
  nums.sort((a, b) => a - b)
  const mapObj = {}

  for (let i = 0; i < n; i++) {
    mapObj[nums[i]] = mapObj?.[nums[i]] ? [...mapObj[nums[i]], i] : [i]
  }

  // triplets cannot be at same location
  console.log({mapObj})

  let l = 0
  let r = n - 1
  let result = []

  while (l + 1 < r) {
    let lsumr = nums[l] + nums[r]
    let complement = -lsumr
    while (!mapObj[complement]?.length && l + 1 < r) {
      lsumr = nums[l] + nums[r]
      complement = -lsumr
      r--
    }

    const allIndicesOfComplement = (mapObj?.[complement] || []).filter(
      (el) => el !== l && el !== r
    )
    console.log({ allIndicesOfComplement })
    if (mapObj[complement] && allIndicesOfComplement?.length) {
      console.log({ i: nums[l], j: nums[r], k: complement, l, r, nums })
      result.push([nums[l], nums[r], complement].toSorted((a, b) => a - b))
    }

    l++
  }

  return result
}

console.log({ output: threeSum([-1, 0, 1, 2, -1, -4]) })
