import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            next()
        } catch (error) {
            console.log(error.message);
            return res.json({
                message: 'Nie na dostępu.',
            })
        }
    } else {
        console.log("no token provided");
        return res.json({
            message: 'Nie na dostępu.',
        })
    }
}