import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    Animated,
    Easing,
} from "react-native"
import { color } from "../../constant"
import { TouchableOpacity } from "react-native-gesture-handler"
import SVGIcon from "../SVGIcon/SVGIcon"
import checkmarkIcon from '../../../assets/icons/checkmark-icon';

export class MySwitch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: this.props.isOn,
            animatedValue: new Animated.Value(
                this.props.isOn
                    ? this.props.width - this.props.height + this.props.knobPadding
                    : this.props.knobPadding
            ),
            knobOffset: this.props.width - this.props.height + this.props.knobPadding
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isOn !== this.props.isOn) {
            this.setState(
                { isOn: this.props.isOn },
                () => {
                    Animated.timing(
                        this.state.animatedValue,
                        {
                            toValue: this.state.isOn ? this.state.knobOffset : this.props.knobPadding,
                            easing: Easing.elastic(0.7),
                            duration: 200,
                            useNativeDriver: false,
                        }
                    ).start()
                }
            )
        }
    }

    handlePress() {
        this.setState(
            { isOn: !this.state.isOn },
            () => this.props.onToggle(this.state.isOn)
        )
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    backgroundColor: this.state.isOn ? color.brandPurple : 'silver',
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: 10,
                    justifyContent: 'center',
                }}
                onPress={() => this.handlePress()}
            >
                <Animated.View
                    style={{
                        width: this.props.height - this.props.knobPadding * 2,
                        height: this.props.height - this.props.knobPadding * 2,
                        borderRadius: 32,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: this.state.isOn ? color.brandPurple : 'silver',
                        transform: [{
                            translateX: this.state.animatedValue,
                        }]
                    }}
                >
                    {
                        !this.state.isOn
                            ?
                            null
                            :
                            <SVGIcon
                                width={this.props.height / 2.5}
                                height={this.props.height / 2.5}
                                src={checkmarkIcon}
                            />
                    }
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

MySwitch.propTypes = {
    isOn: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    knobPadding: PropTypes.number,
}

MySwitch.defaultProps = {
    isOn: false,
    width: 40,
    height: 20,
    knobPadding: 0
}