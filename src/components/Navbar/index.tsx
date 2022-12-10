import AuthShowcase from "../AuthShowcase";

const Navbar = () => {
    return (<header className="flex justify-between mx-6 my-4 items-center">
        <span className="text-3xl">Give Contact Card</span>
        <AuthShowcase />
    </header>
    );
}

export default Navbar;