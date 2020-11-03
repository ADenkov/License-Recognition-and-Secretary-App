import React from 'react';
const List = (props) => {
    const { repos } = props;
    if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
    return (
        <ul>
            <h2 className='list-head'>Available Public Repositories</h2>
            {repos.map((repo) => {
                return (
                    <li key={repo.id} className='list'>
                        <span className='repo-text'>{repo.firstName} </span>
                        <span className='repo-description'>{repo.lastName}</span>
                        <span className='repo-description'>{repo.email}</span>
                        <span className='repo-description'>{repo.licensePlate}</span>
                        <span className='repo-description'>{repo.phoneNumber}</span>
                    </li>
                );
            })}
        </ul>
    );
};
export default List;
