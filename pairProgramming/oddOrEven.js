

const oddOrEven = (arr) => {
    let num = 0
    
    arr.forEach(function(number){
        num += number
    })

    return (num % 2 === 0) ? 'even' : 'odd'
    
}

const assert = require('assert')

describe('Whether the sume of all numbers in an array are odd or even', () => {

    it('Returns "even" if the sum is even ', () => {
        assert.equal(oddOrEven([1, 2, 3]), 'even')
    })

    it('Returns "odd" if the sum is odd ', () => {
        assert.equal(oddOrEven([1, 1, 3]), 'odd')
    })

})