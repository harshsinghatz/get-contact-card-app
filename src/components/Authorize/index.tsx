import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Unauthorized from "../Unauthorized";

const Authorize = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();

    if (status === "unauthenticated" || !status) {
        return (<Unauthorized />);
    }

    return <div className="h-full">{children}</div>;
}

export default Authorize;