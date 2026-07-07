export const getElapsedHoursMinsStr = (s) =>
    `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;


export const formatTimer = (s) =>
    `${Math.floor(s / 3600)
        .toString()
        .padStart(2, "0")}:${Math.floor((s % 3600) / 60)
            .toString()
            .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;



export const getTimeStr = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return timeStr
}
