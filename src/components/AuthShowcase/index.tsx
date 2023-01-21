import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
    return (
        <button
            className="rounded-full bg-gray-800 text-gray-100 px-10 py-3 font-semibold no-underline transition hover:bg-gray-600"
            onClick={sessionData ? () => signOut() : () => signIn()}
        >
            {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
};

export default AuthShowcase;