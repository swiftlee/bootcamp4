import React, {useState} from 'react';

const RemoveBuilding = (props) => {

    const {data} = props;
    const [hasSubmitted, setSubmitted] = useState(false);
    const [hasError, setError] = useState(false);

    const useRemovalForm = (initializers, callback) => {
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
        let index = -1;
        const listing = data.filter((listing, idx) => {
            if (String(listing.id) === inputs.id)
                index = idx;
            return String(listing.id) === String(inputs.id);
        });
        if (listing.length === 1 && index >= 0) {
            setSubmitted(true);
            props.handleDelete(index);
        } else {
            setSubmitted(false);
            setError(true); // could not find the listing
        }
    };

    const {inputs, handleInputChange, handleSubmit} = useRemovalForm({
        id: ''
    }, submit);

    return (
        <div>
            <hr/>
            <h3>Remove a listing</h3>
            <form className='text-center remove-building-form' onSubmit={handleSubmit}>
                <input className="text-center input w-auto" type='text' name='id' placeholder='Enter an existing id'
                       onChange={handleInputChange}
                       value={inputs.id}
                       required/>
                <div className="col-lg-12 text-center">
                    <button type='submit'
                            className='btn btn-primary btn-lg btn-light btn-outline-danger w-auto'>Remove listing
                    </button>
                </div>
            </form>
            {inputs.id.trim() !== '' && hasSubmitted ?
                <h5 style={{color: 'green', textAlign: 'center', margin: '1rem'}}>Successfully removed a listing with
                    ID <b>'{inputs.id}'</b>.</h5> : (hasError ?
                    <h5 style={{color: 'red', textAlign: 'center', margin: '1rem'}}>Could not find a listing with
                        ID <b>'{inputs.id}'</b>.</h5> : '')}
            <hr/>
        </div>
    );
};

export default RemoveBuilding;