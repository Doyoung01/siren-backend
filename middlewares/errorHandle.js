const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack, // 스택 트레이스는 프로덕션 환경에서는 숨깁니다
    })
}

module.exports = errorHandler