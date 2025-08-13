const TertiaryLabel = ({ children, className }) => {
    return (
        <div
            className={`${className} flex items-center text-secondary-foreground md:text-lg font-semibold`}
        >
            {children}
        </div>
    );
};

export default TertiaryLabel;
