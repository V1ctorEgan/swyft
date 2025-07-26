import { View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Svg, {Defs, LinearGradient as SvgGradient, Stop} from "react-native-svg";

const Monitor = () => {
  const currentSpeed = 41.6;
  const maxSpeed = 45;
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: "semi-bold", color: "white" }}>
          Speed Monitor
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "blue",
              marginRight: 6,
              borderRadius: 10,
            }}
          ></View>
          <Text style={styles.textSmall}>Real time</Text>
        </View>
       
      </View>
       <View style={{ justifyContent:"center", alignItems:"center", marginTop:32}}>
          <AnimatedCircularProgress
            size={220}
            width={15}
            fill={(currentSpeed / maxSpeed) * 100}
            tintColor="#4A6DDE"
        //     tintColor={() => (
        //     <Svg height="0" width="0">
        //       <Defs>
        //         <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        //           <Stop offset="0%" stopColor="#4A6DDE" />
        //           <Stop offset="50%" stopColor="#D2FF7D" />
        //           <Stop offset="100%" stopColor="#F82A2A" />
        //         </SvgGradient>
        //       </Defs>
        //     </Svg>
        //   )}
            backgroundColor="#4B4B4B"
            rotation={240}
            arcSweepAngle={240}
            lineCap="round"
            children={() => (
              <View style={styles.speedText}>
                <Text style={styles.speed}>{currentSpeed}</Text>
                 <Text style={styles.unit}>km/h</Text>
              </View>
            )}
            // tintColorSecondary="url(#grad)"
            tintColorSecondary="#D2FF7D"
            duration={1200}
          />
        </View>
        <View style={{flexDirection:"row", gap:122, }}>
            <Text style={styles.textSmall}>Max Speed</Text>
            <Text style={styles.textSmall}>Avg Speed</Text>
        </View>
        <View style={{flexDirection:"row", gap:122, }}>
            <Text style={styles.textSmalls}>{maxSpeed} km/h</Text>
            <Text style={[styles.textSmalls, {marginLeft:16}]}>18.2 km/h</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 25,
    marginTop: 16,
  },
  textSmall: {
    fontSize: 14,
    color: "#999999",
  },
  textSmalls: {
    fontSize: 14,
    color: "#ffffff",
  },
  speedText:{
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  speed:{
    fontSize:60,
    color:"white",
  },
  unit:{
    fontSize:18,
    color:"#999999"
  }
});
export default Monitor;
