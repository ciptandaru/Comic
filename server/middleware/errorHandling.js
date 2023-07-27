module.exports = errorHandling;
async function errorHandling (err, req, res, next) {
    console.log(err);
    switch (err.name) {
        case 'SequelizeValidationError':
            res.status(400).json({ message: err.errors[0].message })
           break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ message: err.errors[0].message })
            break;
        case 'Unauthenticated':
            res.status(401).json({ message: 'Invalid token' })
            break;
        case 'loginInvalid':
            res.status(401).json({ message: 'Invalid email/password' })
            break;
        case 'NOT_FOUND':
            res.status(404).json({ message: 'Data not found!' })
            break;
        default :
            res.status(500).json({ message: 'Internal Server Error!' })
            break;
    }
}

module.exports = errorHandling;