export function toCaseInsensitive(string: string) {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '');
}

export function getRandomOauthState() {
    return Math.random().toString(36).substring(2, 15);
}
