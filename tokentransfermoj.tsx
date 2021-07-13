import { data, nodeInteraction } from '@waves/waves-transactions';
import React,{useState, useEffect} from 'react'
import { Button , Alert, Form} from 'react-bootstrap';
import Header from './Header'



function Tokentransfer() {
    const [amount,setAmount] = useState(0)
    const [adres,setAdres] = useState("")
    const [attachment, setAtt] = useState("")
    const [fee, setFee] = useState(0)
    const [assetId, setId] = useState("")
    const [show, setShow] = useState(0)

    function alert(){

        if(show==1){
            return(
                <Alert variant="danger" onClose={() => setShow(0)} dismissible>
                <Alert.Heading>Puste pole!</Alert.Heading>
                <p>
                    Nie zostawiaj pól pustych.
                </p>
              </Alert>
            )
        }
        else if(show==2){
            return(
                <Alert variant="danger" onClose={() => setShow(0)} dismissible>
                <Alert.Heading>Niepoprawnie wpisana kwota!</Alert.Heading>
                <p>
                    Nie wpisuj znakow specjalnych badz liter.
                </p>
              </Alert>
            )
        }
        else if(show==3){
            return(
                <Alert variant="danger" onClose={() => setShow(0)} dismissible>
                <Alert.Heading>Niepoprawny adres odbiorcy!</Alert.Heading>
                <p>
                    Upewnij się, ze wpisujesz poprawny adres.
                </p>
              </Alert>
            )
        }
    }
    //const [url, setUrl] = useState('')

    async function fetchTES(){
    
        window.WavesKeeper.publicState()
            .then(state => {
                TEST()
                //console.log(state); //Wypisanie w konsoli 
                //console.log(state.account?.balance); //Wypisanie w konsoli 
            }).catch(error => {
                console.error(error); // ERROR
            })
            
            console.log('test')
            
            //https://nodes-testnet.wavesnodes.com/assets/balance/3My2QNcLCqvFwFfK4vXnp17h3xSBvaAXsfP
            async function TEST() {
                if(adres=='') return console.log('Invalid address Id')
                else{
                    const response = await fetch('https://nodes-testnet.wavesnodes.com/assets/balance/'+adres)
                const data = await response.json()
                return console.log(data); 
                }
            }  
    }

    
    function foo() {
        {window.WavesKeeper.signAndPublishTransaction({
            type: 4,
            data: {
                amount: {tokens:amount,assetId:assetId}, //POBIERANIE Z LISTY KTÓRĄ TRZEBA ZROBIĆ
                fee: {tokens: fee,assetId:assetId},
                recipient: adres
            }
        }).then((tx) => {
            console.log("Udało się wysłać WAVES");
       }).catch((error) => {
            console.error("Coś poszło nie tak", error);
       }); }
    }

// export default function Tokentransfer() {
//     const [amount,setAmount] = useState(0)
//     const [adres,setAdres] = useState("")
//     const [attachment, setAtt] = useState("")
//     const [fee, setFee] = useState(0)
//     const [assetId, setId] = useState("")
    
//     function foo() {
//         {window.WavesKeeper.signAndPublishTransaction({
//             type: 4,
//             data: {
//                 amount: {tokens:amount,assetId:assetId}, //POBIERANIE Z LISTY KTÓRĄ TRZEBA ZROBIĆ
//                 fee: {tokens: fee,assetId:assetId},
//                 recipient: adres
//             }
//         }).then((tx) => {
//             console.log("Udało się wysłać WAVES");
//        }).catch((error) => {
//             console.error("Coś poszło nie tak", error);
//        }); }
//     }
    
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div></div>
            <div style={styles.body}>
            

            <Form>
                <Form.Group className="mb-3" controlId="text">
                    <Form.Label>ADDRESS</Form.Label>
                    <Form.Control placeholder="Enter address" onChange={(e)=>setAdres(e.target.value)}/> 
                    {/* onChange={(e)=>setUrl(e.target.value)} */}
                </Form.Group>

                
        
                </Form>
                TEKST NAD PRZYCISKIEM
            <Button variant="success" style={styles.signButton} onClick={fetchTES}> FETCH </Button>

            </div>
        </div>
    )
}

export default Tokentransfer;


const styles = {
    body: {
     textAlign: "center" as "center",
     justifyContent: "center",
     alignItems: "center",
     width: "80%",
     margin: "auto",
     marginTop: 50,
    },
    signButton: {
        display: "block",
        margin: "auto"
    }
 };
