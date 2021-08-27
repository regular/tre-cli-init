const help = require('../help')
const pkg = require('../package.json')

const bin = 'tre-cli-init'
const year = new Date().toISOString().split('-')[0]
const readme = `# ${bin}

\`\`\`
${help('tre-cli-init')}
\`\`\`

---
License: ${pkg.license} Copyright ${year} ${pkg.author}
`

console.log(readme)
