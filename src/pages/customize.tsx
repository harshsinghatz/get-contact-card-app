import Authorize from "../components/Authorize";
import Form from "../components/Form"
import Navbar from "../components/Navbar";

const Customize = () => {
    return <Authorize>
        <Navbar />
        <Form />
    </Authorize>;
}

export default Customize;