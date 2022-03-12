import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "../../themes/theme";
const month = 2592000000;
const day = 86400000;
const hour = 3600000;
const min = 60000;
const sec = 1000;

interface ITask {
  task: {
    message: string;
    date: Date;
  };
}

const getTime = (totalTime: number) => {
  const time = {
    msec: 0,
    sec: 0,
    min: 0,
    hour: 0,
    day: 0,
    month: 0,
  };
  if (totalTime > month) {
    time.month = Math.floor(totalTime / month);
    totalTime = totalTime % month;
  }
  if (totalTime > day) {
    time.day = Math.floor(totalTime / day);
    totalTime = totalTime % day;
  }
  if (totalTime > hour) {
    time.hour = Math.floor(totalTime / hour);
    totalTime = totalTime % hour;
  }
  if (totalTime > min) {
    time.min = Math.floor(totalTime / min);
    totalTime = totalTime % min;
  }
  if (totalTime > sec) {
    time.sec = Math.floor(totalTime / sec);
    totalTime = totalTime % sec;
  }
  return time;
};

const Task: React.FC<ITask> = ({ task }) => {
  const timeUntil = task.date.getTime() - new Date().getTime();
  if (timeUntil < 0) return null;
  const time = getTime(timeUntil);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task.message}</Text>
      <Text style={styles.text}>{time.day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: palette.second,
    margin: 25,
    height: 30,
    color: "white",
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});

export default Task;
