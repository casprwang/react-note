import React from 'react';
// import RactDOM from 'react-dom';
import NoteCard from './notesCard';

class Hello extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      loggedin: false,
    };
    this.showSidebar = this.showSidebar.bind(this);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.showCreate = this.showCreate.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        firebase.database().ref(`user/${user.uid}/notes`).on('value', (res) => {
            // console.log(res.val());
          const userData = res.val();
          const dataArray = [];
            // console.log(userData);
          for (const objkey in userData) {
            userData[objkey].key = objkey;
            dataArray.push(userData[objkey]);
          }
          this.setState({
            notes: dataArray,
            loggedin: true,
          });
        });
      } else {
        this.setState({
          notes: [],
          loggedin: false,
        });
      }
    });
  }


  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle('show');
  }

  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value,
    };

    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref(`user/${userId}/notes`).push(note);
    this.noteTitle.value = '';
    this.noteText.value = '';
    this.showSidebar(e);
  }

  removeNote(noteId) {
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`user/${userId}/notes/${noteId}`);
    dbRef.remove();
    // firebase.database().ref(`users/${userId}/notes/${noteId}`).remove();
  }

  createUser(e) {
    e.preventDefault();
    // Check the passwords match
    // if so we want to create a user
    const password = this.createPassword.value;
    const confirm = this.confirmPassword.value;
    const email = this.createEmail.value;
    if (password === confirm) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.showCreate(e);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert('Password must match');
    }
  }

  showCreate(e) {
    e.preventDefault();
    this.overlay.classList.toggle('show');
    this.createUserModal.classList.toggle('show');
  }

  showLogin(e) {
    e.preventDefault();
    this.overlay.classList.toggle('show');
    this.loginModal.classList.toggle('show');
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.userEmail.value;
    const password = this.userPassword.value;

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.showLogin(e);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  renderCards() {
    if (this.state.loggedin) {
      return this.state.notes.map((note, i) =>
        <NoteCard key={`note-${i}`} note={note} removeNote={this.removeNote} />,);
    } else {
      return (<h2>Login to add notes!</h2>);
    }
  }

  logOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Note it!</h1>

          <nav>
            {
              (() => {
                if (this.state.loggedin) {
                  return (
                    <span>
                      <a href="" onClick={this.showSidebar} >Add New Note</a>
                      <a href="" onClick={this.logOut}>Logout</a>
                    </span>);
                } else {
                  return (
                    <span>
                      <a href="" onClick={this.showCreate}>Create Account</a>
                      <a href="" onClick={this.showLogin}>Login</a>
                    </span>);
                }
              })()
            }
          </nav>


        </header>
        <div className="overlay" ref={(ref) => { this.overlay = ref; }} />
        <section className="notes">
          {this.renderCards()}
        </section>
        <aside className="sidebar" ref={(ref) => { this.sidebar = ref; }}>
          <form onSubmit={this.addNote}>
            <h3>Add New note</h3>
            <div className="close-btn" onClick={this.showSidebar}>
              <i className="fa fa-times" />
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" ref={(ref) => { this.noteTitle = ref; }} />
            <textarea className="note-text" ref={(ref) => { this.noteText = ref; }} />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>

        {/* login overlay */}
        <div className="loginModal modal" ref={(ref) => { this.loginModal = ref; }}>
          <div className="close" onClick={this.showLogin}>
            <i className="fa fa-times" />
          </div>
          <form action="" onSubmit={this.loginUser}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" ref={(ref) => { this.userEmail = ref; }} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" ref={(ref) => { this.userPassword = ref; }} />
            </div>
            <div>
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>

        {/* create user overlay */}
        <div className="createUserModal modal" ref={(ref) => { this.createUserModal = ref; }} >
          <div className="close" onClick={this.showCreate}>
            <i className="fa fa-times" />
          </div>
          {/* <form action="" onSubmit={e => this.createUser.call(this.e)} > */}
          <form action="" onSubmit={this.createUser} >
            <div>
              <label htmlFor="createEmail">Email:</label>
              <input type="text" name="createEmail" ref={(ref) => { this.createEmail = ref; }} />
            </div>
            <div>
              <label htmlFor="createPassword">Create Password:</label>
              <input type="password" name="createPassword" ref={(ref) => { this.createPassword = ref; }} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" ref={(ref) => { this.confirmPassword = ref; }} />
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }
          }


          // Hello.propTypes = {
//   message: React.PropTypes.string,
// };

export default Hello;
