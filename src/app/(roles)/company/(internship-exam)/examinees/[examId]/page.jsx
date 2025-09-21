export default async function Page({ params }) {
    const { examId } = await params;
    return <div>{examId}</div>;
}
