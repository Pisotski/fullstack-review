import React from 'react';

const RepoListEntry = (props) => (
  <div>{props.repo.owner} has {props.repo.name}: with {props.repo.watchers} watchers </div>
)


export default RepoListEntry;