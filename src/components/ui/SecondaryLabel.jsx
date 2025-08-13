const SecondaryLabel = ({ children, className }) => {
    return (
        <div
            className={`${className} flex items-center text-secondary-foreground text-lg md:text-2xl font-semibold`}
        >
            {children}
        </div>
    );
};

export default SecondaryLabel;
