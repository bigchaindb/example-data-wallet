import { push } from 'react-router-redux'
import bip39 from 'bip39'
import * as bdb from '../bdb' // eslint-disable-line import/no-namespace

const appId = 'app'

export function generateMnemonic() {
    return {
        type: 'GENERATE_MNEMONIC',
        seed: bip39.generateMnemonic()
    }
}

function mapTransactionToAction(dispatch, txid) {
    return bdb.getTransaction(txid)
        .then(tx => {
            switch (tx.asset.data.type) {
                case `${appId}:profile`:
                    dispatch({
                        type: 'ADD_PROFILE',
                        profile: {
                            ...tx.asset.data.profile,
                            _pk: tx.inputs[0].owners_before[0],
                            _tx: tx.id
                        }
                    })
                    break
                default:
                    console.log(`Dunno what to do with tx ${tx.id}`, tx)
            }
        })
}

export function setSeed(seed) {
    localStorage.setItem('seed', seed)

    return function (dispatch, getState) {
        const keypair = bdb.keypair(bip39.mnemonicToSeed(seed))

        dispatch({
            type: 'SET_KEYPAIR',
            publicKey: keypair.publicKey,
            privateKey: keypair.privateKey
        })

        bdb.getUnspents(keypair.publicKey)
            .then(txs => Promise.all(txs.map(mapTransactionToAction.bind(null, dispatch))))
            .then(_ => { // eslint-disable-line no-unused-vars
                const state = getState()
                const hasProfile = state.profiles.data[state.identity.keypair.publicKey]

                if (hasProfile) {
                    dispatch(push(`/profiles/${state.identity.keypair.publicKey}`))
                } else {
                    dispatch(push('/onboarding'))
                }
            })
    }
}

export function submitProfile(profile) {
    return function (dispatch, getState) {
        const { publicKey, privateKey } = getState().identity.keypair

        bdb.publish(publicKey, privateKey, { type: `${appId}:profile`, profile })
            .then(_ => { // eslint-disable-line no-unused-vars
                dispatch({
                    type: 'ADD_PROFILE',
                    profile: {
                        ...profile,
                        _pk: publicKey
                    }
                })
            })
            .then(_ => { // eslint-disable-line no-unused-vars
                dispatch(push(`/profiles/${publicKey}`))
            })
    }
}

export function logout() {
    localStorage.clear()
    window.location.href = '/'
}
