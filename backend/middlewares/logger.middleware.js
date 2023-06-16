let logger = async (req, res, next) => {
        console.log(new Date().toLocaleTimeString()+" "+req.url)
        next();
}

module.exports = logger