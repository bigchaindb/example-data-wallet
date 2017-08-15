import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class AppMenu extends Component {
    // TODO: read activeItem from URL or smth
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { name, publicKey } = this.props

        if (!name) {
            return null
        }

        return (
            <Menu pointing secondary>
                <Menu.Item>
                    Welcome back,&nbsp;<strong>{name}</strong>
                </Menu.Item>

                <Menu.Item
                    as={Link} to={`/profiles/${publicKey}`} name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}>
                    Home
                </Menu.Item>

                <Menu.Item
                    as={Link} to={`/profiles/${publicKey}/edit`} name='edit'
                    active={activeItem === 'edit'}
                    onClick={this.handleItemClick}>
                    Edit Profile
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        as={Link} to="/logout" name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
        )
    }
}
