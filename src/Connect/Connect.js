// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import spinner from 'most-awesome-spinner-ever';

const style = {
  button: {
    margin: 12,
  },
};

class Connect extends Component {
  props: {
    ownRoomNumber: ?number,
    connectedToRoom: ?number,
    connectToRoom: (number) => void,
    muiTheme: Object,
  };
  state = {
    roomNumber: '',
    spinner: '',
    spinnerId: null,
  };
  state: {
    roomNumber: number,
    spinner: string,
    spinnerId: number,
  };

  componentDidMount = () => {
    // @todo: Stop spinner when not visible anymore
    this.setState({
      spinnerId: spinner((char) => {
        this.setState({
            spinner: char,
          }
        )}, 200)
    })
  };

  componentWillUnmount = () => {
    clearInterval(this.state.spinnerId);
  };

  connectToRoom = () => {
    if (this.state.roomNumber === '') {
      return null;
    }
    this.props.connectToRoom(this.state.roomNumber);
  };

  handleChange = (event: Object) => {
    this.setState({
      roomNumber: event.target.value,
    })
  };

  render() {
    if (this.props.connectedToRoom !== null) {
      return null;
    }

    let ownRoomNumber = this.props.ownRoomNumber;
    if (ownRoomNumber === null) {
      ownRoomNumber = `Waiting for server connection.. ${this.state.spinner}`;
    }
    return (
      <div>
        <h3>
          Device ID:&nbsp;
          <span style={{color: this.props.muiTheme.palette.accent1Color}}>
            <strong>
              {ownRoomNumber}
            </strong>
          </span>
        </h3>
        <p>
          Use the Device ID above to connect to the other device.
          Or enter the Device ID of the other device below.
        </p>
        <TextField
          type="number"
          floatingLabelText="Enter the device ID"
          value={this.state.roomNumber}
          onChange={this.handleChange}
          disabled={this.props.ownRoomNumber === null}
        />
        <RaisedButton
          label="Connect"
          primary={true}
          style={style.button}
          onClick={() => this.connectToRoom()}
          disabled={this.state.roomNumber === null}
        />
      </div>
    );
  }
}

export default muiThemeable()(Connect);
