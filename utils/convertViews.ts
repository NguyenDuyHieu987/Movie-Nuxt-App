export function viewFormatter(num: any) {
  const lookup = [
    { value: 1, symbol: '', fixed: 0 },
    { value: 1e3, symbol: ' N', fixed: 0 },
    { value: 1e6, symbol: ' Tr', fixed: 1 },
    { value: 1e9, symbol: ' T', fixed: 2 },
    { value: 1e12, symbol: ' T', fixed: 2 },
    { value: 1e15, symbol: ' P', fixed: 2 },
    { value: 1e18, symbol: ' E', fixed: 2 }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item: any) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(item.fixed).replace(rx, '$1') + item.symbol : '0'
}

// export function ViewFormatter(num) {
//   if (num >= 1000000000) {
//     return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' T';
//   }
//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Tr';
//   }
//   if (num >= 1000) {
//     return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' N';
//   }
//   return num;
// }
