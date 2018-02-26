import React     from 'react'
import { withRouter } from 'react-router-dom'
import Mutil     from "utils";
import User      from "service/user-service";
const _mm        =  new Mutil() ;
const _user      = new User();
import './login-panel.scss'
@withRouter
class Login extends React.Component {
    constructor(props) {
        super ( props ) ;
        this.state = {
            username    :  '' ,
            password    :  '',
            redirect     : _mm.getUrlParam('redirect') || ''
        }
    }
    componentWillMount() {
        document.title = '登录 linzai'
    }
    onValueChange ( e ) {
        let { name , value } = e.target ;
        this.setState({
            [name] : value
        })
    }
    OnSubmit( e ) {
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        },
       checkResult =_user.checkLoginInfo(loginInfo);
        if ( checkResult.status){
            _user.login({
                username : this.state.username,
                password : this.state.password
            }).then( res => {
                _mm.scusessTips('登录成功');
                _mm.setLocalStorage('userInfo', res) ;
                this.props.history.push(this.state.redirect)
            }, errMsg => {
                _mm.errorTips( errMsg )
            })
        } else {
            _mm.errorTips( checkResult.msg )
        }


    }
    onInputKeyUp(e) {
        if (e.keyCode === 13 ) {
            this.OnSubmit( e )
        }
    }
    render () {
        return (
            <div className='content-wrapper'>
                <div className="login-panel">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading text-center">欢迎登录</div>
                            <div className="panel-body">
                                <div>
                                    <div className="form-group clearfix">
                                        <label htmlFor="exampleInputEmail1 col-md-2">用户名</label>
                                        <input type="text"
                                               name = 'username'
                                               className="form-control"
                                               id="exampleInputEmail1"
                                               onChange = { ( e ) => { this.onValueChange( e )}}
                                               onKeyUp={ e => { this.onInputKeyUp(e)}}
                                               placeholder="请输入用户名" />
                                    </div>
                                    <div className="form-group clearfix">
                                        <label htmlFor="exampleInputPassword1  col-md-2">密码</label>
                                        <input type="password"
                                               name = 'password'
                                               className="form-control"
                                               id="exampleInputPassword1"
                                               onChange = { ( e ) => { this.onValueChange( e )}}
                                               onKeyUp={ e => { this.onInputKeyUp(e)}}
                                               placeholder="请输入密码" />
                                    </div>
                                    <button type="button"
                                            className="btn btn-primary btn-lg  btn-block"
                                            onClick = { ( e ) => { this.OnSubmit ( e)}}
                                    >登录</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Login