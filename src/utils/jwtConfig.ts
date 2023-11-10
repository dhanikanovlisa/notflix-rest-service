function generateSecret() {
    return process.env.ACCESS_TOKEN_SECRET? 
    process.env.ACCESS_TOKEN_SECRET : 'secret';
}

export default generateSecret;