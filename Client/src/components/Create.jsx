import React from 'react';
import Bar from './Navbar.jsx';
import TabBar from './TabBar.jsx';
import Submit from './Submit.jsx';
import Feed from './Feed.jsx';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

//
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
  storeUrl: url => dispatch(actions.storeUrl(url)),
  updateNav: string => dispatch(actions.updateNav(string)),
});

const mapStateToProps = state => ({
  currentView: state.currentView,
  currentUser: state.currentUser,
  currentNav: state.currentNav,
  urlState: state.urlState,
});

// const ConnectedCreate = props => (
//   <div style={{ textAlign: 'center' }}>
//     <h1>
//       <TabBar />
//     </h1>
// <ReactFilestack
//   apikey="A00Yv3QHpR4GK06ER6lH9z"
//   buttonText="Upload!"
//   style={{ fontSize: '400px', color: 'red' }}
//   buttonClass="filestack"
//   options={{
//     accept: ['image/*', 'video/*'],
//     fromSources: ['local_file_system', 'imagesearch', 'url', 'facebook', 'googledrive'],
//     maxFiles: 1,
//   }}
//   onSuccess={(response) => {
//     console.log('I just uploaded:', response.filesUploaded[0]);
//     if (response.filesUploaded[0].mimetype.includes('image')) {
//       let rawUrl = response.filesUploaded[0].url;
//       rawUrl = rawUrl.split('/');
//       rawUrl[2] += '/resize=width:600,height:600,fit:crop';
//       rawUrl = rawUrl.join('/');
//       props.storeUrl(rawUrl);
//     } else if (response.filesUploaded[0].mimetype === 'video/mp4') {
//       props.storeUrl(response.filesUploaded[0].url);
//     }
//     props.updateCurrentView(<Submit mediaType={response.filesUploaded[0].mimetype} />);
//   }}
//   onError={err => console.log(err)}
// />
//   </div>
// );

// const Create = connect(mapStateToProps, mapDispatchToProps)(ConnectedCreate);

// export default Create;

class ConnectedHorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      url: '',
      mediaType: '',
      caption: '',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.setInput = this.setInput.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }
  setInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitPost() {
    axios
      .post('/submitPost', {
        uid: this.props.currentUser.uid,
        caption: this.state.caption,
        postUrl: this.state.url,
        mediaType: this.state.mediaType,
      })
      .then((result) => {
        this.props.updateCurrentView(<Feed />);
        this.props.updateNav('feed');
      })
      .catch((err) => {
        console.log('Error submitting post', err);
      });
  }

  handleNext() {
    const { stepIndex } = this.state;
    console.log('before incrementing index is: ', this.state.stepIndex);

    if (stepIndex === 0.5) {
      this.setState({ stepIndex: 1 });
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex === 0.5 || stepIndex === 1) {
      this.setState({ stepIndex: 0 });
    } else if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  getStepContent(stepIndex) {
    console.log('step index is', stepIndex);
    switch (stepIndex) {
      case 0:
        return (
          <ReactFilestack
            apikey="A00Yv3QHpR4GK06ER6lH9z"
            buttonText="Upload!"
            style={{ fontSize: '400px', color: 'red' }}
            buttonClass="filestack"
            options={{
              accept: ['image/*', 'video/*'],
              fromSources: ['local_file_system', 'imagesearch', 'url', 'facebook', 'googledrive'],
              maxFiles: 1,
            }}
            onSuccess={response => {
              console.log('I just uploaded:', response.filesUploaded[0]);
              if (response.filesUploaded[0].mimetype.includes('image')) {
                let rawUrl = response.filesUploaded[0].url;
                rawUrl = rawUrl.split('/');
                rawUrl[2] += '/resize=width:600,height:600,fit:crop';
                rawUrl = rawUrl.join('/');
                this.setState({
                  url: rawUrl,
                  mediaType: 'image',
                });
                // props.storeUrl(rawUrl);
              } else if (response.filesUploaded[0].mimetype === 'video/mp4') {
                this.setState({
                  url: response.filesUploaded[0].url,
                  mediaType: 'video',
                });
                // props.storeUrl(response.filesUploaded[0].url);
              }
              this.setState({
                stepIndex: 0.5,
              });
              this.getStepContent(0.5);
              // props.updateCurrentView(<Submit mediaType={response.filesUploaded[0].mimetype} />);
            }}
            onError={err => console.log(err)}
          />
        );
      case 0.5:
        return (
          <div>
            {this.state.mediaType.includes('image') && (
              <img height="300" width="300" src={this.state.url} />
            )}
            {this.state.mediaType === 'video/mp4' && (
              <video width="600" height="600" controls>
                <source src={this.state.url} type="video/mp4" />
              </video>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            {this.state.mediaType.includes('image') && (
              <img height="300" width="300" src={this.state.url} />
            )}
            {this.state.mediaType === 'video/mp4' && (
              <video width="300" height="300" controls>
                <source src={this.state.url} type="video/mp4" />
              </video>
            )}
            <br />
            <br />
            <TextField
              hintText="Enter your caption here..."
              name="caption"
              onChange={e => this.setInput(e)}
              style={{ width: '80%' }}
            />
          </div>
        );
      case 2:
        return (
          <div>
            {this.state.mediaType.includes('image') && (
              <img height="300" width="300" src={this.state.url} />
            )}
            {this.state.mediaType === 'video/mp4' && (
              <video width="600" height="600" controls>
                <source src={this.state.url} type="video/mp4" />
              </video>
            )}
            <br />
            <br />
            <span style={{ fontSize: '20px', fontFamily: 'Roboto, sans-serif' }}>
              {this.state.caption}
            </span>
          </div>
        );
      default:
        return 'Encountered error with horizontal stepper';
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div>
        <h1>
          <TabBar />
        </h1>
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Upload</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add Caption</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <div>
                {this.submitPost()}
                <a
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    this.setState({ stepIndex: 0, finished: false });
                  }}
                >
                  Click here
                </a>{' '}
                to reset the example.
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center' }}>{this.getStepContent(stepIndex)}</div>
                <div style={{ marginTop: 12, textAlign: 'right' }}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    disabled={stepIndex === 0}
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary
                    onClick={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const HorizontalLinearStepper = connect(mapStateToProps, mapDispatchToProps)(ConnectedHorizontalLinearStepper);

export default HorizontalLinearStepper;
