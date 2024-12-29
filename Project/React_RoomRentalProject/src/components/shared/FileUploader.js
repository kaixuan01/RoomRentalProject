import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import '../../component.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function FileUploader() {
  const [files, setFiles] = useState([])
  const [previewImage, setPreviewImage] = useState(true);
  
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={7}
        server="/api"
        name="files"
        allowImagePreview={true}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      {/* <Button onClick={() => setPreviewImage(!previewImage)}>{previewImage ? "Hide" : "Show"} Preview</Button> */}
    </div>
  )
}