import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-head'
import RcPagination from "utils/pagenation";
import Mutil     from "utils";
import User      from "service/user-service";
const _mm        =  new Mutil() ;
const _user      = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             list:[],
            pageNum : 1,
            firstLoading :true
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
      _user.getUserList(this.state.pageNum).then(res => {
          this.setState(res, () =>{
              this.setState({
                  firstLoading : false
              })
          })
      }, errMsg => {
          this.setState({
              list : []
          });
          _mm.errorTips( errMsg )
      })
    }
    onChangePageNum(pageNum) {
        this.setState({
            pageNum : parseInt(pageNum) || 1
        }, () => {
            this.loadUserList()
        })
    }
    render(){
        let listBody = this.state.list.map((user,index) =>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let listError = (
            <tr>
                <td colSpan={5} className='text-center'>
                    {this.state.firstLoading ? '正在加载数据.....' : '没有找到相应的结果'}

                </td>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody : listError;
        return (
            <div className='content-wrapper'>
                <PageTitle title="用户管理" />
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话号码</th>
                                    <th>创建时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableBody}

                                </tbody>

                            </table>

                        </div>

                    </div>
                    <RcPagination
                        current={this.state.pageNum}
                        total={this.state.total}
                        onChange={(pageNum) => this.onChangePageNum(pageNum)}
                    />

                </div>


            </div>
        )
    }
}
export default UserList