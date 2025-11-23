import { createContext, useCallback, useContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext({});
import instance from "../services/instance";

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export function GlobalProvider({ children }) {
    const [deleteTask, setDeleteTask] = useState({
        id: '',
        show: false
    })

    const [editInfos, setEditInfos] = useState([])

    const [user, setUser] = useState({ data: {}, loading: true })

    const listUser = async () => {
        try {
            const { data } = await instance.get('/user')

            setUser({ data, loading: false })

            const html = document.querySelector("html");
            html.setAttribute("data-theme", data.theme);

        } catch (error) {
            return showError(error)
        }
    }

    const [tasks, setTasks] = useState({
        loading: true,
        items: []
    });

    const listTasks = async () => {

        setTasks({
            loading: true,
            items: []
        })

        try {
            const { data } = await instance.get('/tasks')

            return setTasks({
                loading: false,
                items: data
            })

        } catch (error) {
            return showError(error)
        }
    };

    const [userModal, setUserModal] = useState(false)

    const genId = () =>
        (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    const [alertModal, _setAlertModal] = useState({
        open: false, message: "", id: null, sucess: null
    });

    const setAlertModal = useCallback((next) => {
        _setAlertModal(prev => {
            const resolved = typeof next === "function" ? next(prev) : next;
            if (resolved?.open) {
                return { id: genId(), message: "", ...resolved };
            }
            return resolved;
        });
    }, []);

    const showError = error => {
        console.error(error)
        const data = error.response?.data;
        const message = data?.message || data || "Erro interno. Tente novamente mais tarde.";
        setAlertModal({
            open: true,
            message,
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                deleteTask,
                setDeleteTask,

                editInfos,
                setEditInfos,

                user,
                setUser,

                listUser,

                listTasks,
                tasks,
                setTasks,

                userModal,
                setUserModal,

                alertModal,
                setAlertModal,

                showError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}