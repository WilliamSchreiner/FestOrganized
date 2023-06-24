import { View, Text, StyleSheet,TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Participante } from '../components/Participantes';
import React,{ useState } from 'react';
import {data} from './data';
import { SelectList } from 'react-native-dropdown-select-list';


export function Home() {
    const [participantes, setParticipantes] = useState([]);
    const [selected, setSelected] = React.useState("");
    const [carteira, setCarteira] = useState(0);


    function handleParicipantAdd(produto) {
        if (participantes.includes(produto)){
        Alert.alert(`${produto} já existe`);
        console.log(`${produto} já existe`);
        }else if (produto === ""){
            Alert.alert(`Write a produto.`);
            console.log(`Write a produto.`);
        }else {
        console.log(`add ${produto}`);
        setParticipantes((prevState)=> [...prevState, produto]);
        setCarteira(carteira + data.produto.valor)
        };
    }

    function handleParicipantDelete(produto) {
        Alert.alert("Remover", `You want remove ${produto}?`,[
            {
                text:'sim',
                onPress: ()=> {
                    setParticipantes(prevState => (
                        prevState.filter(produtoName => produtoName !== produto)
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
            <Text style={styles.subTitle}> Sexta, 2 de junho</Text>
            </View>

{/*link document dropBox https://www.npmjs.com/package/react-native-dropdown-select-list */ }
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
  