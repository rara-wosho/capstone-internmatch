import * as React from "react";

export function ApplicationSuccess({ companyName }) {
    return (
        <div>
            <p>
                We’re excited to inform you that your application to join $
                {companyName} as an intern has been <strong>accepted</strong>!
            </p>

            <p>
                Your dedication and performance during the application process
                stood out, and we’re looking forward to having you on board.
            </p>
        </div>
    );
}
