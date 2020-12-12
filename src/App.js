import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

//cSpell:disable
const Wrapper = styled.div`
    font-family: 'monospace';
`;

const Title = styled.h1`
    color: palevioletred;
    letter-spacing: 1vw;
    margin: 8vh 0px;
    text-align: center;
    text-decoration: underline wavy palevioletred;
`;

const Search = styled.form`
    display: flex;
    justify-content: center;
    margin: 20vh 0vh 12vh 0;
`;

const Input = styled.input`
    border: none;
    border-bottom: 2px solid papayawhip;
    font-size: 20px;
    margin-right: 2vw;
    outline: none;
    text-align: center;
    transition: .2s linear;
    width: 38vw;

    &:focus{
        background-color: none;
        border-bottom: 2px solid palevioletred;
    }
`;

const Button = styled.button`
    background-color: palevioletred; 
    border:none;
    border-radius: 6px;
    box-shadow: 0 5px 11px -5px #00000070;
    font-size: 16px;  
    outline: none;
    padding: 1.5vh 3vw;
    transition: .2s linear;

    :hover{   
        color: white;
        cursor: pointer;
    }
`;

const Error = styled.div`
    border: .4px solid red;
    text-align: center;
`;

const ListSep = styled.div`
    border: none;
    border-bottom: 2px solid papayawhip;
    margin: 4vh 4vw;
`;

const PullTitle = styled.h3`
    text-align: center;
`;

const PullBody = styled.p`
    font-family: 'sans-serif';
    font-weight: 100;
`;

const Timing = styled.span`
     font-family: 'sans-serif';
`;


const App = () => {
    const [pull, setPull] = useState([]);
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [notification, setNotification] = useState('');

    const handlePull = (event) => {
        event.preventDefault();

        const data = event.target.inputData.value;

        if (!data.includes('@')) {
            setTimeout(() => {
                setNotification('');
            }, 5000);
            setNotification("Please include the @");

            throw new Error;
        }

        let username = data.split(' ')[0].substring(1).trim();
        setUsername(username);

        let repo = data.split(' ')[1].trim();
        setRepo(repo);

        console.log("the repo name is", repo);
        console.log("the username is", username);

        //fetching the data 
        axios.get(`https://api.github.com/repos/${username}/${repo}/pulls`)
            .then((res) => (setPull(res.data)));
    }

    //cSpell:enable
    return (
        <Wrapper>
            <Title>GH PULL REQS</Title>

            <Search onSubmit={handlePull} >
                <Input type='text' name='inputData' placeholder='enter github username and repo eg @jim4067 blogit' />
                <Button type='submit'> search </Button >
            </Search>


            {
                notification !== ''
                    ?
                    <Error>
                        {notification}
                    </Error>
                    :
                    <div>

                        {pull.map((pull) =>
                            <ListSep key={pull.id}>
                                <PullTitle>
                                    {pull.title}
                                </PullTitle>
                                <PullBody>
                                    {pull.body}
                                </PullBody>
                                <Timing>
                                    Pull request spawned on {new Date(pull.created_at).toDateString()}
                                </Timing>
                                <Timing>
                                    {" "}and destroyed at {pull.closed_at === null ? "Pending" : new Date(pull.closed_at).toDateString()}
                                </Timing>
                            </ListSep>
                        )}

                    </div>
            }

        </Wrapper>
    )
}

export default App;