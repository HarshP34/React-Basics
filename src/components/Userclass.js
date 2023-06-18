import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userInfo: {
        login: "dummy",
        location: "India",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/HarshP34");
    const json = await data.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { login, location, avatar_url } = this.state.userInfo;
    const { count } = this.state;
    return (
      <div className="user-card">
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h3>Count: {count}</h3>
        <img src={avatar_url}></img>
        <h2>Name:{login} </h2>
        <h3>Location:{location} </h3>
        <h3>Contact: @harshpatel</h3>
      </div>
    );
  }
}

export default User;
