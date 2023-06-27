module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "KROSMXYYSHEJA83KS99102KSHA73BBSNAU264BSQOE04927374NX883YAJHJ7499KFPDS9385UJAB",
    api: process.env.NODE_ENV === "production" ? "https://api.loja-teste.ampliee.com" : "https://localhost:3000",
    loja: process.env.NODE_ENV === "production" ? "https://loja-teste.ampliee.com" :  "https://localhost:8000"
};