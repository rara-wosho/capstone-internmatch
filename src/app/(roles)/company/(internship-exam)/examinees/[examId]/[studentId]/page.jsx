export default async function Page({ params }) {
    const { studentId } = await params;
    return <div>{studentId}</div>;
}
