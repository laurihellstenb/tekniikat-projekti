import React, { Component } from "react";
import Message from "./components/Message";
import Form from "./components/Form";
import { config } from "./fire";
import * as firebase from "firebase";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // tyhjä messages-array stateen
    this.state = {
      messages: []
    };

    // käynnistää yhteyden firebaseen, configista löytyy oman firebasen osoite
    this.app = firebase.initializeApp(config);

    // hakee tietokannasta lokaation "messages"
    this.db = this.app.database().ref().child("messages");

  }

  componentDidMount() {
    const allMessages = this.state.messages;

    // kuuntelee tietokantaa ja kun sinne tulee uusi viesti, lisää sen stateen
    this.db.on("child_added", snapshot => {
      allMessages.push({
        id: snapshot.key, msgText: snapshot.val().msgText
      });
      this.setState({
        messages: allMessages
      });
    });

    // kuuntelee tietokantaa ja kun sieltä poistetaan viesti, poistaa sen statesta
    this.db.on("child_removed", snapshot => {
      for (var i = 0; i < allMessages.length; i++) {
        if (allMessages[i].id === snapshot.key) {
          allMessages.splice(i, 1);
        }
      }
      this.setState({
        messages: allMessages
      });
    });
  }

  // lisää viestin tietokantaan 
  addMsg = (message) => {
    this.db.push().set({ msgText: message });
  }

  // poistaa viestin tietokannasta 
  removeMsg = (msgId) => {
    this.db.child(msgId).remove();
  }

  render() {
    return (
      <div className="appBody">
        <div>Jätä viesti</div>

        {/*renderöi Form-komponentin*/}
        <Form addMsg={this.addMsg} />

        {/*mappaa kaikki viestit statesta*/}
        {this.state.messages.map(message => {
          return (
            <Message msgText={message.msgText} msgId={message.id} key={message.id} removeMsg={this.removeMsg} />
          );
        })}
      </div>
    );
  }
}

export default App;
