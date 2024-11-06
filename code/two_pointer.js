//maximum sum in array but you can only pick from both ends or either ends for a given max count k;

const arr = [6, 2, 3, 4, 7, 2, 1, 7, 1]
const k = 4

const max_sum_k_edges = (arr, k) => {
  let n = arr.length
  let l_sum = 0
  let r_sum = 0
  let max_sum = 0

  for (let i = 0; i < k; i++) l_sum += arr[i]

  max_sum = l_sum
  let r_index = n - 1

  for (let j = k - 1; j >= 0; j--) {
    l_sum = l_sum - arr[j]
    r_sum = r_sum + arr[r_index]
    max_sum = Math.max(max_sum, l_sum + r_sum)
    r_index = r_index - 1
  }

  return max_sum
}

console.log(max_sum_k_edges(arr, k))
