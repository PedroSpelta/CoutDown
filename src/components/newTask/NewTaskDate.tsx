import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { ICNewTaskDate } from "../../types/tasks";
import { palette } from "../../themes/theme";
import { getDaysUntil, getFutureDate } from "../../lib/time";

const NewTaskDate: React.FC<ICNewTaskDate> = ({
  date,
  setDate,
  showDate,
  setShowDate,
}) => {
  const [days, setDays] = useState<string>("0");
  const formattedDate = moment(date).locale("pt").format("DD/MM/YYYY");

  const handleDatePick = (evt: any, selectedDate: any) => {
    if (evt.type === "dismissed") return setShowDate(false);
    console.log(evt.type, selectedDate);
    setDate(selectedDate);
    setDays(getDaysUntil(selectedDate).toString());
    return setShowDate(false);
  };

  const handleDateInput = (text:string) => {
    const number = Number(text).toString();
    setDate(getFutureDate(number))
    setDays(number.replace(/[^0-9]/g, ""));
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.input}>{formattedDate}</Text> */}
      <TextInput
        keyboardType="number-pad"
        style={styles.pressable}
        value={days}
        onChangeText={handleDateInput}
      />
      <Pressable style={styles.pressable} onPress={() => setShowDate(true)}>
        <Text style={styles.input}>{formattedDate}</Text>
      </Pressable>
      {showDate && (
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          onChange={handleDatePick}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    margin: 10,
    backgroundColor: palette.second,
    padding: 5,
    borderRadius: 5,
    fontSize: 23,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 23,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewTaskDate;
