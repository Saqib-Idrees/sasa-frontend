import { BsGraphUpArrow } from "react-icons/bs";

// {tailorName, orders, shopName, location}
const SalesTeamCard = ({ name, designation, sales }) => {

    return (
        <div className="p-5 bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100">
            <div className="mb-2">
                <h6 className="mb-0 font-bold text-black text-2xl">{name}</h6>
            </div>
            <div>
                <div className="mb-6">{designation}</div>
                <div className="w-full flex items-center">
                    <div className="me-3"><BsGraphUpArrow color="#2AE286" size={22} /></div>
                    <div>Orders: {sales}</div>
                </div>
            </div>
        </div>
    )
}

export default SalesTeamCard;