import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%"

    },
	image_: {
		width: '100%',
		height: '100%',
		flex: 1
	},
    title: {
        fontSize:40,
        textAlign:'center',
        fontWeight:'bold',
        alignSelf:"center",
        marginBottom:10,
        color:'white',
        textShadowColor: 'rgba(0.5, 0.5, 0.5, 0.75)',
		textShadowOffset: {width: -2, height: 2},
		textShadowRadius: 10,

    },

    subTitle: {
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        alignSelf:"center",
        marginBottom:5,
        color:'white',
        textShadowColor: 'rgba(0.5, 0.5, 0.5, 0.75)',
		textShadowOffset: {width: -2, height: 2},
		textShadowRadius: 10
    },

    fromX: {
		marginTop:120,
        width:"80%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'rgba(0,0,0,0.8)',
        padding:20,
        borderRadius:10,
    },
    input: {
        marginBottom:0 ,
        padding:0
    },
    login: {
        width: "100%"
    },
    icon:{
        marginRight:10,
        width:20
    }
})
