export default (schema) => (req, res, next) => {
    const result = schema.pasre(req.body)
}
