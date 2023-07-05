import { View, Text, StyleSheet,TextInput, TouchableOpacity, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Participante } from '../components/Participantes';
import React,{ useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';


export function Home() {
    
    const data = [
    { label: 'Item 1- R$: 5',valor: 5, value: '1' },
    { label: 'Item 2- R$: 5',valor: 5, value: '2' },
    { label: 'Item 3- R$: 5',valor: 5, value: '3' },
    { label: 'Item 4- R$: 5',valor: 5, value: '4' },
    { label: 'Item 5- R$: 5',valor: 5, value: '5' },
    { label: 'Item 6- R$: 5',valor: 5, value: '6' },
    { label: 'Item 7- R$: 5',valor: 5, value: '7' },
    { label: 'Item 8- R$: 5',valor: 5, value: '8' },
  ];

    const [itens, setItens] = useState([]);
    const [value, setValue] = useState("");
    const [quantid, setQuantid] = useState(1);
    const [carteira, setCarteira] = useState(0);


    function handleParicipantAdd(produtoId) {
        if (produtoId === ""){
            Alert.alert(`Escolha um produto.`);
            console.log(`Escolha um produto.`);
        }else {
        data.map((item) => { if(item.value === produtoId){
            itens.push({
                id: Math.random().toString(36),
                label: item.label,
                valor: item.valor,
                quantidade: quantid,
                
            })
            setCarteira(carteira + (item.valor*quantid));
        }});
        console.log(itens);
        };
    }

    function handleParicipantDelete(produtoId) {
// encontrar valor e setar carteira
   let itemTemp = itens.find(item => item.id === produtoId);
   console.log(`${itemTemp.label} foi deletado e o valor de ${itemTemp.valor*itemTemp.quantidade} foram descontados de sua carteira.`);
   setCarteira(carteira - (itemTemp.valor*itemTemp.quantidade));
//deletar item
   let itensTemp = itens.filter(item => item.id !== produtoId);
   setItens(itensTemp);
    
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto'/>       
            <View  style={styles.header}>
            <Text style={styles.title}> Nome do Evento</Text>
            <Text style={styles.subTitle}> sexta-fereira, 23 de junho</Text>
            </View>

{/* Campo dos inputs */}
    <View style={styles.boxDrop}>
    {/*link document dropBox https://www.npmjs.com/package/react-native-element-dropdown */ }
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecione seu produto"
        searchPlaceholder="Buscando..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
    />
    {/* input quantidade de produto */}
    <TextInput 
            style={styles.inputQuantid}
            placeholder='n°'
            type={Number}
            placeholderTextColor={'#fff'}
            value={quantid}
            onChangeText={setQuantid}         
    />
    {/* button submit */}      
    <TouchableOpacity 
        style={styles.button} 
        onPress={()=>handleParicipantAdd(value)}>
            <Text  style={styles.buttonText}> + </Text>
    </TouchableOpacity>
    </View>
{/* Campo do  valor da carteira */}
    <View style={styles.boxValor}>
        <Text>{`Saldo: ${carteira}`}</Text>
    </View>
    <View>
                
        {itens.map((item, index) => (
            <View style={styles.boxParticipant} key={index}>
            <Participante  
            name={item.label} 
            quantidade={item.quantidade}
            />
            <TouchableOpacity 
            style={styles.buttonDelete} 
            onPress={()=>{handleParicipantDelete(item.id)}}>
                <Text  style={styles.buttonDeleteText}> - </Text>
            </TouchableOpacity>
        </View>
    ))}
               
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
    inputQuantid: {
        height: 50,
        fontSize: 16,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        width: 50,
        textAlign: 'center',
        textAlignVertical: "center"

    },
    button:{
        width:50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#31cf67',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    dropdown: {
        margin: 16,
        height: 50,
        width:200,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      boxParticipant: {
        marginBottom: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        height: 55,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,

        borderRadius: 5,
        borderColor: '#727070',
        borderWidth: 0.5,

        shadowColor: '#504e4e',
        shadowOffset: {width: 4, height: 5},
        shadowOpacity: 0.2,
      },
      buttonDelete:{
        width:50,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    buttonDeleteText: {
        fontSize: 24,
        color: '#fff',
    },
  });
  