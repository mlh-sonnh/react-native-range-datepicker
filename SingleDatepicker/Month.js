import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import moment from 'moment';
import DayRow from './DayRow';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Month extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.minDate != this.props.minDate) return true;

        if (nextProps.maxDate != this.props.maxDate) return true;

        if (nextProps.availableDates != this.props.availableDates) return true;

        if (nextProps.selectedDate != this.props.selectedDate) return true;

        return false;
    }

    getDayStack(month) {
        const res = [];
        const currMonth = moment(month).month(); // get this month
        const currDate = moment(month).startOf('month'); // get first day in this month

        let dayColumn = [];
        const dayRow = [];
        let dayObject = {};
        const { availableDates, minDate, maxDate, selectedDate } = this.props;

        do {
            dayColumn = [];
            for (let i = 0; i < 7; i++) {
                dayObject = {
                    type: null,
                    date: null,
                };
                if (i == currDate.days() && currDate.month() == currMonth) {
                    if (
                        minDate &&
                        minDate.format('YYYYMMDD') &&
                        currDate.format('YYYYMMDD') < minDate.format('YYYYMMDD')
                    ) {
                        dayObject.type = 'disabled';
                    }
                    if (
                        maxDate &&
                        maxDate.format('YYYYMMDD') &&
                        currDate.format('YYYYMMDD') > maxDate.format('YYYYMMDD')
                    ) {
                        dayObject.type = 'disabled';
                    }
                    if (
                        availableDates &&
                        availableDates.indexOf(currDate.format('YYYYMMDD')) ==
                            -1
                    ) {
                        dayObject.type = 'blockout';
                    }
                    if (
                        selectedDate &&
                        selectedDate.format('YYYYMMDD') ===
                            currDate.format('YYYYMMDD')
                    ) {
                        dayObject.type = 'selected';
                    }

                    dayObject.date = currDate.clone().format('YYYYMMDD');
                    dayColumn.push(dayObject);
                    currDate.add(1, 'day');
                } else {
                    dayColumn.push(dayObject);
                }
            }

            dayRow.push(dayColumn);
        } while (currDate.month() == currMonth);

        return dayRow;
    }

    render() {
        const { month, dayProps, specialDays } = this.props;
        const dayStack = this.getDayStack(moment(month, 'YYYYMM'));
        const monthInfos = specialDays.filter(
            (r) => moment(r.date).format('YYYYMM') === month
        );
        return (
            <View style={{ paddingHorizontal: 5, backgroundColor: '#f4f4f4' }}>
                <Text
                    style={{
                        fontSize: 14,
                        padding: 14,
                        alignSelf: 'center',
                        fontWeight: '600',
                    }}
                >
                    {moment(month, 'YYYYMM').format('MMMM YYYY')}
                </Text>
                <View>
                    {dayStack.map((days, i) => (
                        <DayRow
                            days={days}
                            dayProps={dayProps}
                            key={i}
                            onSelectDate={this.props.onSelectDate}
                            monthInfos={monthInfos}
                        />
                    ))}
                </View>
                {monthInfos.length > 0 && (
                    <View
                        style={{
                            marginHorizontal: Math.floor(DEVICE_WIDTH / 21),
                            marginBottom: 14,
                            marginTop: 7,
                        }}
                    >
                        {monthInfos.map((r, i) => (
                            <View
                                key={i}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: dayProps.selectedBackgroundColor,
                                    }}
                                >
                                    {'\u2022'}
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        paddingLeft: 5,
                                        fontSize: 12,
                                        textAlignVertical: 'center',
                                    }}
                                >
                                    {r.title}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
                <View
                    style={{
                        marginHorizontal: Math.floor(DEVICE_WIDTH / 23),
                        borderBottomColor: '#E5E5E5',
                        borderBottomWidth: 1,
                    }}
                />
            </View>
        );
    }
}
