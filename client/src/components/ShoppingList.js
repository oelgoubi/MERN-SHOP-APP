import React,{Component} from 'react';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import { connect } from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import propTypes from 'prop-types';

class ShoppingList extends Component{

    // life cycle -> here we can make API requests
    componentDidMount(){
        // once the component is mounted 
       // it's ready to access the store and grab data 
       this.props.getItems();   // this will dispatch an action -> store.dispatch(getItems)
                                // to the reducer that will check the type and then execute the action
        
    }
   

    
    
      deleteItem = (id)=> {
            
           this.props.deleteItem(id);
         }



    render(){ 
        const {items} = this.props.item;
        return(
            <Container>
               
             <ListGroup>
                 <TransitionGroup className="shopping-list">
                        {items.map(({_id,name})=>(
                          <CSSTransition key={_id} timeout={500} classNames="fade">
                             <ListGroupItem>
                                <Button className="remove-btn" color="danger"
                                 size="sm" onClick={()=>this.deleteItem(_id)}>&times;</Button>
                                 {name}
                             </ListGroupItem>
                          </CSSTransition>
                        ))}
                    

                 </TransitionGroup>
             </ListGroup>


            </Container>
        )



    }


}


// set the state of the objects we will be using inside our app
ShoppingList.propTypes ={
    getItems : propTypes.func.isRequired,
    deleteItem: propTypes.func.isRequired,
    item : propTypes.object.isRequired
}


// map the item object in the root reducer with the this.props of the comp
const mapStateToProps = (state)=>({
   item : state.item
});





export default connect(mapStateToProps,{getItems,deleteItem})(ShoppingList);