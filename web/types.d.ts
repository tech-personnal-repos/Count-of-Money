interface Tokens {
    accessToken: string | null;
    refreshToken: string | null;
}

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
