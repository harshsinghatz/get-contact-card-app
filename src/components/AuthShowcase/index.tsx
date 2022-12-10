import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
    // console.log(sessionData);
    return (
        <button
            className="rounded-full bg-blue-400 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => signOut() : () => signIn()}
        >
            {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
};

export default AuthShowcase;