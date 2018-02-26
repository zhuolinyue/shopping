import $ from 'jquery' ;
class Mutil  {
    request(param) {
        return new Promise( (resolve,reject) => {
            $.ajax({
            type        : param.type || 'get',
            url         : param.url || '' ,
            dataType    : param.dataType || 'json' ,
            data        : param.data || null,
            success      : res=> {
                if ( 0 === res.status ) {
                    typeof resolve === 'function' &&  resolve( res.data , res.msg )

                } else if ( 10 === res.status ) {
                     this.doLogin()
                } else {
                    typeof reject === 'function' &&  reject( res.msg || res.data )
                }

                },
            error        : err=> {
                reject( err.statusText )
                }
            })

        })

    }
    /*跳转登录*/
    doLogin() {
      window.location.href  = '/login?redirect=' +encodeURIComponent(window.location.pathname) ;
    }
    /*获取url参数*/
    getUrlParam(){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return  result ? decodeURIComponent(result[2]) : null
    }
    /*错误提示*/
    errorTips( errMsg ) {
        alert( errMsg || '好像哪里不对了~' )
    }
    scusessTips( msg ) {
        alert( msg )
    }
    setLocalStorage( key , val ) {
        let dataType = typeof val
        if ( dataType === 'object') {
            localStorage.setItem( key , JSON.stringify( val ) )
        } else if(['number','string','boolean'].indexOf(dataType) >= 0) {
            localStorage.setItem( key ,val )
        } else {
            alert('该类型不能用于本地存储')
        }

    }
    getLocalStorage( key ) {
        let data = localStorage.getItem( key )
        if ( data ) {
            return JSON.parse(data)
        } else {
            return ''
        }
    }
    removeLocalStorage( key ) {
        localStorage.removeItem( key )
    }
}
export default Mutil