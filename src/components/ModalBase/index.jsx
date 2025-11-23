import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";


export default function ModalBase({ title, children, isOpen, onClose, onSubmit }) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='center-align modal-bg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    <motion.form className='modal-content vertical-align'
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={onSubmit}
                    >
                        <header className="horizontal-align ai-center w100 jc-between">
                            <h1 className='title'>{title}</h1>
                            <button className='button'
                                type='button'
                                onClick={onClose}>
                                <svg
                                    className="close-icon"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="var(--black)"
                                >
                                    <path
                                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                                        fill="var(--black)"
                                    />
                                </svg>
                            </button>
                        </header>
                        {children}
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}