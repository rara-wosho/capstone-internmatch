export function ApplicationApproved({ companyName }) {
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
                    backgroundColor: "#4CAF50",
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
                    Internship Approved!
                </h1>
            </div>
            <div
                style={{
                    padding: "20px",
                }}
            >
                <h2
                    style={{
                        color: "#4CAF50",
                        fontWeight: "700",
                        paddingBlock: "20px",
                    }}
                >
                    Your Internship Has Been Fully Approved!
                </h2>

                <p>
                    Excellent news! Your application with{" "}
                    <strong>{companyName}</strong> has been{" "}
                    <strong style={{ color: "#4CAF50" }}>fully approved</strong>{" "}
                    by your instructor and is now finalized.
                </p>

                <p style={{ marginBottom: "12px" }}>
                    This means you are now officially eligible to begin your
                    internship journey with the company. All necessary approvals
                    have been completed, and your internship placement is
                    confirmed.
                </p>

                <p>
                    <strong>Next Steps:</strong>
                </p>

                <p>
                    Please ensure you check your email regularly for
                    communications from {companyName} regarding your internship
                    orientation and initial tasks.
                </p>

                <p style={{ marginTop: "24px" }}>
                    Congratulations on reaching this significant milestone!
                    We're excited to see you embark on this professional journey
                    and make the most of this valuable learning experience.
                </p>

                <p style={{ fontWeight: "600", marginTop: "4px" }}>
                    InternMatch Team
                </p>
            </div>
        </div>
    );
}
