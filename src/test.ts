const {mux, batch, fetcher} = require('./batchql')
const f = mux(
    fetcher('https://api.graph.cool/simple/v1/FF'),
    100
)
const log = (...args) => console.log(...args)
console.clear()

f(`query test { allFiles { name } }`)
.then(d => log(d))

f(`query test { 
    allFiles { name contentType } 
    allUsers { name id }
}`)
.then(d => log(d))

f(`query test($x: [String!]!, $y: [ID!]){
    allUsers(filter: {name_in: $x, id_in: $y}) {
        name
        id
    }
}`, {x: ["Matt"], y: [1] })
.then(d => log(d))