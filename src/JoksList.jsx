import React, { Component } from "react";
import Jok from "./JokItem";
import "./JoksList.scss";
import axios from "axios";

class JoksList extends Component {
  static defaultProps = {
    NumbJoks: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      joks: JSON.parse(window.localStorage.getItem("joks") || "[]")
    };

    this.seenJoks = new Set(this.state.joks.map(j => j.joke));

    this.manageVote = this.manageVote.bind(this);
    this.getNewJoks = this.getNewJoks.bind(this);
    this.handlClick = this.handlClick.bind(this);
  }

  async componentDidMount() {
    if (this.state.joks.length === 0) {
      this.getNewJoks();
    }
  }

  async getNewJoks() {
    let joks = [];

    while (joks.length < this.props.NumbJoks) {
      let jok = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      let id = jok.data.id;
      let newJok = jok.data.joke;
      if (!this.seenJoks.has(newJok)) joks.push({ id, joke: newJok, vote: 0 });
    }

    this.setState(
      st => ({
        joks: [...st.joks, ...joks]
      }),
      () => window.localStorage.setItem("joks", JSON.stringify(joks))
    );

    // window.localStorage.setItem("joks", JSON.stringify(joks));
  }

  manageVote(id, value) {
    this.setState(
      st => ({
        joks: this.state.joks.map(jok =>
          jok.id === id ? { ...jok, vote: jok.vote + value } : jok
        )
      }),
      () => window.localStorage.setItem("joks", JSON.stringify(this.state.joks))
    );
  }

  handlClick() {
    this.getNewJoks();
  }

  render() {
    let joksSorted = this.state.joks.sort((a, b) => b.vote - a.vote);

    let joks = joksSorted.map(j => (
      <Jok
        upVote={() => this.manageVote(j.id, 1)}
        downVote={() => this.manageVote(j.id, -1)}
        vote={j.vote}
        text={j.joke}
        key={j.id}
      />
    ));
    return (
      <div className="jokslist">
        <div className="jokslist-header">
          <h1>
            <span>joks</span> of my dad
          </h1>
          <button onClick={this.handlClick}>new joks</button>
        </div>
        <div className="joklist-body">{joks}</div>
      </div>
    );
  }
}

export default JoksList;
