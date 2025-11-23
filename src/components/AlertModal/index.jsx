import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from "../../providers/globalContext";

import './style.scss'
import { useEffect } from "react";

export default function AlertModal() {

    const { alertModal, setAlertModal } = useGlobalContext()

    useEffect(() => {
        if (!alertModal.open) return;

        const timer = setTimeout(() => {
            setAlertModal({
                open: false, message: "", sucess: null, id: null,
            });
        }, 4000);
        return () => clearTimeout(timer);
    }, [alertModal.open]);
    return (
        <AnimatePresence>
            {alertModal.open &&
                <motion.div className="alert"
                    style={{ backgroundColor: alertModal.sucess ? 'var(--green-1000)' : 'var(--red-1000)' }}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                >
                    <span>{alertModal.message}</span>
                </motion.div>
            }
        </AnimatePresence>
    )
}