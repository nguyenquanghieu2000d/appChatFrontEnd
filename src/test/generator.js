function *loopRange(from, to) {
    for(let i = from;i<=to;i++) {
        yield i;
    }
    return to + 1;
}
const range = loopRange(0,10);
console.log(range.next());
console.log(range.next());
console.log(range.next());
console.log(range.next());
for(const i of range) {
    console.log(i);
}

