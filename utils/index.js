module.exports={
    //生成唯一验证码
    randomCode:()=>{
        const ary='qwertyuiopasdfhghjklzxcvbnm1234509876';
        let str='';
        while(str.length<4){
            var n = Math.round(Math.random()*9)
            if(str.indexOf(ary[n])===-1){
                str+=ary[n]
            }
        }
        return str
    },

    //生成唯一ID
    makeUuid: ()=> {
        var tick = parseInt(Date.now() / 1000),
        max = 1e+9,
        rand = parseInt((1+Math.random()) * max);
        return tick.toString(16) + rand.toString(16);
       }
}