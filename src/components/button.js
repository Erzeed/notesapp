import React from 'react'
import PropTypes from "prop-types";

export const Buttom = ({onClick, title}) => {
    return <button onClick={onClick}>{title}</button>
}

Buttom.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };
