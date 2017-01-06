import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './components/hello';
// import mul, { add, sub, } from './e';
import div from './e';

// console.log(add(1, 3));
// console.log(div(4, 2));
// console.log(mul(2, 3));
// console.log(div(6, 1));

// class App extends React.Component {
//   render() {
//     return (
//       <h1>Hello</h1>
//     );
//   }
// }


ReactDOM.render(<Hello />, document.getElementById('app'));
