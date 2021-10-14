import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import UserHeader from './UserHeader'
import Feed from '../Feed'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { UserContext } from '../../UserContext'
import NotFound from '../NotFound'
import Head from '../../Helper/Head'

const User = () => {
    const {data} = React.useContext(UserContext)
    const {path} = useRouteMatch()

    return (
        <section className='container'>
            <Head title='Minha Conta' />
            <UserHeader />
            <Switch>
                <Route exact path={`${path}/`} component={Feed} />
                <Route path={`${path}/postar`} component={UserPhotoPost} />
                <Route path={`${path}/estatisticas`} component={UserStats} />
                <Route path='*' component={NotFound} />
            </Switch>
        </section>
    )
}

export default User
