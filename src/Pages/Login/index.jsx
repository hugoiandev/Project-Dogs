import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'
import { UserContext } from '../../UserContext'
import styles from './Login.module.css'
import NotFound from '../../Components/NotFound'


const Login = () => {
    const { path } = useRouteMatch()
    const {login} = React.useContext(UserContext)

    if (login) return <Redirect to='/conta' />
    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Switch>
                    <Route exact path={`${path}`} component={LoginForm} />
                    <Route path={`${path}/criar`} component={LoginCreate} />
                    <Route path={`${path}/perdeu`} component={LoginPasswordLost} />
                    <Route path={`${path}/resetar`} component={LoginPasswordReset} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </section>
    )
}

export default Login
