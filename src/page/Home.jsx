import { View, Text, StyleSheet,TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
// a diferença entre faltlist e scrollview é a renderização, flatlist é mais benefico em questao de requerimento de renderização.
import { StatusBar } from 'expo-status-bar';
import { Participante } from '../components/Participantes';
import React,{ useState } from 'react';
import {data} from './data';
import { SelectList } from 'react-native-dropdown-select-list';


export function Home() {
    const [participantes, setParticipantes] = useState([]);
    const [selected, setSelected] = React.useState("");
    const [carteira, setCarteira] = useState(0);


    function handleParicipantAdd(name) {
        if (participantes.includes(name)){
        Alert.alert(`${name} já existe`);
        console.log(`${name} já existe`);
        }else if (name === ""){
            Alert.alert(`Write a name.`);
            console.log(`Write a name.`);
        }else {
        console.log(`add ${name}`);
        setParticipantes((prevState)=> [...prevState, name]);
        };
    }

    function handleParicipantDelete(name) {
        Alert.alert("Remover", `You want remove ${name}?`,[
            {
                text:'sim',
                onPress: ()=> {
                    setParticipantes(prevState => (
                        prevState.filter(participantName => participantName !== name)
                    ))
                }       
            },
            {
                text:'não',
                onPress: ()=>Alert.alert('ok, canceled.')
            }
        ])
        
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto'/>
            
            <View  style={styles.header}>
            <Text style={styles.title}> Nome do Evento</Text>
            <Text style={styles.subTitle}> sexta-fereira, 23 de junho</Text>
            </View>


            <View style={styles.boxDrop}>
                <SelectList 
               setSelected={setSelected} 
               data={data}  
                />
                
                <TouchableOpacity 
                style={styles.button} 
                onPress={()=>handleParicipantAdd(selected)}>
                <Text  style={styles.buttonText}> + </Text>
            </TouchableOpacity>

            </View>

            <View style={styles.boxValor}>
                <Text>{carteira}</Text>
            </View>
            

            <View>
                
                  <FlatList
                  data={participantes}
                  keyExtractor={(item)=> item}
                  renderItem={({item})=> (
            <Participante key={item} 
            name={item} 
            participantRemove={()=>handleParicipantDelete(item)} />
            )}
                  ListFooterComponent={()=>{
                    <Text>
                        adicione algum participante. 
                    </Text>
                  }}
                   />
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%'
    },
    header: {
        marginLeft: 10,
        width: '100%'
      },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 48,
    
    },
    subTitle: {
        color: 'gray',
        textShadowColor: '#fff',
        fontSize: 16,
        marginTop: 2,
        marginLeft: 18
    },
    boxInput: {
        marginTop: 36,
        marginBottom: 42,
        width: '100%',
        flexDirection: 'row'
    },
    input: {
        color: '#fff',
        height: 56,
        backgroundColor: '#1f1e25',
        fontSize: 16,
        marginTop: 2,
        marginLeft: 18,
        padding: 16,

    },
    button:{
        width:56,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#31cf67',
        justifyContent: 'center',
        shadowColor: '#31B345',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 0.8

    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
        marginLeft: 14
    },
    dropDown: {
        fontSize: 10,
        color: '#fff'
    }
  });
  