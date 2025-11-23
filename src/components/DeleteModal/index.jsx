import './style.scss'
import instance from '../../services/instance';
import { useContext } from 'react';
import { GlobalContext } from '../../providers/globalContext';
import ModalBase from '../ModalBase';

export default function DeleteModal() {

    const { deleteTask, setDeleteTask, showError, listTasks } = useContext(GlobalContext)

    const handleClose = () => {
        setDeleteTask({ task: {}, show: false })
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const id = deleteTask.task.id

        try {
            await instance.delete(`/task/${id}`)
            handleClose()
            listTasks()
        } catch (error) {
            return showError(error)
        }
    }

    return (
        <ModalBase
            title={`Excluir ${deleteTask.task?.description}?`}
            isOpen={deleteTask.show}
            onClose={handleClose}
            onSubmit={handleDelete}
        >
            <svg
                className='alert-icon'
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http:www.w3.org/2000/svg"
            >
                <path
                    d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z"
                    stroke="var(--white)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 8V13"
                    stroke="var(--white)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M12 16V15.9888"
                    stroke="var(--white)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            <span className='subtitle'>Tem certeza de que deseja excluir essa tarefa?</span>
            <button className='button' type='button' onClick={handleDelete}>Concluir</button>
        </ModalBase>
    )
}