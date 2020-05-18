import React from "react";
import Axios from "axios";
import { Key } from "../../constant";
import "./astroid.css";

class Astroid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let res = {};
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.id
    ) {
      await Axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${this.props.location.state.id}?api_key=${Key}`
      ).then(
        (result) => {
          res = result;
        },
        (err) => {
          if (err.response.status) {
            this.setState({
              error: true,
            });
          }
        }
      );
    } else {
      let random = await Axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${Key}`
      );
      let data = random.data.near_earth_objects;
      let size = data ? data.length : 0;
      let randomNumber = Math.floor(Math.random(size) * size);
      if (data[randomNumber] && data[randomNumber].id) {
        let id = data[randomNumber].id;
        res = await Axios.get(
          `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${Key}`
        );
      }
    }
    this.setState({ loading: false });
    if (res) {
      this.setState({ data: res.data });
    }
  }
  render() {
    return (
      <div>
        {!this.state.loading && (
          <div
            className="back"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            {" < Back"}
          </div>
        )}
        {this.state.loading ? (
          "LOADING....."
        ) : this.state.error && (!this.state.data || !this.state.data.id) ? (
          "Invalid Astroid Id"
        ) : (
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Nasa jpl url</th>
                  <th>Is potentially hazardous asteroid</th>
                </tr>
                <tr>
                  <td>{this.state.data && this.state.data.name}</td>
                  <td>
                    <a href={this.state.data && this.state.data.nasa_jpl_url}>
                      {this.state.data && this.state.data.nasa_jpl_url}
                    </a>
                  </td>
                  <td>
                    {this.state.data &&
                    this.state.data.is_potentially_hazardous_asteroid
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
export default Astroid;
