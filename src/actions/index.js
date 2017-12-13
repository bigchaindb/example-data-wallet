import { push } from 'react-router-redux'
import bip39 from 'bip39'
import moment from 'moment'

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

export const profileAsset = new Asset(appId, 'profile', { name: 'string' })
export const datastreamAsset = new Asset(appId, 'datastream', { value: 'object' })

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
            datastreamAsset.updateStore(ev.asset_id, dispatch, getState)
        })

        dispatch(requestAsync())
        profileAsset.load(dispatch, getState)
            .then(() => {
                if (getActiveProfile(getState())) {
                    dispatch(push(`/profiles/${keypair.publicKey}`))
                } else {
                    dispatch(push('/onboarding'))
                }
                dispatch(receiveAsync())
            })
            .then(() => {
                datastreamAsset.load(dispatch, getState)
            })
    }
}

export function getActiveProfile(state) {
    if (state.identity &&
        state.identity.keypair &&
        state.profiles) {
        const { publicKey } = state.identity.keypair

        const activeProfile = Object.values(state.profiles)
            .filter(_profile => _profile._pk === publicKey)
        if (activeProfile.length) {
            return activeProfile[0]
        }
    }
    return null
}

export function submitProfile(profile) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair

        profileAsset.create(profile, dispatch, getState)
            .then(() => dispatch(push(`/profiles/${publicKey}`)))
    }
}

export function editProfile(profile) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair
        const activeProfile = getActiveProfile(getState())
        bdb.getTransaction(activeProfile._txId).then(tx => {
            profileAsset.transfer(tx, publicKey, profile, dispatch, getState)
                .then(() => dispatch(push(`/profiles/${publicKey}`)))
        })
    }
}

export function NewTransaction(payload) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair
        const activeProfile = getActiveProfile(getState())
        console.log(activeProfile,'found!',payload);
        const data = {
            time: moment.now(),
            payload
        }
        datastreamAsset.create(data, dispatch, getState)
            .then(() => dispatch(push(`/profiles/${publicKey}`)));
            
    }
}

export function mapPublicKeyToProfile(publicKey, state) {
    const filteredProfiles = Object.values(state.profiles)
        .filter(profile => profile._pk === publicKey)
    if (filteredProfiles.length) {
        return filteredProfiles[0].metadata
    }
    return null
}

export function logout() {
    localStorage.clear()
    window.location.href = '/'
}


export function submitDatastream(value) {
    return (dispatch, getState) => {
        const data = {
            time: moment.now(),
            value
        }
        datastreamAsset.create(data, dispatch, getState)
    }
}

export function editDatastream(txId, value) {
    return (dispatch, getState) => {
        const { publicKey } = getState().identity.keypair
        const data = {
            time: moment.now(),
            value
        }
        bdb.getTransaction(txId).then(tx => {
            datastreamAsset.transfer(tx, publicKey, data, dispatch, getState)
        })
    }
}
