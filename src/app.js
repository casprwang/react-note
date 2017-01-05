import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './components/hello';


// class App extends React.Component {
//   render() {
//     return (
//       <h1>Hello</h1>
//     );
//   }
// }


ReactDOM.render(<Hello />, document.getElementById('app'));
