import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    filterUpdate = (e) => {
        this.setState({
            text: e.target.value
        });

        if (this.props.onChange)
            this.props.onChange(e.target.value);
    };

    render() {
        //You will need to save the value from the textbox and update it as it changes
        //You will need the onChange value for the input tag to capture the textbox value
        return (
            <form>
                <div className='search-bar col-md-10 w-25 input-group shadow-sm p-3 mb-5 bg-white rounded'>
                    <input className='font-italic form-control py-2 border-right-0' type="text"
                           value={this.state.text} placeholder="Type to Filter"
                           onChange={this.filterUpdate}/>
                    <span className="input-group-append border-left-0 border-0">
                        <div className="input-group-text bg-transparent"><FontAwesomeIcon icon={faSearch}/></div>
                    </span>
                </div>
            </form>
        );
    }
}

export default Search;