export function dateFormatter(raw_date) {
    const date = new Date(raw_date);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
