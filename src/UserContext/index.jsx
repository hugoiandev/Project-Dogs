import React from "react";
import { TOKEN_POST, TOKEN_VALIDADE_POST, USER_GET } from "../Api/api";
import { useHistory } from 'react-router-dom'

export const UserContext = React.createContext()

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [error, setError] = React.useState(null)
    const history = useHistory()

    const getUser = async (token) => {
        const {url, options} = USER_GET(token)

        const userRes = await fetch(url, options)
        const json = await userRes.json()
        setData(json)
        setLogin(true)
    }

    const userLogin = async (username, password) => {
        try {
            setError(null)
            setLoad(true)

            const {url, options} = TOKEN_POST({username, password})
            const tokenRes = await fetch(url, options)
            if (!tokenRes.ok) throw new Error('Usuário inválido!')
            const {token} = await tokenRes.json()
            window.localStorage.setItem('token', token)
            await getUser(token)
            history.push('/conta')
        } catch (err) {
            setError(err.message)
            setLogin(false)
        } finally {
            setLoad(false)
        }
    }

    const userLogout = React.useCallback(() => {
        setData(null)
        setError(null)
        setLoad(false)
        setLogin(false)
        window.localStorage.removeItem('token')
        history.push('/login')
        
    }, [history])

    React.useEffect(() => {
        const autoLogin = async () => {
            const token = window.localStorage.getItem('token')
            if (token) {
                try {
                    setError(null)
                    setLoad(true)
                    const {url, options} = TOKEN_VALIDADE_POST(token)
                    const response = await fetch(url, options)
                    if (!response.ok) throw new Error('Token inválido')
                    await getUser(token)
                } catch (err) {
                    userLogout()
                } finally {
                    setLoad(false)
                }
            } else {
                setLoad(false)
            }
        }
        autoLogin()
    }, [userLogout])

    return (
        <UserContext.Provider value={{
            userLogin,
            userLogout,
            data,
            error,
            load,
            login
            
        }}>
            {children}
        </UserContext.Provider>
    )
}
