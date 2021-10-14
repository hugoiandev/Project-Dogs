import React from 'react'
import Input from '../../../Components/Forms/Input'
import Button from '../../../Components/Forms/Button'
import useForm from '../../../Hooks/useForm'
import { USER_POST } from '../../../Api/api'
import { UserContext } from '../../../UserContext'
import useFetch from '../../../Hooks/useFetch'
import Error from '../../../Helper/Error'
import Head from '../../../Helper/Head'

const LoginCreate = () => {
    const username = useForm()
    const email = useForm('email')
    const password = useForm()

    const {userLogin} = React.useContext(UserContext)
    const {loading, error, request} = useFetch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const {url, options} = USER_POST({
            username: username,
            email: email,
            password: password
        })
        const {response} = await request(url, options)
        if (response.ok) userLogin(username.value, password.value)
    }

    return (
        <section className='animeLeft'>
            <Head title='Criar Conta' />
            <h1 className='title'>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuário' type='text' name='username' {...username} />
                <Input label='Email' type='email' name='email' {...email} />
                <Input label='Senha' type='password' name='password' {...password} />
                {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
                <Error error={error} />
            </form>
        </section>
    )
}

export default LoginCreate
