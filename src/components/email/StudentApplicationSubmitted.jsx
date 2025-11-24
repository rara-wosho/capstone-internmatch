export function StudentApplicationSubmitted({ student_name, application_id }) {
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
                    backgroundColor: "#2196F3",
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
                    New Internship Application
                </h1>
            </div>

            <div style={{ padding: "20px" }}>
                <h2
                    style={{
                        color: "#2196F3",
                        fontWeight: 700,
                        paddingBlock: "20px",
                    }}
                >
                    A Student Has Applied to Your Company
                </h2>

                <p>
                    You have received a new internship application from{" "}
                    <strong>{student_name}</strong>. The student has chosen your
                    company as their preferred internship placement.
                </p>

                <p style={{ marginBottom: "12px" }}>
                    The submitted application is now waiting for your review.
                    You may evaluate the student's details, uploaded documents,
                    and qualifications directly in your InternMatch dashboard.
                </p>

                <p>
                    <strong>Next Steps for Your Team:</strong>
                </p>

                <ul style={{ paddingLeft: "20px" }}>
                    <li>Review the student's application information</li>
                    <li>Check the submitted requirements or documents</li>
                    <li>
                        Decide whether to move forward or request additional
                        documents
                    </li>
                </ul>

                <br />

                {application_id && (
                    <p>
                        You can view the application in our website. Just{" "}
                        <a
                            style={{
                                color: "blue",
                                textDecoration: "underline",
                            }}
                            href={`/company/applicants/${application_id}`}
                        >
                            click here.
                        </a>
                    </p>
                )}

                <p style={{ marginTop: "18px" }}>
                    Thank you for partnering with InternMatch and supporting
                    student training and growth. Your participation helps
                    students gain meaningful real-world experience.
                </p>

                <p style={{ fontWeight: "600", marginTop: "4px" }}>
                    InternMatch Team
                </p>
            </div>
        </div>
    );
}
