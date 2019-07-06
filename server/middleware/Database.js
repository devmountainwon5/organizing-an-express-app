const massive = require('massive');

module.exports = (app) => {
    massive(process.env.DATABASE_URL)
    .then((dbInstance)=>{
        console.log('Db is connected')
        app.set('db', dbInstance);
    })
    .catch((err)=>{
        console.log(err)
    })
}
