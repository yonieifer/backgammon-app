export default (schema) => (req, res, next) => {
    schema.parse(req.body)
    next()
}
