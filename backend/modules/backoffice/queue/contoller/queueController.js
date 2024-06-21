const queueMessage = require('../model/queueMessage')


module.exports = {
    sendmail: function(req,res, next){
        queueMessage.listen(req.body)
            .then(result => { res.json(result) })
            .catch(err => { next(err) })
    }
}