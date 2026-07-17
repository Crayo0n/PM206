import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs> 
        <Tabs.Screen name="index" options={{ title: "inicio", href:null }} />
        <Tabs.Screen name="alta" options={{ title: "Formulario",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-add" color={"red"} size={20} />
            )
        }} />
        <Tabs.Screen name="consulta" options={{ title: "Listado",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={"green"} size={20} />
            )
        }} />
        
    </Tabs>
  );
}