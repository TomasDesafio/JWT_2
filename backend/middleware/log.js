export const log = (req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`)
    next()
}
