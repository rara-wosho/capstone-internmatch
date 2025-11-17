export function ApplicationCannotProceed({ message, companyName }) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                color: "#333",
                lineHeight: "1.6",
                fontSize: "16px",
                backgroundColor: "rgb(250,250,250)",
                borderRadius: "12px",
                boxShadow: "0 3px 20px rgba(100,100,100,0.1)",
                maxWidth: "600px",
            }}
        >
            <div
                style={{
                    borderRadius: "12px 12px 0 0",
                    padding: "16px 12px",
                    backgroundColor: "#FF9800",
                }}
            >
                <h1
                    style={{
                        color: "white",
                        fontSize: "30px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Internship Status Update
                </h1>
            </div>
            <div
                style={{
                    padding: "20px",
                }}
            >
                <h2
                    style={{
                        color: "#FF9800",
                        fontWeight: "700",
                        paddingBlock: "20px",
                    }}
                >
                    Internship Cannot Proceed
                </h2>
                <p>
                    We're writing to inform you that your accepted internship
                    application with <strong>{companyName}</strong> has been
                    marked as{" "}
                    <strong style={{ color: "#FF9800" }}>cannot proceed</strong>{" "}
                    by your Ojt Instructor.
                </p>{" "}
                <br />
                <p style={{ marginBottom: "12px" }}>
                    This means that, despite your application being accepted,
                    the internship placement will not be moving forward at this
                    time.
                </p>
                {message && (
                    <>
                        <p>
                            <strong>Reason:</strong>
                            <br />
                            {message}
                        </p>
                        <br />
                    </>
                )}
                <p>
                    We understand this news may be disappointing, especially
                    after your application was accepted. Please know that this
                    decision is not a reflection of your qualifications or
                    potential.
                </p>
                <br />
                <p>
                    <strong>What this means for you:</strong>
                    <br />
                    Your internship journey with {companyName} will not proceed,
                    but this does not affect your ability to apply for other
                    internship opportunities through our platform.
                </p>
                <p>
                    We encourage you to continue exploring other internship
                    positions that match your skills and career goals. Each
                    application brings valuable experience and brings you closer
                    to the right opportunity.
                </p>
                <p style={{ marginTop: "24px" }}>
                    If you have any questions about this decision, please don't
                    hesitate to ask your Ojt Instructor.
                </p>
                <p style={{ fontWeight: "600", marginTop: "4px" }}>
                    InternMatch Team
                </p>
            </div>
        </div>
    );
}
