import UpdateInterests from "@/components/forms/UpdateInterests";
import PrivateFooter from "@/components/ui/PrivateFooter";
import Wrapper from "@/components/Wrapper";

export default async function Page() {
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
