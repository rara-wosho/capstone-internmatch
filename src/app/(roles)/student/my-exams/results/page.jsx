import PrimaryLabel from "@/components/ui/PrimaryLabel";
import SecondaryLabel from "@/components/ui/SecondaryLabel";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
    return (
        <div>
            <div className="mb-5">
                <SecondaryLabel>My Examination Results</SecondaryLabel>
            </div>
            <Tabs defaultValue="all" className="">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    Make changes to your account here.
                </TabsContent>
                <TabsContent value="accepted">
                    Change your password here.
                </TabsContent>
                <TabsContent value="pending">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
}
