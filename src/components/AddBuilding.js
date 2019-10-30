import React, {useState} from 'react';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddBuilding = (props) => {

    const {data} = props;
    const [hasSubmitted, setSubmitted] = useState(false);
    const [hasError, setError] = useState(false);

    const useCreationForm = (initializers, callback) => {
        const [inputs, setInputs] = useState(initializers);
        const handleSubmit = (event) => {
            if (event) event.preventDefault();
            callback();
        };
        const handleInputChange = (event) => {
            event.persist();
            setSubmitted(false);
            setError(false);
            setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        };
        return {
            handleSubmit,
            handleInputChange,
            inputs
        };
    };

    const submit = () => {
        let newData = {id: inputs.id, code: inputs.code, name: inputs.name, address: inputs.address};
        if (inputs.latitude.trim() !== '' && inputs.longitude.trim() !== '')
            newData.coordinates = {
                latitude: inputs.latitude,
                longitude: inputs.longitude
            };

        if (data.filter((listing) => {
            return String(listing.id) === newData.id;
        }).length === 0) {
            props.addData(newData);
            setSubmitted(true);
        } else {
            setSubmitted(false);
            setError(true);
        }
    };

    const {inputs, handleInputChange, handleSubmit} = useCreationForm({
        id: '',
        code: '',
        name: '',
        latitude: '',
        longitude: '',
        address: ''
    }, submit);

    return (
        <div>
            <hr/>
            <h3>Create new listing</h3>
            <form className='add-building-form text-center' onSubmit={handleSubmit}>
                <input className="text-center input w-auto" type='text' name='id' placeholder='Enter a unique id'
                       onChange={handleInputChange}
                       value={inputs.id}
                       required/>
                <input className="text-center input w-auto" type='text' name='code' placeholder='Enter a building code'
                       onChange={handleInputChange}
                       value={inputs.code} required/>
                <input className="text-center input w-auto" type='text' name='name' placeholder='Enter a building name'
                       onChange={handleInputChange}
                       value={inputs.name} required/>
                <input className="text-center input w-auto" type='text' name='latitude' placeholder='Enter a latitude'
                       onChange={handleInputChange}
                       value={inputs.latitude}/>
                <input className="text-center input w-auto" type='text' name='longitude' placeholder='Enter a longitude'
                       onChange={handleInputChange}
                       value={inputs.longitude}/>
                <input className="text-center input w-auto" type='text' name='address' placeholder='Enter an address'
                       onChange={handleInputChange}
                       value={inputs.address} required/>
                <br/>
                <br/>
                <button type='submit' className={'create-button btn btn-primary btn-lg btn-dark btn-block'}>Create
                    <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faPlusCircle}/>
                </button>
            </form>
            {inputs.code && hasSubmitted ?
                <h5 style={{color: 'green', textAlign: 'center', 'margin': '1rem'}}>Inserted new listing with
                    code <b>'{inputs.code}'</b> and ID <b>'{inputs.id}'</b>.</h5> : ''}
            {hasError ?
                <h5 style={{color: 'red', textAlign: 'center', 'margin': '1rem'}}>The listing with ID
                    of <b>'{inputs.id}'</b> already
                    exists!</h5> : ''}
            <hr/>
        </div>
    );
};

export default AddBuilding;