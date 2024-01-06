import type { NitroFetchRequest } from 'nitropack';

let isRefreshing = false;
let failedQueue: { resolve: Function; failedConfig: any }[] = [];

function onRequest({ request, options }: any) {
    options.headers = options.headers || {};
    options.headers['accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';

    options.url = request.replace(options.baseURL, '');
    const tokens = ref({
        refreshToken: useCookie('refresh_token'),
        accessToken: useCookie('access_token')
    });

    if (
        !options.headers['Authorization'] &&
        tokens.value &&
        tokens.value.accessToken
    ) {
        options.headers['Authorization'] = `Bearer ${tokens.value.accessToken}`;
    }
}

async function onResponse(context: any): Promise<void> {
    const { response, options } = context;

    if (response.ok || response.status !== 401) return;
    if (options.url === '/users/auth/refresh') {
        disconnect();
        navigateTo('/');

        return;
    }

    if (isRefreshing)
        return new Promise(resolve =>
            failedQueue.push({ resolve, failedConfig: context })
        );

    const refreshToken = useCookie('refresh_token').value;
    if (!refreshToken) return;

    isRefreshing = true;
    const runtimeConfig = useRuntimeConfig();

    const { data } = await useFetch('/users/auth/refresh', {
        method: 'post',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        baseURL: runtimeConfig.public.api
    });

    if (!data || !data.value) {
        for (const { resolve, failedConfig } of failedQueue)
            resolve(failedConfig);
        isRefreshing = false;
        failedQueue = [];

        disconnect();
        navigateTo('/');

        return;
    }

    const newTokens = data.value as AuthResponse;
    const bearerToken = `Bearer ${newTokens.access_token}`;
    setTokenStates({
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token
    });
    context.options.headers['Authorization'] = bearerToken;

    const [current] = await Promise.all([
        useFetch(context.request, context.options),
        ...failedQueue.map(async ({ resolve, failedConfig }) => {
            failedConfig.options.headers['Authorization'] = bearerToken;
            const failed = await useFetch(
                failedConfig.request,
                failedConfig.options
            );

            if (!failed.error || !failed.error.value) {
                failedConfig.response = {
                    _data: failed.data?.value,
                    status: 200,
                    ok: true,
                    statusText: 'OK'
                };
            }

            resolve(failedConfig);
        })
    ]);

    isRefreshing = false;
    failedQueue = [];

    context.response = {
        _data: current.data.value,
        status: 200,
        ok: true,
        statusText: 'OK'
    };
}

type UseFetchOptions<T> = {
    key?: string;
    method?: string;
    query?: URLSearchParams | Record<string, any>;
    params?: URLSearchParams | Record<string, any>;
    body?: RequestInit['body'] | Record<string, any>;
    headers?: { key: string; value: string }[];
    baseURL?: string;
    server?: boolean;
    lazy?: boolean;
    immediate?: boolean;
    default?: () => T;
    transform?: (input: T) => T;
};

type AsyncData<T> = {
    data: Ref<T>;
    pending: Ref<boolean>;
    refresh: (opts?: { dedupe?: boolean }) => Promise<void>;
    execute: () => Promise<void>;
    error: Ref<Error | boolean>;
};

export function useApiFetch<T>(
    request: NitroFetchRequest,
    opts: UseFetchOptions<T> | undefined = undefined
): Promise<AsyncData<T>> {
    const runtimeConfig = useRuntimeConfig();

    // @ts-ignore
    return useFetch<T>(request, {
        baseURL: runtimeConfig.public.api,
        retry: false,
        ...opts,
        onRequest,
        onResponse
    });
}

export function useApiLazyFetch<T>(
    request: NitroFetchRequest,
    opts: UseFetchOptions<T> | undefined = undefined
): AsyncData<T> {
    const runtimeConfig = useRuntimeConfig();

    // @ts-ignore
    return useLazyFetch<T>(request, {
        baseURL: runtimeConfig.public.api,
        retry: false,
        ...opts,
        onRequest,
        onResponse
    });
}
