import React from 'react';

const RepoListEntry = (props) => {
  // console.log("https://github.com/" + {props.repo.owner} + '/' + {props.repo.name});
  return(
   <div>{props.repo.owner} has {props.repo.name}: with {props.repo.id} id </div>
  )
}

// function RepoListEntry(props) {
//   return <h1>Hello, {props.repo.name}</h1>;
// }

// class RepoListEntry extends React.Component {
//   render() { 
//     return (
//     <div>{this.props.repo.owner} has {this.props.repo.name}: with {this.props.repo.id} id </div>
//     )
//   }
// }

export default RepoListEntry;