export default function InstructorApprovalMail({ firstname, password }) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: "#333",
                backgroundColor: "#f7f7f7",
                padding: "24px",
            }}
        >
            <div
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: "#8967d8",
                        color: "#ffffff",
                        padding: "20px 24px",
                    }}
                >
                    <h2 style={{ margin: 0 }}>InternMatch</h2>
                </div>

                {/* Body */}
                <div style={{ padding: "24px" }}>
                    <p style={{ marginBottom: "16px" }}>
                        Hi <strong>{firstname}</strong>,
                    </p>

                    <p style={{ marginBottom: "16px" }}>
                        We’re happy to inform you that your registration as an{" "}
                        <strong>OJT Instructor</strong> has been
                        <span style={{ fontWeight: "bold", color: "#8967d8" }}>
                            {" "}
                            approved
                        </span>
                        .
                    </p>

                    <p style={{ marginBottom: "16px" }}>
                        You may now log in to your Instructor Dashboard using
                        this temporary password:
                    </p>

                    <p
                        style={{
                            padding: "12px 16px",
                            backgroundColor: "#f1f1ff",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            color: "#8967d8",
                            fontSize: "18px",
                            textAlign: "center",
                        }}
                    >
                        {password}
                    </p>

                    <p style={{ marginTop: "20px" }}>
                        For security purposes, please change your password once
                        you log in.
                    </p>

                    {/* Button */}
                    <div style={{ textAlign: "center", marginTop: "32px" }}>
                        <a
                            href="https://internmatch.online/sign-in"
                            style={{
                                display: "inline-block",
                                padding: "12px 20px",
                                backgroundColor: "#8967d8",
                                color: "#ffffff",
                                textDecoration: "none",
                                borderRadius: "6px",
                                fontWeight: "bold",
                            }}
                        >
                            Go to Login
                        </a>
                    </div>

                    <p
                        style={{
                            marginTop: "32px",
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        If you did not request this account, please contact
                        support immediately.
                    </p>
                </div>

                {/* Footer */}
                <div
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: "16px 24px",
                        textAlign: "center",
                        fontSize: "13px",
                        color: "#777",
                    }}
                >
                    © {new Date().getFullYear()} InternMatch. All rights
                    reserved.
                </div>
            </div>
        </div>
    );
}
