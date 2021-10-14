import React from 'react'
import { Route, useHistory } from 'react-router'
import { UserContext } from '../UserContext'

const ProtectedRoute = (props) => {
    const {login} = React.useContext(UserContext)
    const history = useHistory()

    if (login === true) {
        return <Route {...props} />
    } else if (login === false) {
        history.push('/login')
    } else {
        return null
    }


}

export default ProtectedRoute
