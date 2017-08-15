import React from 'react'
import { Container } from 'semantic-ui-react'

import Landing from './Landing'
import Wallet from './Wallet'


const Home = ({ name }) => name ? <Container><Wallet /></Container> : <Landing />

export default Home
