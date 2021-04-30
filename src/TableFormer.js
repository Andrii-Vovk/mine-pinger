import React from 'react';
import './index.css'
import Avatar from './Avatar';
import { Table } from 'react-bootstrap';

class TableFormer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            players: [],
            url: "",
            port: "",
            tabledata: null,
            Err: null,
            playercount: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        let fetchurl = "https://api.minetools.eu/ping/" + this.state.url + "/" + this.state.port;

        this.setState({
            count: 0,
            players: [],
            Err: null,
            playercount: 0
        });

        fetch(fetchurl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => {
                let result = [];
                for (var i = 0; i < data.players.sample.length; i++) {
                    result.push(data.players.sample[i]);
                }
                this.setState({
                    count: data.players.online,
                    players: { ...result }
                });
            })
            .catch((error) => {
                this.setState({
                    Err: "Oops! Something went wrong. Cant ping the server."
                })
            });

        setTimeout(() => {
            console.log(this.state.url)
            console.log(this.state.count)
            console.log(this.state.players)

            if (this.state.count === 0) {
                console.log("Nothing here!!")
                return;
            };

            let avatararr = [];
            console.log("fuck " + this.state.players.length)
            for (var prop in this.state.players) {
                avatararr.push(<div><Avatar uuid={this.state.players[prop].id} name={this.state.players[prop].name} /></div>)
                console.log(this.state.players[prop].id)
            }

            console.log("here!")
            this.setState({
                tabledata: avatararr,
                playercount: avatararr.length
            })

        }, 500);
    }


    render() {
        return (
            <>
                <div>
                </div>
                <form onSubmit={this.handleSubmit} className="innform">
                    <label>
                        IP:
                        <br />
                        <input type="text" name="url" value={this.state.url} onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Port (optional):
                        <br />
                        <input type="text" name="port" value={this.state.port} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" value="Ping!" className="btn success" />
                </form>
                <div className="innform" style={{marginBottom: "25px"}}>
                    <p>Online players: <span style={{ color: 'green' }}>{this.state.count}</span></p>
                    <p>Api returned <span style={{ color: 'yellow' }}>{this.state.playercount}</span> players</p>
                    <p style={{ color: "red" }}>{this.state.Err}</p>
                </div>
                <div>
                    <div className="wrapper">
                        {this.state.tabledata}
                    </div>
                </div>
            </>
        );
    }
}

export default TableFormer;