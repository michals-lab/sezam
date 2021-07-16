import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Transaction from '../components/Transaction';
import TokenIssue from '../components/Tokenissue';
import NftToken from '../components/Nfttransfer';
import Header from '../components/Header';
import MainPage from '../components/MainPage';
import TokenTransfer from '../components/Tokentransfer';
import { GetAddress } from '../components/GetAddress';
import Alert from '../components/Alert';
import Form from '../components/Form';
import Pagination from '../components/Pagination';

Enzyme.configure({ adapter: new Adapter() })

let  alerts = ['test','testw']
let components = [<TokenTransfer/>, <Transaction />, <TokenIssue/>,<NftToken/>,<Header/>,<MainPage/>,<GetAddress/>,<dataType/>,<Alert alerts={alerts}/>,<Form />,<Pagination />]

for(var i=0; i<components.length; i++){
    it.skip('render TEST', () => {
        const wrapper = shallow(components[i])
        expect(toJson(wrapper)).toMatchSnapshot();
    });
}

it('render Transaction', () => {
    const wrapper = shallow(<Transaction />)
    expect(toJson(wrapper)).toMatchSnapshot();
});

it('render TokenIssue',()=>{
    const wrapper = shallow(<TokenIssue/>)
    expect(toJson(wrapper)).toMatchSnapshot();
});

it('render TokenTransfer',()=>{
    const wrapper = shallow(<TokenTransfer/>)
    expect(toJson(wrapper)).toMatchSnapshot();
});

it('render NftToken',()=>{
    const wrapper = shallow(<NftToken/>)
    expect(toJson(wrapper)).toMatchSnapshot();
});

it('render Header',()=>{
    const wrapper = shallow(<Header/>)
    expect(toJson(wrapper)).toMatchSnapshot();
});

it('render MainPage',()=>{
    const wrapper = shallow(<MainPage/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})

it('render GetAddress',()=>{
    const wrapper = shallow(<GetAddress/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})
it('render dataType',()=>{
    const wrapper = shallow(<dataType/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})
it('render Alert',()=>{
    let  alerts = ['test','testw']
    const wrapper = shallow(<Alert alerts={alerts}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})
it('reder Form', ()=>{
    const wrapper = shallow(<Form />)
    expect(toJson(wrapper)).toMatchSnapshot();
})
it('render Pagination', ()=>{
    const wrapper = shallow(<Pagination />)
    expect(toJson(wrapper)).toMatchSnapshot();
})

