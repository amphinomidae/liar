import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../firebase.js'
var rand = require('randomstring')

function EnterUsername() {
    const hist = useHistory()
    function Submit() {
        const url = window.location.pathname
        const games = firebase.database().ref('games')
        // If URL doesn't have id, create room
        if (url.length == 6) {
            const id = rand.generate(7)
            const wordset = {
                category: "",
                word: ""
            }
            const game = {
                liar: "",
                players: [
                    document.getElementById('username').value
                ],
                stage: 0,
                wordset: wordset
            }
            games.child(id).set(game)
            hist.replace('/room/' + id)
        }
        // If URL has id, join existing room
        else {
            const id = url.substring(6)
            const player = document.getElementById('username').value
            games.child(id).child('players').push(player)
            hist.replace('/room' + id)
        }
    }

    return (
        <div className='container'>
            <label className='usernameLabel' htmlFor='username'>username:</label> {/*check for uniqueness, or just add a number to the end if not unique*/}
            <input className='usernameInput' type='text' id='username' />
            <button className='block' onClick={Submit} style={{ marginLeft: 'auto', marginRight: 'auto' }}>enter</button>
        </div>
    );
}

export default EnterUsername;
