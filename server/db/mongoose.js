var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:123456@ds217138.mlab.com:17138/todoapp');

module.exports={mongoose};