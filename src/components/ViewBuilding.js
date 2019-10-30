import React from 'react';

class ViewBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listing: null,
            id: ''
        }
    }

    componentDidUpdate(prevProps) {

        /*if (this.props.deletion >= 0 && this.props.deletion !== prevProps.deletion) {
            if (String(this.props.id) === (this.props.data[this.props.deletion].id))
                this.props.id = prevProps.id;

            this.props.data.splice(this.props.deletion, 1);
        }*/

        if (this.props.id !== prevProps.id) {
            this.setState({
                id: String(this.props.id)
            });
        }
    }

    getListing = () => {
        const {data, id} = this.props;

        let listing = data.filter(directory => {
            return String(directory.id) === id;
        });

        listing = listing[0];

        const mappedListing = Object.entries(listing).map((entry) => {
            let [key, value] = entry;
            if (value instanceof Object) {
                return (
                    <tr key={key}>
                        <td>Latitude: {value.latitude} | Longitude: {value.longitude}</td>
                    </tr>);
            }

            return (
                <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</td>
                </tr>);
        });

        return <div className='shadow p-3 mb-5 rounded'>{mappedListing}</div>;
    };

    render() {
        return (
            <div>
                <p>
                    <i>Click on a name to view more information</i>
                </p>
                <table>
                    <tbody>
                         {String(this.state.id).trim() !== '' ? this.getListing() : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewBuilding;
