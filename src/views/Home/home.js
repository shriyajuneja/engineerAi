import React from "react";
import "./home.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }

  redirect = (status) => {
    status
      ? this.props.history.push({
          pathname: "/astroid",
          state: {
            id: status,
          },
          search: `?id=${status}`,
        })
      : this.props.history.push({
          pathname: "/astroid",
          state: {
            id: status,
          },
        });
  };

  render() {
    return (
      <div>
        <form className="parent">
          <input
            type="text"
            placeholder="Enter Asteroid ID"
            value={this.state.id}
            onChange={(e) => {
              this.setState({ id: e.target.value });
            }}
          />
          <div className="buttons">
            <button
              style={{ opacity: this.state.id ? "1" : "0.5" }}
              onClick={() => {
                this.state.id && this.redirect(this.state.id);
              }}
            >
              Submit
            </button>
            <button
              onClick={() => {
                this.redirect(false);
              }}
            >
              Random Astroid
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Home;
