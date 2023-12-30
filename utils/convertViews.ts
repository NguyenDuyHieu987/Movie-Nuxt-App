type lookup = {
  value: number;
  symbol: string;
  fixed: number;
};

export function viewFormatter(num: string | number) {
  const lookup: lookup[] = [
    { value: 1, symbol: '', fixed: 0 },
    { value: 1e3, symbol: ' N', fixed: 0 },
    { value: 1e6, symbol: ' Tr', fixed: 1 },
    { value: 1e9, symbol: ' T', fixed: 2 },
    { value: 1e12, symbol: ' T', fixed: 2 },
    { value: 1e15, symbol: ' P', fixed: 2 },
    { value: 1e18, symbol: ' E', fixed: 2 }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item: lookup) {
      return +num >= item.value;
    });

  return item
    ? (+num / item.value).toFixed(item.fixed).replace(rx, '$1') + item.symbol
    : '';
}
