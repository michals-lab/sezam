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
//////////////////////////////////////////////

import { data, nodeInteraction } from '@waves/waves-transactions';
import React,{useState, useEffect} from 'react'
import { Button , Alert, Form} from 'react-bootstrap';
import { isFunctionLike } from 'typescript';
import Header from './Header'

type t1 = {
    assetId:string
    balance:number
    issueTransaction:{
        assetId: string
        chainId: number
        decimals: number
        description: string
        fee: number
        feeAssetId: null
        id: string
        name: string
        proofs: string[]
        quantity: number
        reissuable: boolean
        script: null
        sender: string
        senderPublicKey: string
        timestamp: number
        type: number
        version: number
    }
    minSponsoredAssetFee: null
    quantity: number
    reissuable: boolean
    sponsorBalance: null
}

function Tokentransfer() {
    const [show, setShow] = useState(0)
    const [data,setData] = useState<t1[]>([])
    function GetAddress(){  
        return new Promise((resolve)=>{
            const handle = setInterval(async() => {
               let ad =  await window.WavesKeeper.publicState()
               let ad2 = ad.account?.address
                clearInterval(handle)
                resolve(ad2)
            },50)
        })
    }

    async function Fetch(adres:any){
        const response = await fetch("https://nodes-testnet.wavesnodes.com/assets/balance/"+adres)
        const data = await response.json()
        return data.balances
    }

    useEffect(()=>{
        (async () => {
            const adres = await GetAddress()
            setData(await Fetch(adres))
        })()
    },[])

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

    function transaction(i:number){
        {window.WavesKeeper.signAndPublishTransaction({
            type: 4,
            data: {
                amount: {tokens:1,assetId:data[i].assetId},
                fee: {tokens: "0.001",assetId:"WAVES"},
                recipient: "3MrZW9vycNdMLXQMeQRdggCz6ApD6EuGLfD"
            }
        })}
    }

    // return (
    //     <React.Fragment>
    //         <Header/>
    //         <div style={styles.body}>
    //         {data.map((item:t1)=>
    //         <div>
    //         {item.issueTransaction.name}
    //         <Button variant="success" style={styles.signButton} onClick={() => transaction(0)}> TOKEN</Button>
    //         </div>
    //         )}
    //         </div>
    //     </React.Fragment>
    // )

    return (
        <React.Fragment>
            <Header/>
            <div style={styles.body}>
            <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Recipient</Form.Label>
            <Form.Control  placeholder="Enter recipient" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="precision">
            <Form.Label>Amount</Form.Label>
            <Form.Control  placeholder="Enter amount"/>
            <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
            {data.map((item:t1)=>
            <div>
            {"Asset Name: "}
            {item.issueTransaction.name}
            {" Balance: "}
            {item.balance}
            <Button variant="success" style={styles.signButton}  onClick={()=>transaction(2)}> Button</Button>
            </div>
            )}
            </div>
        </React.Fragment>
    )
}

export default Tokentransfer;

const styles = {
    body: {
        
        textAlign: "left" as "left",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        marginTop: 50,
    },
    signButton: {
        
        display: "block",
        margin: "auto",
    }
 };
