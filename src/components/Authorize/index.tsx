import { useSession } from "next-auth/react";

const Authorize = ({children}) => {
    const { status } = useSession();

    if (status === "unauthenticated" || !status) {
        return (<>Unauthenticated User</>);
    }

    return <div>{children}</div>;
}

export default Authorize;