
            import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const CommentEditor = (...props) => {
    const [value, setValue] = useState("")

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content)
        setValue(content)
    }

    return (
        <Editor
            initialValue=""
            init={{
                height: 250,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
            {...props}
        />
    )
}

export default CommentEditor