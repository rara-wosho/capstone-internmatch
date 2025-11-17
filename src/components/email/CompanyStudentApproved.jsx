export function CompanyStudentApproved({ studentName }) {
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
                    Student Intern Approved!
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
                    Internship Candidate Fully Cleared
                </h2>

                <p>
                    We're pleased to inform you that{" "}
                    <strong>{studentName}</strong> has been{" "}
                    <strong style={{ color: "#4CAF50" }}>
                        officially approved
                    </strong>{" "}
                    by their OJT instructor.
                </p>

                <p style={{ marginBottom: "12px" }}>
                    All academic and administrative requirements have been
                    satisfied, and the student is now fully cleared to begin
                    their internship with your company.
                </p>

                <p>
                    <strong>Next Steps:</strong>
                    <br />
                    • The student has been notified of their approval
                    <br />
                    • They are now awaiting onboarding instructions from your
                    team
                    <br />• You may proceed with scheduling their start date and
                    orientation
                </p>

                <p>
                    <strong>Student is ready for:</strong>
                    <br />
                    • Onboarding and orientation processes
                    <br />
                    • Receiving company-specific training materials
                    <br />
                    • Meeting their supervisor and team members
                    <br />• Beginning assigned projects and responsibilities
                </p>

                <p>
                    Please coordinate directly with {studentName} to establish
                    their start date, work schedule, and any other
                    company-specific requirements for their internship period.
                </p>

                <p style={{ marginTop: "24px" }}>
                    We're excited to see this partnership begin and are
                    confident that {studentName} will be a valuable contributor
                    to your team.
                </p>

                <p>
                    Should you need any additional information or support during
                    the onboarding process, please don't hesitate to contact us.
                </p>

                <p style={{ fontWeight: "600", marginTop: "4px" }}>
                    InternMatch Team
                </p>
            </div>
        </div>
    );
}
