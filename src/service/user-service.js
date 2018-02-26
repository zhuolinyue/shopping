import Mutil from "utils";

const _mm    =  new Mutil() ;
class User {
    login(data) {
        return _mm.request({
            type :'post',
            url   :'/manage/user/login.do',
            data : data
        })
    }
    checkLoginInfo(loginInfo) {
        let  username  = loginInfo.username.trim() ,
             password  = loginInfo.password.trim();
        if ( typeof username !=='string' || username.length ===0){
            return {
                status : false ,
                msg     : '用户名不能为空'
            }
        }
        if ( typeof password !=='string' || password.length ===0){
            return {
                status : false ,
                msg     : '密码不能为空'
            }
        }
        return {
            status : true ,
            msg     : '验证通过'
        }
    }
    logout(){
        return _mm.request({
            type :'post',
            url   :'/user/logout.do',
        })
    }
    getUserList(pageNum) {
        return _mm.request({
            type  :'post',
            url   :'/manage/user/list.do',
            data  : {
                pageNum :  pageNum
            }
        })
    }
}
export default User