import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateNote} from '../actions/noteActions';
import {deleteNote} from '../actions/noteActions';

 class Note extends Component{
        constructor(props){
            super(props);
            this.state = {
                editFlag : false
            }
        }


    
    update(){
        
        this.setState({editFlag:false})

        return {title : this.refs.newTitle.value, content: this.refs.newContent.value, id:this.props.id }

       

    }

    edit(){
       this.setState({editFlag:true})
        console.log("Clicked");
    }

    renderForm(){ 
        return(
                    <div defaultValue={this.props}> 
                        <input ref = "newTitle" defaultValue ={this.props.info.title} /> 
                        <textarea ref = "newContent" defaultValue={this.props.info.content}/>
                        <button onClick= {() =>this.props.updateNote(this.update())}> Update</button>
                    </div>

        )
    }

    renderDisplay(){

        return(
            <div>
            <button className="pull-right text-uppercase delete-button" onClick={() => this.props.deleteNote({title : this.props.info.title, content: this.props.info.content, id:this.props.id })} >&times;</button>
            
                <div className="panel panel-default" onClick={()=> this.edit()}>
                 <div className="panel-heading">
                    {this.props.info.title}
                    
                </div>
                    <div className="panel-body">{this.props.info.content}
                </div>
                </div>
            </div>
            )

    }

    render(){

    return( 
            (this.state.editFlag) ? this.renderForm() : this.renderDisplay() 
        )
    }
}

const mapStateToProps = (state) => {
    console.log("From Get notes in notejs");
    
    console.log(state);
    return {
        // n: state.getNotesReducers,
        note: state.noteReducers


    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("From Get notes in notejs");
    
    return {
        updateNote : (value) =>{
            console.log(value);
            dispatch(updateNote(value));
       
        },
        deleteNote : (value) => {
            console.log("From delete", value );
            dispatch(deleteNote(value));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (Note);

