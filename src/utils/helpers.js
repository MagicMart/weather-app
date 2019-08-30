export function handleDate(str) {
    const date = new Date(str);
    const day = date.toDateString().slice(0, 10);
    const time = date.toTimeString().slice(0, 5);

    return {day, time};
}

export function cleanCityString(str) {
    if (!str) {
        return;
    }
    return str
        .replace("%20", " ")
        .split("=")[1]
        .split(" ")
        .filter(el => el !== "")
        .join(" ");
}

export function cleanString(str) {
    return str
        .trim()
        .split(" ")
        .filter(el => el !== "")
        .join(" ");
}
