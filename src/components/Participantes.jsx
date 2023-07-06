import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

export function Participante({name,quantidade, posicao}){
            
    return(
        <View style={styles.container}>
                   <View style={styles.pos}>
            <Text>{posicao}</Text>

            <Text style={styles.name}>
                {name}
            </Text>
            </View>
        <Text style={styles.quantidade}>
                {`Quantidade: ${quantidade}`}        
            </Text>

            </View>
    )
}   
const styles = StyleSheet.create({
    container: {
    display:'flex',
    flexDirection:'column',
    width: 250,
    height: 40,
    marginBottom: 5,
    gap:5
    },
    name: {
        height: 20,
        textShadowColor: 'gray',
        textShadowOffset: {width: 1, height: 1},
        textShadowOpacity: 0.1,
        fontSize: 16,
        paddingLeft: 5

    },
    quantidade: {
        height:20,
        fontSize: 16,
    },
    posicao: {
        height:20,
        fontSize: 16,
        
    },
    pos:{
        display:'flex',
        flexDirection:'row',
        paddingRight:5
    }
  });
  
