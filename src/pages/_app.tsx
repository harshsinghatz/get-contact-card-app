import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ToastContext from "../context/ToastContext";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Toast, { statusType } from "../components/Toast";
import { useEffect, useMemo, useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [toast, setToast] = useState<{
    message: string,
    status: statusType,
  }>({
    message: '',
    status: '',
  });
  const addToast = ({ message, status }: { message: string, status: statusType }) => {
    setToast({ message, status });
  }
  const onToastCancel = () => {
    setToast({ message: '', status: '' });
  }

  const value = useMemo(() => ({
    addToast
  }), []);

  useEffect(() => {
    setTimeout(() => {
      onToastCancel();
    }, 2500);
  }, [toast.message, toast.status]);

  return (
    <SessionProvider session={session}>
      <ToastContext.Provider value={value}>
        <Component {...pageProps} />
        {
          toast.message && toast.status && <Toast message={toast.message} onToastCancel={onToastCancel} status={toast.status} />
        }
      </ToastContext.Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
