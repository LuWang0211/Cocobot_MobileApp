import { Platform } from "react-native";

export const tabsHeader = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: Platform.OS === 'ios' ? 80 : 110,
    zIndex: 999,
    borderBottomWidth: 0,
}
