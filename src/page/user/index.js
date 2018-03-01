import React from 'react'
import { Helmet }      from "react-helmet";
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-head'
import RcPagination from "utils/pagenation";
import Mutil     from "utils";
import User      from "service/user-service";
import TableList from "utils/table-list";
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
        let tableHeads = ['ID', '用户名', '邮箱', '手机号', '注册时间'];
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

        return (
            <div className='content-wrapper'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="description" content="学而思网校为3-18岁孩子提供小学、初中、高中全学科一站式课外教学。“直播+辅导”双师教学，实现了直播上课、实时互动、随堂测试、语音测评、及时答疑、作业作文批改、错题订正，大幅度提升学习效果。全国200多个城市，超过500万中小学生正在网校高效学习" />
                    <meta name="keywords" content="学而思网校,在线学习,在线辅导,直播授课,中小学辅导课程,视频课程,网络课程" />
                    <meta name="renderer" content="webkit" />
                    <title>用户管理</title>
                    <link rel="canonical"  />
                </Helmet>
                <PageTitle title="用户管理" />
                <div className="content" style={{marginTop:"30px"}}>
                    <div className="row">
                        <TableList tableHeads={tableHeads}>
                            { listBody }
                        </TableList>

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