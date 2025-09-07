import UpdateInterests from "@/components/forms/UpdateInterests";
import PrivateFooter from "@/components/ui/PrivateFooter";
import SecondaryLabel from "@/components/ui/SecondaryLabel";
import Wrapper from "@/components/Wrapper";
import { getCurrentUser } from "@/lib/actions/auth";

export default async function Page() {
    const { user, error } = await getCurrentUser();

    if (!error) {
        console.log("current user:", user);
    }
    return (
        <>
            <div className="min-h-svh flex-col flex py-12">
                <Wrapper size="sm">
                    <UpdateInterests
                        //interestId=undefined => intentionally leave interestId to undefined to perform insert, otherwise update
                        buttonLabel="Save Skills and Interests"
                    />
                </Wrapper>
            </div>

            <PrivateFooter />
        </>
    );
}
