import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postImage} from '../../actions/index';
import { Field, reduxForm } from 'redux-form';

const UPLOAD_PRESET = 'w9ffho9g';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', UPLOAD_PRESET);
    this.props.postImage(formData)
      .then((res) => {
          this.props.input.onChange(res.payload.payload.data.secure_url);
      })
  }

  render() {
    return (
      <input
        onChange={this.onChange}
        name="img"
        type="file"
        className="form-control file-upload"
        accept=".jpg, .jpeg, .png"
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postImage}, dispatch);
}

export default connect(null, mapDispatchToProps)(FileUpload);