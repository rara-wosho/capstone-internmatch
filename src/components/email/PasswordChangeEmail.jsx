export default function PasswordChangedEmail({ firstname }) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "24px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                style={{
                    maxWidth: "540px",
                    margin: "0 auto",
                    background: "#ffffff",
                    borderRadius: "12px",
                    padding: "32px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
            >
                {/* Title */}
                <h1
                    style={{
                        color: "rgb(20,20,20)",
                        margin: "0 0 20px",
                        fontSize: "22px",
                    }}
                >
                    Your Password Has Been Updated
                </h1>

                {/* Greeting */}
                <p style={{ fontSize: "15px", marginBottom: "16px" }}>
                    Hi <strong>{firstname}</strong>,
                </p>

                <p
                    style={{
                        fontSize: "15px",
                        lineHeight: "22px",
                        marginBottom: "20px",
                    }}
                >
                    This is a confirmation that your password on{" "}
                    <strong>InternMatch</strong>
                    has been successfully changed.
                </p>

                {/* Security Notice */}
                <div
                    style={{
                        borderLeft: "4px solid #ef4444",
                        paddingLeft: "12px",
                        marginBottom: "20px",
                    }}
                >
                    <p style={{ fontSize: "14px", color: "#444" }}>
                        If you did <strong>not</strong> make this change, please
                        reset your password immediately or contact support.
                    </p>
                </div>

                {/* Button */}
                <div style={{ textAlign: "center", margin: "28px 0" }}>
                    <a
                        href="https://internmatch.online/forgot-password?type=password-changed"
                        style={{
                            display: "inline-block",
                            background: "#ef4444",
                            color: "white",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontSize: "15px",
                            fontWeight: "600",
                        }}
                    >
                        Secure Your Account
                    </a>
                </div>

                {/* Footer */}
                <p
                    style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "16px",
                        marginTop: "24px",
                    }}
                >
                    If this change was made by you, no further action is needed.
                </p>

                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    — The InternMatch Security Team
                </p>
            </div>
        </div>
    );
}
