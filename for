for( var i=0; i<valueTes.length; i++){
  for( var j=0; j<addressTes.length; j++){
    const wrapper = mount(<Transaction/>);
    wrapper.find('input').first().simulate('change',{target:{value: valueTes[1]}})
    wrapper.find('input').at(1).simulate('change',{target:{value: addressTes[0]}})
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain("Wrong address!Your address does not match.")
  }
}
