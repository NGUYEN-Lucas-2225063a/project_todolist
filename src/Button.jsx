import PropTypes from "prop-types";


const Button = ({children, ...props}) => {
    return (
        <button {...props} className="buttons">
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Button;
