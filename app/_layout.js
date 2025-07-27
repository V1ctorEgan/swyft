import { Slot } from "expo-router";
import AuthProvider from "./AuthContext";

export default () =>{
    return (
<AuthProvider>
    
    <Slot />
</AuthProvider>
    )
}