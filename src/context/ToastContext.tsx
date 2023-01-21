import { createContext } from "react";
import { statusType } from "../components/Toast";

const ToastContext = createContext({
    addToast: ({ message, status }: { message: string, status: statusType }) => {
        console.log('Toast!');
    }
});

export default ToastContext;