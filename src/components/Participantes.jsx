import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

export function Participante({name,quantidade}){
            
    return(
        <View style={styles.container}>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={styles.quantidade}>
                {`Quantidade: ${quantidade}`}
            </Text>
            </View>
    )
}   
const styles = StyleSheet.create({
    container: {
width: 200,
height: 40,
marginBottom: 5
    },
    name: {
        height: 20,
        textShadowColor: 'gray',
        textShadowOffset: {width: 1, height: 1},
        textShadowOpacity: 0.1,
        fontSize: 16,

    },
    quantidade: {
        height:20,
        fontSize: 16,
    }
  });
  
