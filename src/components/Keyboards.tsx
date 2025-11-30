import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Theme } from "./Calculator";

interface KeyboardsProps {
  currentTheme: Theme;
  inputDigit: (digit: string) => void;
  deleteLastChar: () => void;
  performOperation: (operator: string) => void;
  inputDecimal: () => void;
  clear: () => void;
  calculate: () => void;
}

export default function Keyboards({
  currentTheme,
  inputDigit,
  deleteLastChar,
  performOperation,
  inputDecimal,
  clear,
  calculate,
}: KeyboardsProps) {
  const NumberButton = ({
    label,
    onPress,
  }: {
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: currentTheme.numberKey,
          shadowColor: currentTheme.numberKeyShadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: currentTheme.numberKeyText }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const FunctionButton = ({
    label,
    onPress,
    span2 = false,
  }: {
    label: string;
    onPress: () => void;
    span2?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        span2 && styles.span2,
        {
          backgroundColor: currentTheme.functionKey,
          shadowColor: currentTheme.functionKeyShadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.functionButtonText, { color: currentTheme.functionKeyText }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const EqualsButton = ({
    label,
    onPress,
  }: {
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        styles.span2,
        {
          backgroundColor: currentTheme.equalsKey,
          shadowColor: currentTheme.equalsKeyShadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.functionButtonText, { color: currentTheme.equalsKeyText }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.keypad, { backgroundColor: currentTheme.keypadBg }]}>
      {/* Row 1 */}
      <View style={styles.row}>
        <NumberButton label="7" onPress={() => inputDigit("7")} />
        <NumberButton label="8" onPress={() => inputDigit("8")} />
        <NumberButton label="9" onPress={() => inputDigit("9")} />
        <FunctionButton label="DEL" onPress={deleteLastChar} />
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <NumberButton label="4" onPress={() => inputDigit("4")} />
        <NumberButton label="5" onPress={() => inputDigit("5")} />
        <NumberButton label="6" onPress={() => inputDigit("6")} />
        <NumberButton label="+" onPress={() => performOperation("+")} />
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <NumberButton label="1" onPress={() => inputDigit("1")} />
        <NumberButton label="2" onPress={() => inputDigit("2")} />
        <NumberButton label="3" onPress={() => inputDigit("3")} />
        <NumberButton label="-" onPress={() => performOperation("-")} />
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <NumberButton label="." onPress={inputDecimal} />
        <NumberButton label="0" onPress={() => inputDigit("0")} />
        <NumberButton label="/" onPress={() => performOperation("/")} />
        <NumberButton label="x" onPress={() => performOperation("*")} />
      </View>

      {/* Row 5 */}
      <View style={styles.row}>
        <FunctionButton label="RESET" onPress={clear} span2 />
        <EqualsButton label="=" onPress={calculate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    padding: 24,
    borderRadius: 12,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  span2: {
    flex: 2,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  functionButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
