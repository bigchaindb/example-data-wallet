/* eslint-disable no-unused-vars */
import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import HomeLoader from '../containers/HomeLoader'
import PassphraseLoader from '../containers/PassphraseLoader'
import ProfileLoader from '../containers/ProfileLoader'
import MenuLoader from '../containers/MenuLoader'
import LogoutLoader from '../containers/LogoutLoader'
import WalletLoader from '../containers/WalletLoader'
import EditProfileLoader from '../containers/EditProfileLoader'
import NewTransactionLoader from '../containers/NewTransactionLoader'
import DatastreamLoader from '../containers/DatastreamLoader'
/* eslint-enable no-unused-vars */

const App = () => (
    <div>
        <MenuLoader />
        <Route exact path="/" component={HomeLoader}/>
        <Route path="/passphrase" component={PassphraseLoader}/>
        <Route path="/onboarding" component={ProfileLoader}/>
        <Container>
            <Route exact path="/profiles/:publicKey" component={WalletLoader}/>
            <Route path="/profiles/:publicKey/edit" component={EditProfileLoader}/>
            <Route path="/transaction/:publicKey/new" component={NewTransactionLoader}/>
            <Route path="/logout" component={LogoutLoader}/>
            <Route exact path="/datastreams/:transactionId" component={DatastreamLoader}/>
        </Container>
    </div>
)

export default App
