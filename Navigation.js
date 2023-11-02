import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./screens/tabScreens/Feed";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Notifications from "./screens/tabScreens/Notifications";
import TweetDetailsScreen from "./screens/HomeStack/TweetDetailsScreen";
import Payments from "./screens/drawerScreens/Payments";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable } from "react-native";

//TopTabs
const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup({navigation}) {

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "blue",
        },
      }}
    >
      <TopTabs.Screen name="main" component={Feed} />
      <TopTabs.Screen name="Following" component={Payments} />
      <TopTabs.Screen name="eye" component={Payments} />
    </TopTabs.Navigator>
  );
}

// Stack
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TweetDetailsScreen"
        component={TweetDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
}

//Tab Bottom
const Tab = createBottomTabNavigator();

function TabGroup({navigation}) {
  return (
    <Tab.Navigator
      screebOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "ios-notifications" : "notifications-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
          // <Entypo name="home" size={24} color="black" />
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={TopTabsGroup}
        options={{tabBarLabel: "@makikoy",
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              source={require("./assets/beto.jpeg")}
              style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
            />
          </Pressable>
        ),
      }}
      />
      {/* <Tab.Screen name='Settings' component={Settings} />  */}
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

//Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Feed" component={HomeStackGroup} />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style='auto'/>
      <DrawerGroup />
      {/* <HomeStackGroup /> */}
    </NavigationContainer>
  );
}
