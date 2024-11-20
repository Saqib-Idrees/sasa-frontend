import { FaClipboardList } from "react-icons/fa";

// {tailorName, orders, shopName, location}
const TailorCard = ({ tailorName, orders, shopName, location }) => {

    return (
        <div className="p-5 bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100">
            <div className="flex mb-5">
                <div className="w-1/2">
                    <h6 className="mb-0 font-bold text-black text-xl">{tailorName}</h6>
                </div>
                <div className="w-1/2">
                    <div className="w-full flex items-center justify-end">
                        <div className="me-3"><FaClipboardList color="#2AE286" size={18} /></div>
                        <div className="text-sm">Orders: {orders}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-sm mb-1">Suits Tailor</div>
                <div className="text-sm mb-1">Shop name: {shopName}</div>
                <div className="text-sm">Location: {location}</div>
            </div>
        </div>
    )
}

export default TailorCard;