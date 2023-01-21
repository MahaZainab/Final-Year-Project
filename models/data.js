module.exports = {

  identity: 'data',
  connection: 'mysqlDB',
  schema:true,
  migrate: 'alter',
  attributes:{
    id: {
      type: 'integer',
      primaryKey: 'true',
      autoIncrement: 'true'
    },
  	title: {
      type: 'string',
      size: 1024
    },
    description: {
      type: 'string',
      size: 4096
    },
    link: {
      type:'string',
      size: 512
    },
    date: {
      type: 'datetime'
    }
  }
};
