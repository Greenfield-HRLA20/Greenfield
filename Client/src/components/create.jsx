import React from 'react'
import Bar from './Navbar.jsx'
import ReactFilestack from 'filestack-react';


const Create = () => (
  <div>
    <h1><Bar /></h1>
    <ReactFilestack
  apikey='AkoskuWdQg68HzPb8fzwUz'
  buttonText="Upload"
  buttonClass="buttonClass"
  options={{
    accept: ['image/*', 'video/mp4'],
    fromSources: ['local_file_system','imagesearch', 'url', 'facebook', 'googledrive'],
    imageDim: [400, 400],
    maxFiles: 1,
    //  onSuccess={this.successFunction}
    //  onError={this.failureFunction}
  }}
    />
  </div>
)

export default Create