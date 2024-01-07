interface Tokens {
    accessToken: string | null;
    refreshToken: string | null;
}

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface User {
    email: string | null;
    password: string;
    username: string;
    displayName?: string;
    roles?: string[];
    avatarUrl?: string;
    followedCryptos: CryptoMoney[];
    favoriteCryptos: CryptoMoney[];
}

interface Coin {
    uuid: string;
    symbol: string;
    name: string;
    color: string | null;
    iconUrl: string;
    marketCap: string;
    price: string;
    listedAt: number;
    tier: number;
    change: string;
    rank: number;
    sparkline: string[];
    lowVolume: boolean;
    coinrankingUrl: string;
    '24hVolume': string;
    btcPrice: string;
}

interface DetailedCoin extends Coin {
    description: string;
    website: string;
    marketCap: number;
    marketCapRank: number;
    totalVolume: number;
    high24h: number;
    low24h: number;
    priceChange24h: number;
    priceChangePercentage24h: number;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
    circulatingSupply: number;
    totalSupply: number;
    ath: number;
    athChangePercentage: number;
    athDate: string;
    atl: number;
    atlChangePercentage: number;
    atlDate: string;
    lastUpdated: string;
}

interface OauthResponse {
    access_token: string;
    scope: string;
    token_type: string;
}

interface CoinHistory {
    change: string;
    history: {
        price: string;
        timestamp: number;
    }[];
}
