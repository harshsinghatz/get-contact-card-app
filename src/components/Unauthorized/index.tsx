
const Unauthorized = () => {
    return (
        <div className="bg-red-500 flex flex-col items-center justify-center h-screen">
            <h1 className="text-white text-6xl font-medium">Unauthorized</h1>
            <p className="text-white text-2xl">You do not have access to this page.</p>
            <a href="/" className="my-2"><button className="bg-white text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded-lg">Go back</button></a>
        </div>
    );
};

export default Unauthorized;
