import { useSession } from "next-auth/react";
import { ReactNode } from "react";

const Authorize = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();

    if (status === "unauthenticated" || !status) {
        return (<>Unauthenticated User</>);
    }

    return <div>{children}</div>;
}

export default Authorize;