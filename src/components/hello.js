import React from 'react';

class Hello extends React.Component {
  constructor() {
    super();
    this.showSidebar = this.showSidebar.bind(this);
  }

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.add('show');
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>note</h1>
          <nav><a href="" onClick={this.showSidebar} >Add New Note</a></nav>
        </header>
        <section className="notes">
          <div className="noteCard">
            <i className="fa fa-edit" />
            <i className="fa fa-times" />
            <h4>Test note!</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </section>
        <aside className="sidebar" ref={(ref) => { this.sidebar = ref; }}>
          <form action="">
            <h3>Add New note</h3>
            <div className="close-btn">
              <i className="fa fa-times" />
            </div>
            <label htmlFor="note-title">Title:</label>
            <textarea className="note-text" />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
      </div>
    );
  }
}


// Hello.propTypes = {
//   message: React.PropTypes.string,
// };

export default Hello;
