import React,{Component} from 'react';

import {
    Button,Modal,
    ModalHeader,
    ModalBody,
    Form,Label,Input, FormGroup
} from 'reactstrap';

import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';


class ItemModal extends Component{
    state={
        modal : false,
        name:''
    }
    
    toggle = ()=>{
        this.setState({
            modal:!this.state.modal
        }) 
    }

    // if the name refers to the name of the input we get it's value 
    onChange= (e)=>{
        // update the state
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // grab the currant state
    onSubmit = e =>{
        e.preventDefault();
        const newItem = {
            /*id : uuidv4(), CREATED IN the db */
            name : this.state.name
        }

        // add item via addItem action
        this.props.addItem(newItem);

        // close modal
        this.toggle();

    }
    render(){     
        
        return(
           <div>
              <Button
              color="dark" style={{marginBottom:'2rem'}}
              onClick={this.toggle} >Add Item</Button>
              <Modal
                  isOpen = {this.state.modal}
                  toggle={this.toggle}>
                
               <ModalHeader toggle={this.toggle}>ADD TO SHOPING LIST</ModalHeader>
               <ModalBody>
                     <Form onSubmit={this.onSubmit}>
                       <FormGroup>
                           <Label for="item">Item</Label>
                           <Input type="text" name="name" id="item" placeholder="Add shopping Item"
                           onChange={this.onChange} />
                           <Button color="dark" style={{marginTop:'2rem'}} block >Add Item</Button>
                       </FormGroup>
                     </Form>
               </ModalBody>
                 
              </Modal>
           </div>
        );

    }  
}




const mapStateToProps = (state)=>({
    item : state.item
})

export default connect(mapStateToProps,{addItem})(ItemModal);