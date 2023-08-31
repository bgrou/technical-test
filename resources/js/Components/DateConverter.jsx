import React from 'react';

class DateConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputDate: props.date, // Your input date string
            formattedDate: ""
        };
    }

    componentDidMount() {
        const inputDate = new Date(this.state.inputDate);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: false
        };

        const formattedDate = inputDate.toLocaleDateString('en-UK', options);

        this.setState({ formattedDate });
    }

    render() {
        return (
            <div>
                <p className={this.props.className}>{this.state.formattedDate}</p>
            </div>
        );
    }
}

export default DateConverter;
