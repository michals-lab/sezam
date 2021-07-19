for( var i=0; i<valueTes.length; i++){
  for( var j=0; j<addressTes.length; j++){
    const wrapper = mount(<Transaction/>);
    wrapper.find('input').first().simulate('change',{target:{value: valueTes[1]}})
    wrapper.find('input').at(1).simulate('change',{target:{value: addressTes[0]}})
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain("Wrong address!Your address does not match.")
  }
}



const valueTes = ['','-1','0','1','aa']
const addressTes = ['','3MrZW9vycNdMLXQMeQRdggCz6ApD6EuGLfD','0','asd']
const expect = ['Empty field!Make sure your inputs are fulfilled','Wrong address!Your address does not match.','Empty field!Make sure your inputs are fulfilled']

test('transaction inputs test #1',()=>{
    const wrapper = mount(<Transaction/>);
    wrapper.find('input').first().simulate('change',{target:{value: ""}})
    wrapper.find('input').at(1).simulate('change',{target:{value: ""}})
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain("Empty field!Make sure your inputs are fulfilled")
})

test('transaction inputs test #2',()=>{
  const wrapper = mount(<Transaction/>);
  wrapper.find('input').first().simulate('change',{target:{value: valueTes[1]}})
  wrapper.find('input').at(1).simulate('change',{target:{value: addressTes[0]}})
  wrapper.find('button').simulate('click')
  expect(wrapper.text()).toContain("Wrong address!Your address does not match.")
})

test('transaction inputs test #3',()=>{
  const wrapper = mount(<Transaction/>);
  wrapper.find('input').first().simulate('change',{target:{value: valueTes[0]}})
  wrapper.find('input').at(1).simulate('change',{target:{value: addressTes[0]}})
  wrapper.find('button').simulate('click')
  expect(wrapper.text()).toContain("Empty field!Make sure your inputs are fulfilled")
})
