
const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500)
    res.json({error: true, message: err.message})
}

const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next)
  }
  
  const methods = [
    'get',
    'post'
  ]
  
  function toAsyncRouter(router) {
    for (let key in router) {
        if (methods.includes(key)) {
            let method = router[key]
            router[key] = (path, ...callbacks) => method.call(router, path, ...callbacks.map(cb => asyncHandler(cb)))
        }
    }
    return router
  }

module.exports = {errorHandler, toAsyncRouter};