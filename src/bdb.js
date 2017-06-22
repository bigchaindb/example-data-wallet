// TODO: Import specific modules
import * as driver from 'bigchaindb-driver'


export const BDB_SERVER_URL = process.env.REACT_APP_BDB_SERVER_URL || 'http://localhost:9984'
console.log('BDB_SERVER_URL', BDB_SERVER_URL)
export const BDB_API_PATH = `${BDB_SERVER_URL}/api/v1/`

const conn = new driver.Connection(BDB_API_PATH)

export const keypair = (seed) => new driver.Ed25519Keypair(seed.slice(0, 32))

export const publish = (publicKey, privateKey, payload) => {
    // Create a transation
    const tx = driver.Transaction.makeCreateTransaction(
        payload,
        null,
        [
            driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(publicKey))
        ],
        publicKey
    )

    // sign/fulfill the transaction
    const txSigned = driver.Transaction.signTransaction(tx, privateKey)

    // send it off to BigchainDB
    return conn.postTransaction(txSigned)
        .then(() => txSigned)
}

export const getUnspents = (publicKey, callback) =>
    conn
        .listOutputs({
            public_key: publicKey,
            unspent: 'true'
        })
        .then(unspents => unspents.map(elem => elem.split('/')[2]))


export const getTransaction = (txId) =>
    new Promise((resolve, reject) => {
        const txLocal = localStorage.getItem(txId)
        if (txLocal) {
            resolve(JSON.parse(txLocal))
        } else {
            conn.getTransaction(txId)
                .then(tx => {
                    localStorage.setItem(txId, JSON.stringify(tx))
                    resolve(tx)
                })
                .catch(reason => reject(reason))
        }
    })
