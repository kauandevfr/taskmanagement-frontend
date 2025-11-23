

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import instance from '../../services/instance'
import './style.scss'
import AlertModal from '../../components/AlertModal'
import { useGlobalContext } from '../../providers/globalContext'
import { useForm } from 'react-hook-form'

export default function Login() {
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm({});

    const { showError, setAlertModal } = useGlobalContext()

    const handleLogin = async data => {

        try {
            await instance.post('/user/login', data);

            setAlertModal({
                sucess: true,
                open: true,
                message: 'Login realizado com sucesso.'
            })

            return navigate('/dashboard')
        } catch (error) {
            return showError(error)
        }

    }

    return (
        <main className='page center-align'>
            <form className='form vertical-align' onSubmit={handleSubmit(handleLogin)}>
                <div className="access-account vertical-align gap1">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005"
                                stroke="var(--white)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h1 className='title'>Gerenciamento de Tarefas</h1>
                    <h2 className='subtitle'>Entre com suas credenciais para acessar sua conta.</h2>
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className="input"
                        type="email"
                        placeholder='Digite um email'
                        id='email'
                        required
                        {...register('email')} />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        id='password'
                        {...register('password')} />
                </div>
                <button className='button w100 bg-blue-1000 bg-blue-1000 text-color-white' type='submit'>Iniciar Sessão</button>
                <Link className='link' to='/register'>Não tem uma conta? Registre-se</Link>
            </form>
            <AlertModal />
        </main>
    )

}