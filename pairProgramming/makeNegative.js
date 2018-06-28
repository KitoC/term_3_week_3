const makeNegative = (num) => {
    
    console.log(typeof(num * -1))

    return (num > 0) ? num * -1 : 'this number is already negative'
    
    // if (num > 0) {
    //     num = ('-' + num)
    // } else {
    //     return 'this number is already negative'
    // }
    // return num
}

console.log(makeNegative(5))

const assert = require('assert')

describe('make negative', () => {
    it('convert number arguement, return it as a negative number.', () => {
        assert.strictEqual(makeNegative(6), -6)
    })
    it("if shes negative, return 'this num is already neg'", () => {
        assert.strictEqual(makeNegative(-5), 'this number is already negative')
    })
})