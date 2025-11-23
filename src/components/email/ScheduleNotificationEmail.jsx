// components/emails/ScheduleNotificationEmail.jsx
export function ScheduleNotificationEmail({ scheduleData, companyName }) {
    const { title, details, date, time, location, type, additional_notes } =
        scheduleData;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = new Date(`2000-01-01T${time}`)?.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }
    );

    const eventTypeDisplay = type.charAt(0)?.toUpperCase() + type.slice(1);

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
                margin: "0 auto",
            }}
        >
            {/* Header */}
            <div
                style={{
                    borderRadius: "12px 12px 0 0",
                    padding: "20px",
                    backgroundColor: "#3B82F6",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        color: "white",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0",
                    }}
                >
                    InternMatch
                </h1>
                <p
                    style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                    }}
                >
                    Schedule Notification
                </p>
            </div>

            {/* Main Content */}
            <div
                style={{
                    padding: "30px",
                }}
            >
                {/* Greeting */}
                <h2
                    style={{
                        color: "#3B82F6",
                        fontWeight: "700",
                        marginBottom: "20px",
                        fontSize: "22px",
                    }}
                >
                    {eventTypeDisplay} Scheduled
                </h2>

                <p style={{ marginBottom: "16px" }}>Hello there 👋,</p>

                <p style={{ marginBottom: "20px" }}>
                    <strong>{companyName}</strong> has scheduled a{" "}
                    <strong style={{ color: "#3B82F6" }}>
                        {eventTypeDisplay}
                    </strong>{" "}
                    for you. Please find the details below:
                </p>

                {/* Schedule Details Card */}
                <div
                    style={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "24px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <h3
                        style={{
                            color: "#111827",
                            fontSize: "18px",
                            fontWeight: "600",
                            margin: "0 0 16px 0",
                        }}
                    >
                        {title}
                    </h3>

                    <div style={{ display: "grid", gap: "12px" }}>
                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    width: "100px",
                                    fontWeight: "600",
                                    color: "#6B7280",
                                }}
                            >
                                Date:
                            </div>
                            <div>{formattedDate}</div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    width: "100px",
                                    fontWeight: "600",
                                    color: "#6B7280",
                                }}
                            >
                                Time:
                            </div>
                            <div>{formattedTime}</div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    width: "100px",
                                    fontWeight: "600",
                                    color: "#6B7280",
                                }}
                            >
                                Location:
                            </div>
                            <div>{location}</div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div
                                style={{
                                    width: "100px",
                                    fontWeight: "600",
                                    color: "#6B7280",
                                }}
                            >
                                Type:
                            </div>
                            <div style={{ textTransform: "capitalize" }}>
                                {type}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                {details && (
                    <div style={{ marginBottom: "20px" }}>
                        <h4
                            style={{
                                color: "#374151",
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            Event Details:
                        </h4>
                        <p style={{ margin: "0", color: "#4B5563" }}>
                            {details}
                        </p>
                    </div>
                )}

                {/* Additional Notes */}
                {additional_notes && (
                    <div style={{ marginBottom: "20px" }}>
                        <h4
                            style={{
                                color: "#374151",
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            Additional Notes:
                        </h4>
                        <p
                            style={{
                                margin: "0",
                                color: "#4B5563",
                                fontStyle: "italic",
                            }}
                        >
                            {additional_notes}
                        </p>
                    </div>
                )}

                {/* Instructions */}
                <div
                    style={{
                        backgroundColor: "#EFF6FF",
                        border: "1px solid #BFDBFE",
                        borderRadius: "6px",
                        padding: "16px",
                        marginBottom: "20px",
                    }}
                >
                    <h4
                        style={{
                            color: "#1E40AF",
                            fontSize: "16px",
                            fontWeight: "600",
                            margin: "0 0 8px 0",
                        }}
                    >
                        Important Information:
                    </h4>
                    <ul
                        style={{
                            margin: "0",
                            paddingLeft: "20px",
                            color: "#374151",
                        }}
                    >
                        <li>Please arrive on time for the scheduled {type}</li>
                        <li>Bring any required documents or materials</li>
                        <li>Dress appropriately for the occasion</li>
                        <li>
                            Contact the company if you have any questions or
                            need to reschedule
                        </li>
                    </ul>
                </div>

                {/* Closing */}
                <p style={{ marginBottom: "12px" }}>
                    This is an important step in your internship application
                    process. We wish you the best of luck!
                </p>

                <p style={{ marginBottom: "8px" }}>
                    If you have any questions about this schedule, please
                    contact <strong>{companyName}</strong> directly.
                </p>

                <p
                    style={{
                        fontWeight: "600",
                        marginTop: "24px",
                        color: "#374151",
                    }}
                >
                    Best regards,
                    <br />
                    InternMatch Team
                </p>
            </div>

            {/* Footer */}
            <div
                style={{
                    backgroundColor: "#F9FAFB",
                    borderTop: "1px solid #E5E7EB",
                    padding: "16px 30px",
                    textAlign: "center",
                    borderRadius: "0 0 12px 12px",
                }}
            >
                <p
                    style={{
                        fontSize: "12px",
                        color: "#6B7280",
                        margin: "0",
                    }}
                >
                    This email was sent by InternMatch Platform. Please do not
                    reply to this email.
                </p>
            </div>
        </div>
    );
}
