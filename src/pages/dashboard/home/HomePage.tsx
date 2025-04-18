import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import useAuth from "@/hooks/useAuth";
import React from "react";


const HomePage: React.FC = ({ }) => {
    const { user } = useAuth();
    return (
        <PageContentLayout title={`For you`}>

        </PageContentLayout>
    )
}

export default HomePage;