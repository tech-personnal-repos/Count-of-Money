export const isAlpha = '^[a-zA-Z]+$';
export const isAlphaNumeric = '^[a-zA-Z0-9]+$';
export const isDate =
    '^([0-2]\\d{3}-((0\\d)|(1[0-2]))-((0\\d)|([0-2]\\d)|(3[0-1])))$';
export const isDateRange = '^\\d{3}-\\d{3}';
export const isDateTZ = '^(d{4}-[01]d-[0-3]dT[0-2]d:[0-5]d:[0-5]d.d+)Z?$';
export const isDayName =
    '^(Sunday)|(Monday)|(Tuesday)|(Wednesday)|(Thursday)|(Friday)|(Saturday)$';
export const isYear = '^\\d{4}$';
export const isMonth = '^(0[1-9]|1[0-2])$';
export const isMonthDate = '^([0-2]d{3})-(0[1-9]|1[0-2])$';
export const isMonthOfYear = '^[0-2]\\d{3}-((0\\d)|(1[0-2]))$';
export const isInterval =
    '^([0-2]\\d{3}-((0\\d)|(1[0-2]))-((0\\d)|([0-2]\\d)|(3[0-1]))),([0-2]\\d{3}-((0\\d)|(1[0-2]))-((0\\d)|([0-2]\\d)|(3[0-1])))$';
export const isEmail =
    '^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$';
export const isUsername = '^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,16}(?<![_-])$';
export const isPassword =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*]).{8,}$';
export const isDisplayName = "^[a-zA-ZÀ-ÿ-']+( ?[a-zA-ZÀ-ÿ-']+)*$";
export const isUrl = '^(https?://)([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$';
export const isObjectID = '^[0-9a-f]{24}$';
export const isName =
    '^[a-zA-ZŠŒŽšœžŸâêôûÄéÆÇàèÊùÌÍÎÏîÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöùúûüýÿ\\- ]+$';
// export const emailValidationCode = '^d{5}$';
// export const isApeCode = '^.+ (d{3,4}[A-Z]{1})$';
// export const isColor = '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$';
// export const isEmbedVideo = '^(https://www.youtube.com/embed.+|https://www.dailymotion.com/embed/video/.+|https://player.vimeo.com/video/.+)$';
// export const isFacebook = '^https://www.facebook.com/.+$';
// export const isImage = '^(data:image/(jpeg|png|jpg);base64,[a-zA-Z0-9+/=]{10,})|(https://.+)$';
// export const isInstagram = '^https://www.instagram.com/.+$';
// export const isLinkedin = '^https://.+.linkedin.com/.+$';
// export const isPhoneNumber = '^[+]*[(]{0,1}d{1,4}[)]{0,1}([-s./]*d){9}$';
// export const isSiren = '^( *d{3}){3}$';
// export const isSiret = '^( *d{3}){3}( *d){5}$';
// export const isTwitter = '^https://twitter.com/.+$';
// export const isVideo = '^(https://(www.)?youtu(be.com/(watch?v=|embed/)|.be/).+|https://(www.)?dai(lymotion.com/(embed/)?video/|.ly/).+|https://(player.vimeo.com/video|vimeo.com)/.+)$';
// export const isYoutube = '^https://www.youtube.com/.+$';
