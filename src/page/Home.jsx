import { View, Text, StyleSheet,TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Participante } from '../components/Participantes';
import React,{ useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';


export function Home() {
    
    const data = [
    { label: 'Pipoca P R$: 3',valor: 3, value: '1', backgroundColor:'ffac00' },
    { label: 'Pipoca M R$: 6',valor: 6, value: '2' },
    { label: 'Pipoca G R$: 9',valor: 9, value: '3' },
    { label: 'Pé-de-Moleque R$: 4',valor: 4, value: '4' },
    { label: 'Quentão  R$: 7',valor: 7, value: '5' },
    { label: 'Cachorro-Quente R$: 6',valor: 6, value: '6' },
    { label: 'Rapadura R$: 2',valor: 2, value: '7' },
    { label: 'Bolo R$: 5',valor: 5, value: '8' },
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
                value: item.value
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
            <Text style={styles.title}> Festa Julina</Text>
            <Text style={styles.subTitle}> quarta-feira, 05 de Julho</Text>
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
        containerStyle={styles.containerDropdown}
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
            <Text  style={styles.buttonText}> ➕ </Text>
    </TouchableOpacity>
    </View>
{/* Campo do  valor da carteira */}
    <View style={styles.boxSaldo}>
        <Text style={styles.boxValor}>{`Saldo: $${carteira}`}</Text>
    </View>
    <View>      
        {itens.map((item, index) => (
            <View 
            style={styles.boxParticipant} key={index}>
            <Participante  
            name={item.label} 
            posicao={index + 1}
            quantidade={item.quantidade}
            />
            <TouchableOpacity 
            style={styles.buttonDelete} 
            onPress={()=>{handleParicipantDelete(item.id)}}>
                <Text  style={styles.buttonDeleteText}> ❌ </Text>
            </TouchableOpacity>
        </View>
    ))}
             
    </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height:'100%',
        backgroundColor:'#ecebeb',
        color:'#000',
    },
    header: {
        width: '100%',
        color:'#000',
        backgroundColor:'#2d77d1',
        borderBottomEndRadius:50,
        paddingBottom:15,
        height:150
      },
    title: {
        justifyContent:'center',
        fontSize: 46,
        fontWeight: 'bold',
        marginTop: 24,
        color:'#000',
    
    },
    subTitle: {
        color: '#000',
        fontSize: 16,
        marginTop: 2,
        marginLeft: 18,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    boxInput: {
        marginTop: 36,
        marginBottom: 42,
        width: '100%',
        flexDirection: 'row',

    },
    inputQuantid: {
        height: 50,
        fontSize: 16,
        borderRadius: 5,
        borderColor: '#31cf67',
        borderWidth: 0.5,
        width: 50,
        textAlign: 'center',
        textAlignVertical: "center",
        marginTop:15,
        borderRadius:50,
        marginRight:5,
        marginLeft:-10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 5,

    },
    button:{
        width:50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#85c226',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        marginTop:15,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 5,
    },
    buttonText: {
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontSize: 24,
        color: '#000',
        marginTop:'0.3em',
        tintColor:'#85c226'
    },
    dropdown: {
        margin: 16,
        height: 50,
        width:200,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        color:'#000',
        display:'flex',
        flex:1,
        padding:5,
        borderRadius:5,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 5,
        borderWidth:1,
        borderColor:'#31cf67' 
      },
      placeholderStyle: {
        fontSize: 16,
        color:'#000',

      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#000'

      },
      iconStyle: {
        width: 20,
        height: 20,
        color:'#000'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:'#000'
      },
      boxParticipant: {
        display:'flex',
        marginBottom: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        height: 55,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,

        borderRadius: 5,
        borderColor: '#b8b6b6',
        borderWidth: 0.5,

        shadowColor: '#d4d2d2',
        shadowOffset: {width: 4, height: 5},
        shadowOpacity: 0.2,
        color:'#000',
        backgroundColor:'#fff',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 5,
      },
      buttonDelete:{
        width:52,
        height: 52,
        borderRadius: 5,
        backgroundColor: '#da251c',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        marginRight:'-1.15em'
    },
    buttonDeleteText: {
        fontSize: 24,
        color: '#000',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'0.25em'
    },
    containerDropdown: {
        backgroundColor:'#d3d3d3'
    },
    boxDrop:{
        display:'flex',
        flexDirection:'row'
    },
    boxValor:{
        fontSize:25,
        color:'#000'
    },
    boxSaldo:{
        borderWidth:1,
        borderColor:'#85c226',
        padding:5,
        borderRadius:25,
        width:'fit-content',
        backgroundColor:'#b3e75e',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom:15
    },
})
  

//Colors: #dd127b , #85c226, #fff500, #da251c, #09458d, #e67817  