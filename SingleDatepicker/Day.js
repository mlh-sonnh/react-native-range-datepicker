import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.day.type == this.props.day.type) return false;

        return true;
    }

    render() {
        const { day, dayProps, monthInfos } = this.props;
        let dayStyle = {
            backgroundColor: 'transparent',
            position: 'relative',
            width: '14.28%',
        };
        let textDayStyle = { color: 'black', fontWeight: '600' };
        switch (day.type) {
            case 'disabled':
            case 'blockout':
                textDayStyle = { color: '#ccc', fontWeight: '600' };
                break;
            case 'selected':
                dayStyle = {
                    position: 'relative',
                    width: '14.28%',
                    backgroundColor: dayProps.selectedBackgroundColor,
                };
                textDayStyle = {
                    color: dayProps.selectedTextColor,
                    fontWeight: '600',
                };
                break;
            default:
                break;
        }

        if (day.date) {
            if (day.type == 'disabled') {
                return (
                    <TouchableWithoutFeedback
                        activeOpacity={1}
                        style={dayStyle}
                    >
                        <View
                            style={{
                                ...dayStyle,
                                height: Math.floor(DEVICE_WIDTH / 10),
                                justifyContent: 'center',
                                maxHeight: 30,
                            }}
                        >
                            <Text
                                style={{
                                    ...textDayStyle,
                                    textAlign: 'center',
                                    width: Math.floor(DEVICE_WIDTH / 10),
                                    backgroundColor: 'transparent',
                                    fontSize: Math.floor(DEVICE_WIDTH / 26),
                                }}
                            >
                                {moment(day.date, 'YYYYMMDD').date()}
                            </Text>
                            {day.date == moment().format('YYYYMMDD') ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        justifyContent: 'center',
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: Math.floor(
                                                DEVICE_WIDTH / 17
                                            ),
                                            fontWeight: 'bold',
                                            color: '#ccc',
                                            textAlign: 'center',
                                        }}
                                    >
                                        __
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
            if (day.type == 'blockout') {
                const strikeTop = Math.floor(DEVICE_WIDTH / -22);
                return (
                    <TouchableWithoutFeedback
                        activeOpacity={1}
                        style={dayStyle}
                    >
                        <View
                            style={{
                                ...dayStyle,
                                height: Math.floor(DEVICE_WIDTH / 10),
                                justifyContent: 'center',
                                maxHeight: 30,
                            }}
                        >
                            <Text
                                style={{
                                    ...textDayStyle,
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    fontSize: Math.floor(DEVICE_WIDTH / 26),
                                }}
                            >
                                {moment(day.date, 'YYYYMMDD').date()}
                            </Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: strikeTop,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    justifyContent: 'center',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: Math.floor(DEVICE_WIDTH / 17),
                                        color: '#ccc',
                                        textAlign: 'center',
                                    }}
                                >
                                    __
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
            return (
                <TouchableWithoutFeedback
                    activeOpacity={1}
                    style={dayStyle}
                    onPress={() =>
                        this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))
                    }
                >
                    <View
                        style={{
                            ...dayStyle,
                            height: Math.floor(DEVICE_WIDTH / 10),
                            justifyContent: 'center',
                            maxHeight: 30,
                        }}
                    >
                        <Text
                            style={{
                                ...textDayStyle,
                                textAlign: 'center',
                                backgroundColor: 'transparent',
                                fontSize: Math.floor(DEVICE_WIDTH / 26),
                            }}
                        >
                            {moment(day.date, 'YYYYMMDD').date()}
                        </Text>
                        {monthInfos.find(
                            (r) =>
                                moment(r.date).format('YYYYMMDD') === day.date
                        ) && !['first', 'last', 'single'].includes(day.type) ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 3,
                                    right: 7,
                                    width: 4,
                                    height: 4,
                                    backgroundColor: 'red',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                }}
                            />
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
                <View
                    style={{
                        ...dayStyle,
                        height: Math.floor(DEVICE_WIDTH / 10),
                        justifyContent: 'center',
                        maxHeight: 30,
                    }}
                >
                    <Text
                        style={{
                            ...textDayStyle,
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            fontSize: Math.floor(DEVICE_WIDTH / 26),
                        }}
                    >
                        {null}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
