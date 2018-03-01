import React from 'react'
import FileUpload  from './fileUpload'

class FileUploader extends React.Component {
    render(){
        /*set properties*/
        const options={
            baseUrl           : '/manage/product/upload.do',
            fileFieldName     : 'upload_file',
            dataType          : 'json',
            chooseAndUpload  :  true,
            uploadSuccess    : (res)=>{
                this.props.onSuccess(res.data)
            },
            uploadError      : ( err )=>{
                this.props.onError( err.message  ||  '上传图片失败')
            }
        };
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload" className='btn btn-primary btn-xs'>选择图片</button>

            </FileUpload>
        )
    }
}
export default FileUploader;
