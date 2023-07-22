import { Web3Storage } from 'web3.storage'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NjcxQTNlRkMwQWNiOWJCOGRlMTkxRTU3ZjczNGZGYjExRUI4YTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMjgwMTE0MzYsIm5hbWUiOiJ6YXAifQ.w7Y43yX2S0etFLtbzthh3duoO6FYokHvmX-r9_ddElA'

function makeStorageClient () {
    return new Web3Storage({ token: TOKEN })
}

export async function ipfs_retrieve (cid) {
    console.log(`Retrieving ${cid}`)
    const client = makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response for ${cid}: ${JSON.stringify(res)}`)
    return res
}