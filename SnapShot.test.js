import Enzyme, { shallow, mount,  configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, screen,render, fireEvent  } from '@testing-library/react';
import TokenIssue from '../components/Tokenissue'
import Transaction from '../components/Transaction'
import '@testing-library/jest-dom/extend-expect';
import Tokentransfer from '../components/Tokentransfer';
import Nfttransfer from '../components/Nfttransfer';

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

let adres = '3MrZW9vycNdMLXQMeQRdggCz6ApD6EuGLfD'

test('test Fetcha',async () => {
    const list = [21372,112,222,22,4,2137,12,1234]
    const desc = ['fessssss','desdes2','desc1','desc12','desc1','deskrypcja-test','desdes1','test2']
    const https = await fetch("https://nodes-testnet.wavesnodes.com/assets/balance/"+adres)
    const data = await https.json()
    expect(data.address).toBe("3MrZW9vycNdMLXQMeQRdggCz6ApD6EuGLfD")
    for( var i=0; i<list.length; i++){
        expect(data.balances[i].quantity).toEqual(list[i])
        expect(data.balances[i].issueTransaction.description).toEqual(desc[i])
    }
})

test('Fetch NFT', async()=>{
    const name = ['Test_NFT_6','Test_NFT_3','Test_NFT_2','Test_NFT_4']
    const desc = ['desdes123','desdes','desdes','desdes']
    const https2 = await fetch('https://nodes-testnet.wavesnodes.com/assets/nft/'+adres+'/limit/1000' )
    const data = await https2.json()
    for( var i=0; i<desc.length; i++){
        expect(data[i].name).toBe(name[i])
        expect(data[i].description).toBe(desc[i])
    }           
})

test.skip("Test Transaction", async () => {
  const { getByTestId } = render(<Transaction />);
  fireEvent.click(getByTestId("bid"))
  const errorMessage = await screen.findByText('Empty fields!');
  const errorMessage2 = await screen.findByText('Make sure your fields are fulfilled')
  expect(errorMessage).toBeInTheDocument()
  expect(errorMessage2).toBeInTheDocument()
})

test('test TokenIssue' ,async () => {
    const { getByTestId } = render(<TokenIssue/>)
    fireEvent.click(getByTestId("bid"))
    const errMess = await screen.findByText('Empty fields!')
    const errMess2 = await screen.findByText('Make sure your fields are fulfilled')
    expect(errMess).toBeInTheDocument()
})

test.skip('test Tokentransfer', async ()=>{
    const {getByTestId} = render(<Tokentransfer />)
    fireEvent.click(getByTestId("bid"))
    const er = await screen.findByText('Empty fields!')
    const er2 = await screen.findByText('Make sure your fields are fulfilled')
    expect(er).toBeInTheDocument()
})

test.skip('test Nfttransfer', async ()=>{
    const {getByTestId} = render(<Nfttransfer />)
    fireEvent.click(getByTestId("bid"))
    const er = await screen.findByText('Empty fields!')
    const er2 = await screen.findByText('Make sure your fields are fulfilled')
    expect(er).toBeInTheDocument()
})


