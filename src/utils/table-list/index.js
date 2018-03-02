import React from 'react'
class TableList extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            isFirstLoading : true
        }
    }
   componentWillReceiveProps(){
       this.setState = ({
           isFirstLoading : false
       })
   }
    render () {
        let tableInfo = this.props.tableHeads;
        let tableHeader = tableInfo.map((tableHead,index) =>{
            if ( typeof tableHead ==='object') {
                return <th width={tableHead.width} key={index}>{tableHead.name}</th>
            } else if ( typeof tableHead ==='string') {
                return <th key={index}>{tableHead}</th>
            }

        });
        let listBody = this.props.children;
        let listInfo = (
            <tr>
                <td colSpan={tableInfo.length}>
                    {this.state.isFirstLoading ? '正在加载中' : '没有找到数据'}
                </td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                        </thead>
                        <tbody>
                          {tableBody}
                        </tbody>

                    </table>

                </div>


        )
    }
    /*移动端点击任何一个地方显示隐藏*/
    /*$(document).bind('click',function(e){
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id=='test') {
                return;
            }
            elem = elem.parentNode;
        }

        $('#test').css('display','none'); //点击的不是div或其子元素
    });

    * */
}
export default TableList
