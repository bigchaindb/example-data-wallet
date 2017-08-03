/* eslint-disable no-unused-vars */
import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import HomeLoader from '../containers/HomeLoader'
import WalletLoader from '../containers/WalletLoader'
import ProfileLoader from '../containers/ProfileLoader'
import MenuLoader from '../containers/MenuLoader'
import LogoutLoader from '../containers/LogoutLoader'
import DashboardLoader from '../containers/DashboardLoader'
import EditLoader from '../containers/EditLoader'
/* eslint-enable no-unused-vars */

const App = () => (
    <div>
        <MenuLoader />
        <Route exact path="/" component={HomeLoader}/>
        <Route path="/wallet" component={WalletLoader}/>
        <Route path="/onboarding" component={ProfileLoader}/>
        <Container>
            <Route path="/profiles/:publicKey" component={DashboardLoader}/>
            <Route path="/edit/:publicKey" component={EditLoader}/>
            <Route path="/logout" component={LogoutLoader}/>
        </Container>
    </div>
)

export default App
