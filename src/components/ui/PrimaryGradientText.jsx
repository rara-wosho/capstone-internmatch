export default function PrimaryGradientText({ children }) {
    return (
        <span className="bg-clip-text text-transparent bg-linear-to-t from-violet-800 to-violet-400 dark:to-violet-300">
            {children}
        </span>
    );
}
