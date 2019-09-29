import React from "react";
import "./JokItem.scss";
import { ReactComponent as Up } from "./up-arrow.svg";
import { ReactComponent as Down } from "./download-arrow.svg";

class Jok extends React.Component {
  static defaultProps = {
    emoj: "em em-neutral_face"
  };

  constructor(props) {
    super(props);

    this.state = {
      emoj: this.props.emoj
    };
  }

  getColor() {
    if (this.props.vote >= 15) {
      return "#4CAF50";
    } else if (this.props.vote >= 12) {
      return "#8BC34A";
    } else if (this.props.vote >= 9) {
      return "#CDDC39";
    } else if (this.props.vote >= 6) {
      return "#FFEB3B";
    } else if (this.props.vote >= 3) {
      return "#FFC107";
    } else if (this.props.vote >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }
  getEmoj() {
    if (this.props.vote >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.vote >= 12) {
      return "em em-laughing";
    } else if (this.props.vote >= 9) {
      return "em em-smiley";
    } else if (this.props.vote >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.vote >= 3) {
      return "em em-neutral_face";
    } else if (this.props.vote >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    return (
      <div className="jok">
        <div className="jok-vote--container">
          <div onClick={this.props.upVote} className="up">
            <Up style={{ height: 16, width: 16, fill: "#333" }} />
          </div>
          <div
            className="jok-vote"
            style={{
              border: `2px solid ${this.getColor()}`
            }}
          >
            {this.props.vote}
          </div>
          <div onClick={this.props.downVote} className="down">
            <Down style={{ height: 16, width: 16, fill: "#333" }} />
          </div>
        </div>
        <div className="jok-text">{this.props.text}</div>
        <i className={this.getEmoj()}></i>
      </div>
    );
  }
}

export default Jok;
