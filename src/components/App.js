import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import HomeLoader from '../containers/HomeLoader'
import WalletLoader from '../containers/WalletLoader'
import ProfileLoader from '../containers/ProfileLoader'
import MenuLoader from '../containers/MenuLoader'
import LogoutLoader from '../containers/LogoutLoader'
import DashboardLoader from '../containers/DashboardLoader'


const App = () => (
    <div>
        <MenuLoader />
        <Route exact path="/" component={HomeLoader}/>
        <Route path="/wallet" component={WalletLoader}/>
        <Route path="/onboarding" component={ProfileLoader}/>
        <Container>
            <Route path="/profiles/:publicKey" component={DashboardLoader}/>
            <Route path="/logout" component={LogoutLoader}/>
        </Container>
    </div>
)

export default App
