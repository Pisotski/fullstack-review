import React from 'react';

function RepoListEntry(props) {
  var link = `https://github.com/${props.repo.owner}/${props.repo.name}`;
  return (
    <div>
      <a href={link}>{props.repo.owner} </a>{props.repo.name} has {props.repo.name}: with {props.repo.id} id 
    </div>
    )
  }

export default RepoListEntry;