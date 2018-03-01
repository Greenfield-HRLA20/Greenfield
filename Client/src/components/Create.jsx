import React from 'react';
import Bar from './Navbar.jsx';
import Submit from './Submit.jsx';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import TabBar from './TabBar.jsx';
// import api from '../../../filestack.config.js'

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
  storeUrl: url => dispatch(actions.storeUrl(url))
});

const mapStateToProps = state => ({ currentView: state.currentView });

const ConnectedCreate = props => (
  <div>
    <h1>
      <TabBar />
    </h1>
    <ReactFilestack
      apikey="A00Yv3QHpR4GK06ER6lH9z"
      buttonText="Upload"
      buttonClass="buttonClass"
      options={{
        accept: ['image/*', 'video/*'],
        fromSources: [
          'local_file_system',
          'imagesearch',
          'url',
          'facebook',
          'googledrive'
        ],
        maxFiles: 1
      }}
      onSuccess={response => {
        console.log('I just uploaded:', response.filesUploaded[0]);
        if (response.filesUploaded[0].mimetype.includes('image')) {
          let rawUrl = response.filesUploaded[0].url;
          rawUrl = rawUrl.split('/');
          rawUrl[2] += '/resize=width:600,height:600,fit:crop';
          rawUrl = rawUrl.join('/');
          props.storeUrl(rawUrl);
        } else if (response.filesUploaded[0].mimetype === 'video/mp4') {
          props.storeUrl(response.filesUploaded[0].url);
        }
        props.updateCurrentView(
          <Submit mediaType={response.filesUploaded[0].mimetype} />
        );
      }}
      onError={err => console.log(err)}
    />
  </div>
);

const Create = connect(mapStateToProps, mapDispatchToProps)(ConnectedCreate);

export default Create;
