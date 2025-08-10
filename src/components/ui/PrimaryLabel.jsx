const PrimaryLabel = ({ children, className }) => {
    return (
        <div
            className={`${className} flex items-center text-neutral-800 dark:text-neutral-200/90 text-2xl md:text-3xl font-semibold`}
        >
            {children}
        </div>
    );
};

export default PrimaryLabel;
