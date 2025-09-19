import UploadAvatar from "@/components/UploadAvatar";

export default async function Page({ params }) {
    const { userId } = await params;
    return (
        <div>
            <UploadAvatar />
        </div>
    );
}
