import validator from 'validator';
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`
    }
  };

const vname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};
const vplate = value => {
    if (value.length < 3 || value.length > 8) {
        return (
            <div className="alert alert-danger" role="alert">
                The license plate must be between 3 and 8 characters.
            </div>
        );
    }
};
const vPhoneNumber = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};