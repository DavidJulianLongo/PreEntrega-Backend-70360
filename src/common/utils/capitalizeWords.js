export function capitalizeWords(string) {
    return string.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}