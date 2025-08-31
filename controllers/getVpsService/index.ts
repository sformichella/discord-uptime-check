import { exec } from 'child_process'

import { GetVpsStatusArgs } from './types'

async function getVpsStatus(args: GetVpsStatusArgs) {
  const { address } = args

  return new Promise<'success' | 'failure'>((res, rej) => {
    exec(`ping ${address}`, (err, out, stderr) => {
      if (err) {
        res('failure')
        return
      }

      if (out.includes('Request timed out.')) {
        res('failure')
        return
      }

      res('success')
    })
  })
}

export {
  getVpsStatus,
}
