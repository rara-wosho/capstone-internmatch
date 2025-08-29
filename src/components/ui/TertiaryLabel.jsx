const TertiaryLabel = ({ children, className }) => {
    return (
        <div
            className={`${className} flex items-center gap-2 text-secondary-foreground md:text-lg font-semibold`}
        >
            {children}
        </div>
    );
};

export default TertiaryLabel;
