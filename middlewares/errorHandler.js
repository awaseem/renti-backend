// Need to disable eslint so that the next variable within the function does not complain
// Express calls the next function internally therefore we cannot remove it from the function otherwise
// out error handler will break
export default function (err, req, res, next) { // eslint-disable-line
    console.error(err);
    res.status(400).json({ error: err });
}
