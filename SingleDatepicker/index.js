import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import Month from './Month';
// import styles from './styles';

export default class RangeDatepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate:
                props.selectedDate && moment(props.selectedDate, 'YYYYMMDD'),
            availableDates: props.availableDates || null,
        };

        this.onSelectDate = this.onSelectDate.bind(this);
        this.handleRenderRow = this.handleRenderRow.bind(this);
    }

    static defaultProps = {
        initialMonth: '',
        dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        maxMonth: 12,
        showClose: true,
        onClose: () => {},
        onSelect: () => {},
        selectedBackgroundColor: 'green',
        selectedTextColor: 'white',
        todayColor: 'green',
        minDate: '',
        maxDate: '',
        infoText: '',
        infoStyle: { color: '#fff', fontSize: 13 },
        infoContainerStyle: {
            marginRight: 20,
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: 'green',
            borderRadius: 20,
            alignSelf: 'flex-end',
        },
        specialDays: [],
        selectedDate: {},
    };

    static propTypes = {
        initialMonth: PropTypes.string,
        dayHeadings: PropTypes.arrayOf(PropTypes.string),
        availableDates: PropTypes.arrayOf(PropTypes.string),
        maxMonth: PropTypes.number,
        minDate: PropTypes.string,
        maxDate: PropTypes.string,
        showClose: PropTypes.bool,
        onClose: PropTypes.func,
        onSelect: PropTypes.func,
        selectedBackgroundColor: PropTypes.string,
        selectedTextColor: PropTypes.string,
        todayColor: PropTypes.string,
        infoText: PropTypes.string,
        infoStyle: PropTypes.object,
        infoContainerStyle: PropTypes.object,
        specialDays: PropTypes.array,
        selectedDate: PropTypes.object,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ availableDates: nextProps.availableDates });
    }

    onSelectDate(date) {
        this.setState({ selectedDate: date });
        this.props.onSelect(date);
        this.props.onClose();
    }

    getMonthStack() {
        const res = [];
        const { maxMonth, initialMonth } = this.props;
        let initMonth = moment();
        if (initialMonth && initialMonth != '') {
            initMonth = moment(initialMonth, 'YYYYMM');
        }

        for (let i = 0; i < maxMonth; i++) {
            res.push(initMonth.clone().add(i, 'month').format('YYYYMM'));
        }

        return res;
    }

    handleRenderRow(month, index) {
        const {
            selectedBackgroundColor,
            selectedTextColor,
            todayColor,
            ignoreMinDate,
            minDate,
            maxDate,
            specialDays,
        } = this.props;
        let { availableDates, selectedDate } = this.state;

        if (availableDates && availableDates.length > 0) {
            availableDates = availableDates.filter((d) => {
                if (d.indexOf(month) >= 0) return true;
            });
        }

        return (
            <Month
                onSelectDate={this.onSelectDate}
                selectedDate={selectedDate}
                availableDates={availableDates}
                minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
                maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
                ignoreMinDate={ignoreMinDate}
                dayProps={{
                    selectedBackgroundColor,
                    selectedTextColor,
                    todayColor,
                }}
                month={month}
                specialDays={specialDays}
            />
        );
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    zIndex: 1000,
                    alignSelf: 'center',
                }}
            >
                {this.props.showClose ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 20,
                            paddingBottom: 10,
                        }}
                    >
                        {this.props.showClose && (
                            <Text
                                style={{ fontSize: 20 }}
                                onPress={this.props.onClose}
                            >
                                Close
                            </Text>
                        )}
                    </View>
                ) : null}
                {this.props.infoText != '' && (
                    <View style={this.props.infoContainerStyle}>
                        <Text style={this.props.infoStyle}>
                            {this.props.infoText}
                        </Text>
                    </View>
                )}
                <View style={styles.dayHeader}>
                    {this.props.dayHeadings.map((day, i) => (
                        <Text
                            style={
                                i === 0 || i === 6
                                    ? {
                                          width: '14.28%',
                                          textAlign: 'center',
                                          color: this.props
                                              .selectedBackgroundColor,
                                      }
                                    : { width: '14.28%', textAlign: 'center' }
                            }
                            key={i}
                        >
                            {day}
                        </Text>
                    ))}
                </View>
                <FlatList
                    data={this.getMonthStack()}
                    renderItem={({ item, index }) =>
                        this.handleRenderRow(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dayHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    buttonWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
        alignItems: 'stretch',
    },
});
