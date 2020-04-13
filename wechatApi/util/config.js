const mysql = require('mysql')
module.exports = {
    config:{
        host:"localhost",
        port:'3306',
        user:'root',
        password:'123456',
        database:'db_repair'
    },

    my:{
        appId:'wxeee7fab1e74d127e',
        appSecret:'dc4aebaae2d3dff6f8acea033c48020f'
    },
    sqlConnect:function(sql,sqlArr,callback){
        let pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log("数据库连接成功！");
            if(err){
                console.log("连接失败了");
                return
                
            }

            // 事件驱动回调
            conn.query(sql,sqlArr,callback)
            conn.release()
            
        })

    }
}