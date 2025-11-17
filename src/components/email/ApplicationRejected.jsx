export function ApplicationRejected({ companyName }) {
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
                    backgroundColor: "#d87575",
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
                    Application Update
                </h1>
            </div>
            <div
                style={{
                    padding: "20px",
                }}
            >
                <h2
                    style={{
                        color: "#d87575",
                        fontWeight: "700",
                        paddingBlock: "20px",
                    }}
                >
                    Internship Application Status
                </h2>

                <p>
                    We regret to inform you that your application to join{" "}
                    <strong>{companyName}</strong> is{" "}
                    <strong style={{ color: "#d87575" }}>rejected</strong> at
                    this time.
                </p>

                <p style={{ marginBottom: "12px" }}>
                    We understand that this news may be disappointing, and we
                    want to thank you for the time and effort you put into your
                    application.
                </p>

                <p>
                    <strong>What's Next?</strong>
                    <br />
                    This decision does not reflect on your potential or
                    capabilities. Internship opportunities are highly
                    competitive, and selection often depends on many factors
                    beyond qualifications alone.
                </p>

                <p>
                    We encourage you to continue applying for other internship
                    positions that match your skills and interests. Each
                    application is a valuable learning experience that brings
                    you closer to finding the right opportunity.
                </p>

                <p>
                    Remember that many successful professionals faced rejections
                    before finding their perfect career path. This is just one
                    step in your journey.
                </p>

                <p style={{ marginTop: "24px" }}>
                    We wish you the best in your continued search and future
                    endeavors.
                </p>

                <p style={{ fontWeight: "600", marginTop: "4px" }}>
                    InternMatch Team
                </p>
            </div>
        </div>
    );
}
