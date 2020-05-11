import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import Day from './Day';

export default class DayRow extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.days) == JSON.stringify(this.props.days))
            return false;

        return true;
    }

    render() {
        return (
            <View
                style={{ marginBottom: 7, marginTop: 7, flexDirection: 'row' }}
            >
                {this.props.days.map((day, i) => (
                    <Day
                        key={i}
                        dayProps={this.props.dayProps}
                        onSelectDate={this.props.onSelectDate}
                        day={day}
                        monthInfos={this.props.monthInfos}
                    />
                ))}
            </View>
        );
    }
}
