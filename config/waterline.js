var mysqlAdapter = require('sails-mysql');
module.exports = {
  adapters: {
    mysqlAdapt: mysqlAdapter
  },
  connections: {
    mysqlDB: {
      adapter: 'mysqlAdapt',
      host: 'localhost',
      database: 'rss',
      user:'root',
      password:'',
      supportBigNumbers:true, //true/false
      debug:['ComQueryPacket'], //false or array of node-mysql debug options
      trace:true //true/false
    }
  }
};
