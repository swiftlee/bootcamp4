import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from "./components/AddBuilding";
import RemoveBuilding from "./components/RemoveBuilding";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            selectedBuilding: '',
            newListing: null,
            deletion: -1
        };
    }

    filterUpdate = (value) => {
        //Here you will need to set the filterText property of state to the value passed into this function
        this.setState({
            filterText: value
        });
    };

    selectedUpdate = (id) => {
        //Here you will need to update the selectedBuilding property of state to the id passed into this function
        this.setState({
            selectedBuilding: String(id)
        });

    };

    addData = (newData) => {
        this.setState({
            newListing: newData
        });
    };

    handleDelete = (index) => {
        this.setState({
            deletion: index
        });

        console.log('deleting from index: ', index);
    };

    resetDelete = () => {
        this.setState({
            deletion: -1
        });
    };

    resetListing = () => {
        this.setState({
            newListing: null
        });
    };

    render() {

        return (
            <div className="bg">
                <div className="row">
                    <h1>UF Directory App</h1>
                </div>

                <AddBuilding data={this.props.data} addData={this.addData}/>
                <RemoveBuilding data={this.props.data} handleDelete={this.handleDelete}/>
                <h4>Search listings</h4>
                <Search onChange={this.filterUpdate}/>
                <main>
                    <div className="row">
                        <div className="column1">
                            <div className="tableWrapper">
                                <table className="table table-striped table-hover">
                                    <tr>
                                        <td>
                                            <b>Code Building</b>
                                        </td>
                                    </tr>
                                    <BuildingList filter={this.state.filterText} onClick={this.selectedUpdate}
                                                  data={this.props.data} newListing={this.state.newListing}
                                                  deletion={this.state.deletion} resetDelete={this.resetDelete}
                                                  resetListing={this.resetListing}/>
                                </table>
                            </div>
                        </div>
                        <div className="column2">
                            <ViewBuilding data={this.props.data} id={this.state.selectedBuilding}/>
                        </div>
                    </div>
                    <Credit/>
                </main>
            </div>
        );
    }
}

export default App;
