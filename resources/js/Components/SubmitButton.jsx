import React from 'react';

function SubmitButton({ onClick, className, processing }) {
    return (
        <div className={'flex sp-10 justify-end space-x-4'}>
            <button
                type="submit"
                onClick={onClick}
                className="text-white py-4 px-8 rounded-md bg-primary-light"
                disabled={processing}>
                Submit
            </button>
        </div>
    );
}

export default SubmitButton;
