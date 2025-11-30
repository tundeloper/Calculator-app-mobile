import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Keyboards from "./Keyboards";

// Theme configurations
const themes = {
  1: {
    bg: "#3a4764",
    keypadBg: "#232c43",
    screenBg: "#182034",
    numberKey: "#eae3dc",
    numberKeyShadow: "#b4a597",
    numberKeyText: "#444b5a",
    functionKey: "#647198",
    functionKeyShadow: "#404e72",
    functionKeyText: "#ffffff",
    equalsKey: "#d03f2f",
    equalsKeyShadow: "#93261a",
    equalsKeyText: "#ffffff",
    textColor: "#ffffff",
    statusBar: "light" as const,
  },
  2: {
    bg: "#e6e6e6",
    keypadBg: "#d1cccc",
    screenBg: "#ededed",
    numberKey: "#e5e4e1",
    numberKeyShadow: "#a69d91",
    numberKeyText: "#35352c",
    functionKey: "#378187",
    functionKeyShadow: "#1b6066",
    functionKeyText: "#ffffff",
    equalsKey: "#ca5502",
    equalsKeyShadow: "#893901",
    equalsKeyText: "#ffffff",
    textColor: "#35352c",
    statusBar: "dark" as const,
  },
  3: {
    bg: "#160628",
    keypadBg: "#1d0934",
    screenBg: "#1d0934",
    numberKey: "#341c4f",
    numberKeyShadow: "#871c9c",
    numberKeyText: "#ffe53d",
    functionKey: "#58077d",
    functionKeyShadow: "#bc15f4",
    functionKeyText: "#ffffff",
    equalsKey: "#00e0d1",
    equalsKeyShadow: "#6cf9f2",
    equalsKeyText: "#1b2428",
    textColor: "#ffe53d",
    statusBar: "light" as const,
  },
};

export type Theme = (typeof themes)[keyof typeof themes];

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [theme, setTheme] = useState<1 | 2 | 3>(1);

  const formatNumber = (numStr: string): string => {
    if (numStr === "Error" || numStr === "Can't divide by 0") return numStr;
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;

    const parts = numStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const formattedInteger = parseInt(integerPart).toLocaleString("en-US");

    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart}`;
    }
    return formattedInteger;
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const deleteLastChar = () => {
    if (display.length === 1 || display === "Error" || display === "Can't divide by 0") {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const executeOperation = (
    currentValue: number,
    inputValue: number,
    op: string
  ): { result: number; error: boolean } => {
    switch (op) {
      case "+":
        return { result: currentValue + inputValue, error: false };
      case "-":
        return { result: currentValue - inputValue, error: false };
      case "*":
        return { result: currentValue * inputValue, error: false };
      case "/":
        if (inputValue === 0) {
          return { result: 0, error: true };
        }
        return { result: currentValue / inputValue, error: false };
      default:
        return { result: inputValue, error: false };
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operator) {
      const currentValue = parseFloat(previousValue);
      const { result, error } = executeOperation(
        currentValue,
        inputValue,
        operator
      );

      if (error) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(result));
      setPreviousValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    const { result, error } = executeOperation(
      currentValue,
      inputValue,
      operator
    );

    if (error) {
      setDisplay("Can't divide by 0");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const currentTheme = themes[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <StatusBar style={currentTheme.statusBar} />
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.textColor }]}>calc</Text>
          <View style={styles.themeSelector}>
            <Text style={[styles.themeLabel, { color: currentTheme.textColor }]}>THEME</Text>
            <View style={styles.themeToggleContainer}>
              <View style={styles.themeNumbers}>
                <Text style={[styles.themeNumber, { color: currentTheme.textColor }]}>1</Text>
                <Text style={[styles.themeNumber, { color: currentTheme.textColor }]}>2</Text>
                <Text style={[styles.themeNumber, { color: currentTheme.textColor }]}>3</Text>
              </View>
              <View style={[styles.themeToggle, { backgroundColor: currentTheme.keypadBg }]}>
                {([1, 2, 3] as const).map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setTheme(t)}
                    style={[
                      styles.themeButton,
                      theme === t && { backgroundColor: currentTheme.equalsKey },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Display */}
        <View style={[styles.display, { backgroundColor: currentTheme.screenBg }]}>
          <Text
            style={[styles.displayText, { color: currentTheme.textColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatNumber(display)}
          </Text>
        </View>

        {/* Keypad */}
        <Keyboards
          currentTheme={currentTheme}
          inputDigit={inputDigit}
          deleteLastChar={deleteLastChar}
          performOperation={performOperation}
          inputDecimal={inputDecimal}
          clear={clear}
          calculate={calculate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 24,
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  themeSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  themeToggleContainer: {
    alignItems: "center",
  },
  themeNumbers: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 4,
  },
  themeNumber: {
    fontSize: 12,
    fontWeight: "500",
  },
  themeToggle: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 4,
    gap: 4,
  },
  themeButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  display: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    minHeight: 100,
  },
  displayText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
