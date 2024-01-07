import login from './auth/login.js';
import register from './register/register.js';
import oauth from './user/oauth.js';
import profile from './user/profile.js';

import cryptoInfos from './cryptos/cryptoInfos.js';
import cryptoHistory from './cryptos/cryptoHistory.js';
import cryptoToday from './cryptos/cryptoToday.js';
import cryptoList from './cryptos/cryptoList.js';
import followCrypto from './follows/followCrypto.js';
import followedCryptos from './follows/followedCryptos.js';

export default {
    login,
    register,
    oauth,
    profile,

    cryptoInfos,
    cryptoHistory,
    cryptoToday,
    cryptoList,
    followCrypto,
    followedCryptos
};
