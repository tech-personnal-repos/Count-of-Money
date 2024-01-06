export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

export function setLoginState() {
    const accessTokenCookie = useCookie('access_token', {
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });
    const refreshTokenCookie = useCookie('refresh_token', {
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });

    const tokens = ref({
        refreshToken: useCookie('refresh_token'),
        accessToken: useCookie('access_token')
    });
    tokens.value = {
        accessToken: accessTokenCookie.value || null,
        refreshToken: refreshTokenCookie.value || null
    };

    return Boolean(tokens.value.refreshToken);
}

export async function connect(email: string, password: string) {
    const { data } = await useApiFetch<AuthResponse>('/auth', {
        method: 'post',
        body: { email, password: password }
    });

    if (!data || !data.value) return false;

    setTokenStates({
        accessToken: data.value.access_token,
        refreshToken: data.value.refresh_token
    });

    return true;
}

export function setTokenStates(tokens: Tokens | null) {
    if (!tokens) return;
    const accessTokenCookie = useCookie('access_token', {
        expires: getExpirationDate(tokens.accessToken),
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });

    const refreshTokenCookie = useCookie('refresh_token', {
        expires: getExpirationDate(tokens.refreshToken),
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });

    accessTokenCookie.value = tokens.accessToken;
    refreshTokenCookie.value = tokens.refreshToken;

    const state = ref({
        refreshToken: useCookie('refresh_token'),
        accessToken: useCookie('access_token')
    });
    state.value = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    };
}

export function disconnect() {
    const accessTokenCookie = useCookie('access_token', {
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });
    const refreshTokenCookie = useCookie('refresh_token', {
        sameSite: true,
        secure: useIsProduction(),
        path: '/'
    });

    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;

    const tokens = ref({
        refreshToken: useCookie('refresh_token'),
        accessToken: useCookie('access_token')
    });
    tokens.value = { accessToken: null, refreshToken: null };
}
