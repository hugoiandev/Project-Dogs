import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../../Components/Forms/Input'
import Button from '../../../Components/Forms/Button'
import useForm from '../../../Hooks/useForm'
import { UserContext } from '../../../UserContext'
import Error from '../../../Helper/Error'
import styles from './LoginForm.module.css'
import stylesBtn from '../../../Components/Forms/Button/Button.module.css'
import Head from '../../../Helper/Head'

const LoginForm = () => {
    const username = useForm()
    const password = useForm()

    const {userLogin, error, load} = React.useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value)
        }
        
    }

    return (
        <section className='animeLeft'>
            <Head title='Login' />
            <h1 className='title'>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    name='username'
                    label='Usuário'
                    type='text'
                    { ...username }
                />
                <Input
                    name='password'
                    label='Senha'
                    type='password'
                    { ...password }
                />
                {load ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
                <Error error={error && 'Dados incorretos.'} />
            </form>
            <Link className={styles.perdeu} to='/login/perdeu'>
                Esqueceu a senha ?
            </Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta ? Cadastre-se no site.</p>
                <Link className={stylesBtn.button} to='/login/criar'>
                    Cadastro
                </Link>
            </div>
        </section>
    )
}

export default LoginForm
