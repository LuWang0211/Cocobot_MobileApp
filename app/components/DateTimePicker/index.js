import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Picker from "../ReactNativeWheelPicker";
const PickerItem = Picker.Item;

export default DateTimePicker = ({
    initialDate,
    onDateChange = () => {}
}) => {
    const [isDatePicked, setIsDatePicked] = useState(false);
    const [date, setDate] = useState(initialDate);
    const reportDate = useCallback((date) => {
        setDate(date);
    }, [setDate]);

    const defaultHourSelection = useMemo(() => {        
        const hours = initialDate.getHours();
        return hours % 12;
    }, []);
    const [hour, setHour] = useState(defaultHourSelection);
    const reportHour = useCallback((hour) => {
        // setIsDatePicked(true);
        setHour(hour);
    }, [setHour]);

    const defaultMinuteSelection = useMemo(() => {        
        return initialDate.getMinutes();
    }, []);
    const [minute, setMinute] = useState(defaultMinuteSelection);
    const reportMinute = useCallback((minute) => {
        setMinute(minute);
    }, [setMinute]);

    const defaultAmPmSelection = useMemo(() => {        
        return initialDate.getHours() > 11 ? 1 : 0;
    }, []);
    const [amPm, setAmPm] = useState(defaultAmPmSelection);
    const reportAmPm = useCallback((amPm) => {
        setAmPm(amPm);
    }, [setAmPm]);

    useEffect(() => {
        const newDate = new Date(date);        
        newDate.setHours(amPm == 1 ? hour + 12 : hour );
        newDate.setMinutes(minute);

        onDateChange(newDate);
    }, [date, hour, minute, amPm, isDatePicked]);

    return  <View style={styles.dateGroupContainer}>
        <DatePickerComponent initialDate={initialDate} reportDate={reportDate} reportDate={reportDate}/>
        <HourPickerComponent defaultSelection={defaultHourSelection} reportHour={reportHour} />
        <Text style={{
            height: 45,
            fontSize: 30,
            marginLeft: -5,
            marginRight: 5
        }}>:</Text>
        <MinutePickerComponent defaultSelection={defaultMinuteSelection} reportMinute={reportMinute} />
        <AmPmPickerComponent defaultSelection={defaultAmPmSelection} reportAmPm={reportAmPm} />
    </View>;
}

const GenericPickerComponent = ({
    width, intialItems, 
    reportSelection = () => {},
    defaultSelection = 0
}) => {
    const [selectedItem, setSelectedItem ] = useState(defaultSelection);
    const [itemList , setItemList ] = useState(intialItems);

    const onValueChange = useCallback((index) => {
        reportSelection(index);
        setSelectedItem(index);
    }, [setSelectedItem]);

    return <View style={{
        borderColor: 'pink',
        borderWidth: 2,
        marginRight: 10
    }}>
        <Picker style={{width: width, height: 45}}
            lineColor="#000000" //to set top and bottom line color (Without gradients)
            lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
            lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
            selectedValue={selectedItem}
            itemStyle={{color:"black", fontSize:30}}
            onValueChange={onValueChange}>
            {itemList.map(({name, value}, i) => (
                <PickerItem label={name} value={value} key={i}/>
            ))}
        </Picker>
    </View>;
}

const DatePickerComponent = ({
    reportDate, initialDate
}) => {
    const dateValues = useMemo(() => {
        const dates = [];

        const baseDate = new Date(initialDate);

        for (let i = 0; i < 7; i++) {
            const day = new Date(baseDate);
            day.setDate(baseDate.getDate() + i);

            dates.push({
                name: i == 0 ? 'Today': `${day.getMonth() + 1} - ${day.getDate()}`,
                value: i
            })
        }

        return dates
    }, []);

    const reportSelection = useCallback((index) => {
        const day = new Date(initialDate);
        day.setDate(day.getDate() + index);
        reportDate(day);
    }, [reportDate])

    return <GenericPickerComponent width={130} intialItems={dateValues} reportSelection={reportSelection}/>
}

const HourPickerComponent = (
    {
        reportHour, defaultSelection
    }
) => {
    const hourValues = useMemo(() => ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((d) => ({
        name: `${d}`,
        value: d
    }))), []);

    return <GenericPickerComponent width={50} intialItems={hourValues} defaultSelection={defaultSelection} reportSelection={reportHour} />
}

const MinutePickerComponent = ({
    reportMinute, defaultSelection
}) => {
    const minuteValues = useMemo(() => {
        const values = [];

        for (let i = 0; i <= 59; i ++) {
            values.push({
                name: `${i < 10 ? '0' + i : i}`,
                value: i
            });
        }
        return values;
    }, []);

    return <GenericPickerComponent width={70} intialItems={minuteValues} defaultSelection={defaultSelection} reportSelection={reportMinute} />
}

const AmPmPickerComponent = ({
    reportAmPm, defaultSelection
}) => {
    const AmPmValues = useMemo(() => {
        return [{
            name: 'AM',
            value: 0,
        },
        {
            name: 'PM',
            value: 1,
        }];
    }, []);

    return <GenericPickerComponent width={70} intialItems={AmPmValues} defaultSelection={defaultSelection} reportSelection={reportAmPm} />
}


const styles = StyleSheet.create({
    dateGroupContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: "space-evenly"
    }
});