import Image from "next/image";
import SecondaryLabel from "../ui/SecondaryLabel";

export default function ErrorDisplay({ message }) {
    return (
        <div className="py-16 flex flex-col items-center justify-center">
            <Image
                src="/images/error.svg"
                alt="error"
                width={300}
                height={300}
                className="opacity-60"
            />

            <SecondaryLabel>Oopps...</SecondaryLabel>
            <p className="text-center text-muted-foreground mt-2">
                Something went wrong. Please try again later.
            </p>
            <p>{message}</p>
        </div>
    );
}
