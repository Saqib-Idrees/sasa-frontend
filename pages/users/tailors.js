import Layout from "@/components/Layouts/DashLayout/Layout";
import TailorCard from "@/components/cards/tailorCard";

const Tailors = () => {

    const Tailors = [
        {
            tailorName: 'Ezio',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Lorenzo',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Altair',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Mario',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Madeci',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Chezare',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
        {
            tailorName: 'Salvador',
            orders: 5,
            shopName: 'Cuciture di Lusso',
            location: 'Venice, Italy'
        },
    ]

    return (
        <Layout>
            <div className="min-h-[calc(100vh-120px)]">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

                    {Tailors.map((item, index) => {
                        return (
                            <div className="relative flex flex-col" key={index}>
                                <TailorCard
                                    tailorName={item.tailorName}
                                    orders={item.orders}
                                    shopName={item.shopName}
                                    location={item.location}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Tailors;