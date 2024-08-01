import { aze, kaz, tr ,jor,kwt,om,pol, sa,uae,us} from ".";

const countryOptions = [
    { code: "+962", country: "Jordan", flag: "https://www.countryflags.com/wp-content/uploads/jordan-flag-png-large.png", bgi: jor,localeName:"JOR" },
    { code: "+994", country: "Azerbaijan", flag: "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-11-2048x1024.jpg", bgi: aze ,localeName:"AZ"},
    { code: "+90", country: "Turkey", flag: "https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png", bgi: tr ,localeName:"TR"},
    { code: "+7", country: "Kazakhstan", flag: "https://www.countryflags.com/wp-content/uploads/kazakhstan-flag-png-large.png", bgi: kaz,localeName:"KAZ" },
    { code: "+965", country: "Kuwait", flag: "https://www.countryflags.com/wp-content/uploads/kuwait-flag-png-large.png", bgi: kwt ,localeName:"KWT"},
    { code: "+968", country: "Oman", flag: "https://www.countryflags.com/wp-content/uploads/oman-flag-png-large.png", bgi: om,localeName:"OM" },
    { code: "+48", country: "Poland", flag: "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png", bgi: pol,localeName:"POL" },
    { code: "+966", country: "Saudi Arabia", flag: "https://www.countryflags.com/wp-content/uploads/saudi-arabia-flag-png-large.png", bgi: sa,localeName:"SA" },
    { code: "+971", country: "United Arab Emirates", flag: "https://www.countryflags.com/wp-content/uploads/united-arab-emirates-flag-png-large.png", bgi: uae ,localeName:"UAE"},
    { code: "+1", country: "United States", flag: "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", bgi: us,localeName:"US" },
];
export default countryOptions;



export const LocalCountries = {
    AZ: aze,
    KAZ: kaz,
    JOR: jor,
    KWT: kwt,
    OM: om,
    POL: pol,
    SA: sa,
    UAE: uae,
    US: us,
};