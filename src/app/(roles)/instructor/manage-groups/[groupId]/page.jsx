export default async function Page({ params }) {
    const { groupId } = await params;
    return <div>{groupId}</div>;
}
