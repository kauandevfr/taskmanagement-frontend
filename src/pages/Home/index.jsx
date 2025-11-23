import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';
import { GlobalContext } from '../../providers/globalContext';
import addTask from '../../schemas/task/add';
import instance from '../../services/instance';
import './style.scss';
import UserModal from "../../components/UserModal";
import AlertModal from "../../components/AlertModal";
import { motion } from 'framer-motion'

export default function Home() {

    const { setValue, watch, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addTask)
    });

    const {
        setDeleteTask,
        setEditInfos,
        user,
        tasks,
        listTasks,
        listUser,
        setUserModal,
        showError,
        setAlertModal
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [filter, setFilter] = useState("all");

    const filtered = useMemo(() => {
        switch (filter) {
            case "active":
                return tasks.items.filter(t => !t.completed);
            case "completed":
                return tasks.items.filter(t => t.completed);
            default:
                return tasks.items; // all
        }
    }, [tasks, filter]);

    const counts = tasks.items.reduce(
        (acc, t) => {
            acc.total++;
            t.completed ? acc.completed++ : acc.active++;
            return acc;
        },
        { total: 0, active: 0, completed: 0 }
    );

    const handleAddTask = async data => {

        try {
            await instance.post('/task', { ...data, completed: false }, {});

            listTasks();

            setAlertModal({
                sucess: true,
                open: true,
                message: "Tarefa adicionada com sucesso."
            })
            setValue('description', '')

        } catch (error) {
            return showError(error)
        };

    };

    const completeTask = async (task) => {
        const payload = {
            completed: !task.completed,
            description: task.description
        }

        try {
            await instance.put(`/task/${task.id}`, payload)
            listTasks()
        } catch (error) {
            return showError(error)
        }
    };

    const changeTheme = async () => {


        const theme = user.data.theme === "light" ? "dark" : "light"

        try {
            await instance.put('/user', { theme })

            const html = document.querySelector('html');
            html.setAttribute('data-theme', theme);

            listUser();

        } catch (error) {
            return showError(error)
        }
    };

    useEffect(() => {
        listTasks()
    }, [])

    useEffect(() => {
        listUser()
        listTasks()
    }, [])

    return (
        <main className='page'>
            <header className='tasks-header '>
                <div className="tasks-header__content horizontal-align ai-center jc-between p2">
                    <h1 className='title'>Gerenciador de tarefas</h1>

                    <div className="horizontal-align gap1">
                        <button className='button'
                            onClick={() => changeTheme()}
                        >
                            <svg
                                className="theme-icon"
                                fill="var(--black)"
                                viewBox="-5.5 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M11.875 6v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.813 0.375-1.219 1.156-1.219s1.156 0.406 1.156 1.219zM14.219 9.25l1.438-2.031c0.469-0.625 1.063-0.75 1.656-0.313s0.656 1 0.188 1.688l-1.438 2c-0.469 0.688-1.031 0.75-1.656 0.313-0.594-0.438-0.656-0.969-0.188-1.656zM5.781 7.25l1.469 2c0.469 0.688 0.406 1.219-0.219 1.656-0.594 0.469-1.156 0.375-1.625-0.313l-1.469-2c-0.469-0.688-0.406-1.219 0.219-1.656 0.594-0.469 1.156-0.375 1.625 0.313zM10.719 11.125c2.688 0 4.875 2.188 4.875 4.875 0 2.656-2.188 4.813-4.875 4.813s-4.875-2.156-4.875-4.813c0-2.688 2.188-4.875 4.875-4.875zM1.594 11.813l2.375 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.75 0.969-1.563 0.719l-2.313-0.75c-0.781-0.25-1.063-0.75-0.844-1.5 0.25-0.719 0.75-0.938 1.531-0.688zM17.5 12.563l2.344-0.75c0.813-0.25 1.313-0.031 1.531 0.688 0.25 0.75-0.031 1.25-0.844 1.469l-2.313 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.031-1.219 0.813-1.469zM10.719 18.688c1.5 0 2.719-1.219 2.719-2.688 0-1.5-1.219-2.719-2.719-2.719s-2.688 1.219-2.688 2.719c0 1.469 1.188 2.688 2.688 2.688zM0.906 17.969l2.344-0.75c0.781-0.25 1.313-0.063 1.531 0.688 0.25 0.75-0.031 1.219-0.813 1.469l-2.375 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.063-1.219 0.844-1.469zM18.219 17.219l2.344 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.719 0.969-1.531 0.719l-2.344-0.781c-0.813-0.25-1.031-0.719-0.813-1.469 0.25-0.75 0.75-0.938 1.531-0.688zM3.938 23.344l1.469-1.969c0.469-0.688 1.031-0.781 1.625-0.313 0.625 0.438 0.688 0.969 0.219 1.656l-1.469 1.969c-0.469 0.688-1.031 0.813-1.656 0.375-0.594-0.438-0.656-1.031-0.188-1.719zM16.063 21.375l1.438 1.969c0.469 0.688 0.406 1.281-0.188 1.719s-1.188 0.281-1.656-0.344l-1.438-2c-0.469-0.688-0.406-1.219 0.188-1.656 0.625-0.438 1.188-0.375 1.656 0.313zM11.875 23.469v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.844 0.375-1.25 1.156-1.25s1.156 0.406 1.156 1.25z"></path>
                                </g>
                            </svg>
                        </button>

                        <button className='button'
                            onClick={() => setUserModal(true)}
                        >
                            <svg
                                className="user-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                    stroke="var(--black)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                    stroke="var(--black)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            </header>
            <section className='page-tasks center-align'>
                <form className='form-task horizontal-align p2 gap1' onSubmit={handleSubmit(handleAddTask)}>
                    <input
                        className={`input ${errors.description && 'error'}`}
                        type="text"
                        placeholder='Adicione uma tarefa...'
                        {...register('description')}
                        autoFocus
                        required
                    />
                    <button
                        className='button send-task'
                        type="submit"
                        disabled={!watch('description') && true}
                    >
                        <svg
                            fill="var(--white)"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z" />
                        </svg>
                    </button>
                </form>
                {errors.description && <span className="span-error">{errors.description?.message}</span>}
                <ul className='tasks-list center-align p2'>
                    <h1 className='title'>Suas tarefas</h1>
                    <div className="tasks-ordering horizontal-align gap1 w100">
                        <button
                            className={`button ${filter === "all" && "selected"}`}
                            type="button"
                            onClick={() => setFilter("all")}
                        >
                            Todas ({counts.total})
                        </button>

                        <button
                            className={`button ${filter === "active" && "selected"}`}
                            type="button"
                            onClick={() => setFilter("active")}
                        >
                            Ativas ({counts.active})
                        </button>

                        <button
                            className={`button ${filter === "completed" && "completed"}`}
                            type="button"
                            onClick={() => setFilter("completed")}
                        >
                            Concluídas ({counts.completed})
                        </button>
                    </div>
                    {tasks.loading ? <span>Carregando...</span>
                        : filtered.length ? filtered.map((task, index) => (
                            <motion.li className='tasks-row'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                key={task.id}>
                                <div className="horizontal-align gap1" onClick={() => completeTask(task)}    >
                                    <div className={`container-status ${task.completed && "completed"}`} ></div>
                                    <h2 className='task-description'
                                        style={{ textDecoration: task.completed && 'line-through' }}
                                    >
                                        {task.description}
                                    </h2>
                                </div>
                                <div className='task-actions'>
                                    <button
                                        className='button'
                                        type='button'
                                        onClick={() => setEditInfos({ task, show: true })}
                                    >
                                        <svg
                                            className="edit-icon"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                                fill="var(--black)"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="button"
                                        type='button'
                                        onClick={() => setDeleteTask({ task: task, show: true })}
                                    >
                                        <svg
                                            className="delete-icon"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 11V17" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 11V17" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4 7H20" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.li>
                        )) :
                            <div className='without-list w100 center-align p2'>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005"
                                        stroke="var(--white)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Sem tarefas para listar</span>
                            </div>
                    }

                </ul>
            </section>
            <DeleteModal />
            <EditModal />
            <UserModal />
            <AlertModal />
        </main >
    )

}