import React from 'react';
// import ReactDOM from 'react-dom';

export default class NoteCard extends React.Component {

  constructor() {
    super();
    this.state = {
      editing: false,
      note: {},
    };
    this.save = this.save.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     note: this.props.note,
  //   });
  // }

  save(e) {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    // console.log(this);
    const dbRef = firebase.database().ref(`user/${userId}/notes/${this.props.note.key}`);

    dbRef.update({
      title: this.noteTitle.value,
      text: this.noteText.value,
    });

    this.setState({
      editing: false,
    });
  }

  render() {
    let editingTemp = (
      <span>
        <h4>{this.props.note.title}</h4>
        <p>{this.props.note.text}</p>
      </span>
    );

    if (this.state.editing) {
      editingTemp = (
        <form onSubmit={this.save}>
          <div>
            <input type="text" defaultValue={this.props.note.title} name="title" ref={(ref) => { this.noteTitle = ref; }} />
          </div>
          <div>
            <input type="text" defaultValue={this.props.note.text} ref={(ref) => { this.noteText = ref; }} />
          </div>
          <input type="submit" value="Done editing" />
        </form>
      );
    }

    return (
      <div className="noteCard" >
        <i className="fa fa-edit" onClick={() => this.setState({ editing: true })} />
        <i className="fa fa-times" onClick={() => this.props.removeNote(this.props.note.key)} />
        {editingTemp}
      </div>
    );
  }
}
