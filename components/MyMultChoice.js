import PropTypes from "prop - types";
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class MyMultChoice extends Component {
    static propTypes = {
        content: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]),
        textStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired,
        buttonStyles: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired,
    }
}