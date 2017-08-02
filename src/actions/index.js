import { push } from 'react-router-redux'
import bip39 from 'bip39'

import * as bdb from '../bdb' // eslint-disable-line import/no-namespace
import Asset from './asset'

const appId = 'app'


export const REQUEST_ASYNC = 'REQUEST_ASYNC'
export const RECEIVE_ASYNC = 'RECEIVE_ASYNC'

export const requestAsync = () => ({
    type: REQUEST_ASYNC
})

export const receiveAsync = () => ({
    type: RECEIVE_ASYNC
})

export function generateMnemonic() {
    return {
        type: 'GENERATE_MNEMONIC',
        seed: bip39.generateMnemonic()
    }
}

export const profileAsset = new Asset(appId, 'profile')

export function setSeed(seed) {
    localStorage.setItem('seed', seed)

    return (dispatch, getState) => {
        const keypair = bdb.keypair(bip39.mnemonicToSeed(seed))

        dispatch({
            type: 'SET_KEYPAIR',
            publicKey: keypair.publicKey,
            privateKey: keypair.privateKey
        })


        bdb.connect((ev) => {
            profileAsset.updateStore(ev.asset_id, dispatch, getState)
        })

        dispatch(requestAsync())
        profileAsset.load(dispatch, getState)
            .then(() => {
                const state = getState()
                const hasProfile = Object.values(state.profiles)
                    .filter(profile => profile._pk === state.identity.keypair.publicKey)

                if (hasProfile.length) {
                    dispatch(push(`/profiles/${keypair.publicKey}`))
                } else {
                    dispatch(push('/onboarding'))
                }
                dispatch(receiveAsync())
            })
    }
}

export function submitProfile(profile) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair

        profileAsset.create(profile, dispatch, getState, profile)
            .then(() => dispatch(push(`/profiles/${publicKey}`)))
    }
}

export function editProfile(profile) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair
        const state = getState()
        const hasProfile = Object.values(state.profiles)
            .filter(_profile => _profile._pk === state.identity.keypair.publicKey)
        const txId = hasProfile[0]._txLastId
        bdb.getTransaction(txId).then(tx => {
            profileAsset.transfer(tx, publicKey, profile, dispatch, getState)
                .then(() => dispatch(push(`/profiles/${publicKey}`)))
        })
    }
}

export function mapPublicKeyToProfile(publicKey, state) {
    const filteredProfile = Object.values(state.profiles)
        .filter(profile => profile._pk === publicKey)
    if (filteredProfile.length) {
        return filteredProfile[0].metaData
    }
    return null
}

export function logout() {
    localStorage.clear()
    window.location.href = '/'
}
