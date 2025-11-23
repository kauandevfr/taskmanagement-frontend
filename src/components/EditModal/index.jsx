import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../providers/globalContext';
import updateTask from '../../schemas/task/update';
import instance from '../../services/instance';
import ModalBase from '../ModalBase';
import './style.scss';

export default function EditModal() {

    const { editInfos, setEditInfos, listTasks, setAlertModal } = useContext(GlobalContext)

    const { setValue, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateTask)
    });

    const handleClose = () => { setEditInfos({ task: {}, show: false }) }

    const handleEdit = async data => {
        const id = editInfos.task.id
        try {
            await instance.put(`/task/${id}`, data)

            setAlertModal({
                sucess: true,
                open: true,
                message: "Tarefa atualizada com sucesso."
            })

            handleClose()
            listTasks()
        } catch (error) {
            return console.log(error)
        }
    }

    useEffect(() => {
        if (editInfos.show) {
            const task = editInfos.task

            console.log(task)

            setValue("description", task.description)
            setValue("completed", task.completed)
        }
    }, [editInfos.show])

    return (

        <ModalBase
            title="Editar tarefa"
            isOpen={editInfos.show}
            onClose={handleClose}
            onSubmit={handleSubmit(handleEdit)}
        >
            <div className="horizontal-align gap1 w100">
                <input
                    className='input-checkbox'
                    type="checkbox"
                    {...register("completed")}
                />

                <textarea className={`input ${errors.description && 'error'}`}
                    {...register('description')}
                    rows={6}
                    autoFocus
                ></textarea>
            </div>
            {errors.description && <span className='span-error'>{errors.description.message}</span>}
            <button
                className='button'
                type='submit'>
                Concluir
            </button>
        </ModalBase>
    )
}