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
}
export default TableList
