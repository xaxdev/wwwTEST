'use strict'

const client = require('./client')
console.log('test-->',client);
// if (require.main === module) {
//   client.main()
//     .then(() => process.exit(0))
// }

module.exports = client
