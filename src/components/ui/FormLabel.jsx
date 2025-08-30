export default function FormLabel({ required = false, children }) {
    return (
        <p className="inline-flex gap-1 text-secondary-foreground text-sm mb-1.5">
            {children}
            {required && <span className="text-destructive">*</span>}
        </p>
    );
}
