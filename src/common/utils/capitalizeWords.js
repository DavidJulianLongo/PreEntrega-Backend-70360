export function capitalizeWords(string) {
    return string.replace(/\b\w/g, char => char.toUpperCase());
}