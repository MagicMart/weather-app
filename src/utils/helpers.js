export function handleDate(str) {
    const date = new Date(str);
    const day = date.toDateString().slice(0, 10);
    const time = date.toTimeString().slice(0, 5);

    return {day, time};
}

export function cleanSearchString(str) {
    if (!str) {
        return;
    }
    return str.replace(/\?=/, "");
}

export function removeExtraSpace(str) {
    return str
        .trim()
        .split(" ")
        .filter(el => el !== "")
        .join(" ");
}
