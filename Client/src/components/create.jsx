import React from 'react';
import Bar from './Navbar.jsx';
import Submit from './Submit.jsx';
import actions from '../redux/actions/index';
import {connect} from 'react-redux';
import ReactFilestack from 'filestack-react';
import api from '../../../filestack.config.js'

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
    storeUrl: url => dispatch(actions.storeUrl(url))
  };
};

const mapStateToProps = state => {
  return {currentView: state.currentView,
  }
} 

const ConnectedCreate = (props) => (
  <div>
    <h1><Bar /></h1>
    <ReactFilestack
  apikey={api.key}
  buttonText="Upload"
  buttonClass="buttonClass"
  options={{
    accept: ['image/*', 'video/mp4'],
    fromSources: ['local_file_system','imagesearch', 'url', 'facebook', 'googledrive'],
    maxFiles: 1,
  }}
  onSuccess = {(response) => {
    // console.log('Success!', response);
    console.log(response.filesUploaded[0].url);
    let rawUrl = response.filesUploaded[0].url;
    console.log(rawUrl.split('/'));
    rawUrl = rawUrl.split('/');
    rawUrl[2] += '/resize=width:200,height:200,fit:crop';
    rawUrl = rawUrl.join('/');
    console.log('THIS IS IT', rawUrl);
    props.storeUrl(rawUrl);
    props.updateCurrentView(<Submit />);
  }}
  onError={(err) => console.log(err)}
    />
  </div>
)

const Create = connect(mapStateToProps, mapDispatchToProps)(ConnectedCreate);

export default Create