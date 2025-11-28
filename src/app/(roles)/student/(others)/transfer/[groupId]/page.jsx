import SecondaryLabel from "@/components/ui/SecondaryLabel";

export default async function TransferPage({ params }) {
    const { groupId } = await params;

    if (!groupId) {
    }

    return (
        <div>
            <div className="mb-3">
                <SecondaryLabel>Transfer Group</SecondaryLabel>
            </div>
        </div>
    );
}
