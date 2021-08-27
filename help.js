module.exports = bin =>
`USAGE

  ${require('./usage')(bin)}

DESCRIPTION

  ${bin} creates the file .trerc in the current working directory. .trerc serves the same purpose as ~/.ssb/config in traditional ssb setups. A new, random network-id (caps.shs) will be created. The network-id is a public key. The matching prcate key is stored in .trerc/network-keys. An additional keypair is created and stored in .tre/browser-keys.

  In case they did not exist before, new keypairs are created in .tre/secret and .tre/browser-keys

  --output OUTDIR      where .trerc should be created. Defaults to current directory.
  --copy-keys          copy keypair from ~/.ssb/secret
  --copy-keys=KEYFILE  copy keypair from KEYFILE
  --help               show help

EXAMPLE

  ${bin} --dryRun
`
