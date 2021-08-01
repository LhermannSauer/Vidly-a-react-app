export function filterList(items, filterProp, value){
    console.log('items', items);
    console.log('filterProp', filterProp);
    console.log('value', value);

    if (value === null) return items;
    console.log("value", value);
    console.log(items[0][filterProp])
    return items.filter(item => item[filterProp] === value);
}