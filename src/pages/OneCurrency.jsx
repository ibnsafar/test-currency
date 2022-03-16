import { useParams } from "react-router-dom";

const OneCurrency = () => {
    const params = useParams()
    return (
        <>
            <p>{params.id}</p>
        </>
    )
}
export default OneCurrency;