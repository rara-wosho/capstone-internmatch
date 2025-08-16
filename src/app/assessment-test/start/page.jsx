import Wrapper from "@/components/Wrapper";

export default async function Page() {
    await new Promise((res) => setTimeout(res, 2000));
    return (
        <div>
            <Wrapper size="sm">Start Test</Wrapper>
        </div>
    );
}
