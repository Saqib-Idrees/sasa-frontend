
import Layout from "@/components/Layouts/DashLayout/Layout";
import SalesTeamCard from "@/components/cards/salesTeamCard";


const SalesTeam = () => {

    const Tailors = [
        {
            name: 'Ezio',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Lorenzo',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Altair',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Mario',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Madeci',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Chezare',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
        {
            name: 'Salvador',
            designation: 'Cuciture di Lusso',
            sales: 5
        },
    ]

    return (
        <Layout>
            <div className="min-h-[calc(100vh-120px)]">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

                    {Tailors.map((item, index) => {
                        return (
                            <div class="relative flex flex-col" key={index}>
                                <SalesTeamCard
                                    name={item.name}
                                    designation={item.designation}
                                    sales={item.sales}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default SalesTeam;