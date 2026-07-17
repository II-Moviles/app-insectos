import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <StackNavigator />
    </>
  );
}