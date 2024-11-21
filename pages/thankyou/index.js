import React from "react";
import Layout from "@/components/Layouts/DashLayout/Layout";
import Link from "next/link";

const Thankyou = () => {
    return (
        <>
            <Layout>
                <div className="text-center flex flex-wrap items-center justify-center">
                    <div>
                        <img src="/assets/images/check_circle.png" className="mx-auto mb-6" />
                        <h4 className="text-2xl mb-5">Order has been placed</h4>
                        <Link href="/orders" className="flex items-center mx-auto w-fit"><img src="/assets/images/keyboard_return.png" className="me-4" />Return to Dashboard</Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Thankyou;