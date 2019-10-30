import React from 'react';
import {Component, memo} from 'react';

class BuilingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            newListing: null,
            deletion: -1
        };
    }

    onClick = (id) => {
        this.setState({
            id: id
        });

        this.props.onClick(id);
    };

    componentDidUpdate(prevProps) {

        if (this.props.deletion !== prevProps.deletion) {
            this.setState({
                deletion: this.props.deletion
            });
        }

        if (this.props.newListing !== prevProps.newListing) {
            this.setState({
                newListing: this.props.newListing
            })
        }
    }

    render() {
        //console.log('This is my directory file', this.props.data);
        const {data, filter, newListing, deletion} = this.props;

        if (deletion >= 0) {
            data.splice(deletion, 1);
            this.props.resetDelete();
        } else if (newListing && data.filter(listing => (String(listing.id) === newListing.id)).length === 0) {
            data.push(newListing);
            this.props.resetListing();
        }

        const buildingList = data.filter(listing => {
            if (filter.trim() !== '') {
                const regexp = new RegExp(filter.trim().toLocaleLowerCase().replace(/\\/g, '&#92;'), 'gi');
                if (listing.name) {
                    const result = listing.name.trim().toLocaleLowerCase().match(regexp);
                    return result && result.length > 0;
                }
                return false;
            } else
                return true;
        }).map(listing => {
            return <DirectoryRow onClick={this.onClick} listing={listing}/>
        });

        return <div>{buildingList}</div>;
    }
}

const DirectoryRow = memo((props) => {
    const onClick = () => props.onClick(props.listing.id);
    return (
        <tr key={props.listing.id} onClick={onClick}>
            <td>{props.listing.code} </td>
            <td> {props.listing.name} </td>
        </tr>
    );
});

export default BuilingList;
