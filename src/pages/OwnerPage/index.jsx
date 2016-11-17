import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {OwnerItem} from "../../components/Owners/OwnerItem/index.jsx";
import {AddOwnerBlock} from "../../components/Owners/addOwner/index.jsx";

export class OwnersPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			hidden: this.props.hidden,
			title: 'owners',
			owners: [],
			status: 'showOwners'
		};
		this.pageController = this.props.pageController;
		this.loadOwners();


		this.openAddOwner = this.openAddOwner.bind(this);
		this.openShowOwners = this.openShowOwners.bind(this);
	}


	loadOwners(){
		$.get(window.host + '/private/owner/all', function (result) {
			if(result){
				this.setState({owners: result});
			}else{
				// show error or something like that
			}
		}.bind(this));
	}

	close(){
		this.setState({hidden: true});
	}

	open(){
		this.setState({hidden: false});
	}

	openShowOwners(){
		this.loadOwners();
		this.setState({
			status: 'showOwners'
		})
	}

	openAddOwner(){
		this.setState({
			status: 'addOwner'
		})
	}

	renderOwners(){
		let block =[];
		for(let i = 0; i < this.state.owners.length; i++){
			block.push(
				<OwnerItem key={this.state.owners[i].id}
				           firstName={this.state.owners[i].firstName}
				           secondName={this.state.owners[i].secondName}
				           fatherName={this.state.owners[i].fatherName}
				           mail = {this.state.owners[i].mail}
				           id = {this.state.owners[i].id}
				           hotelTitle = {this.state.owners[i].hotelTitle}
				           hotelId = {this.state.owners[i].hotelId}
				           parent = {this}
				/> )
		}
		return block;
	}

	render(){
		if(this.state.hidden){
			return null;
		}

		if(this.state.status == 'showOwners'){
			return (
				<div className='page OwnerPage'>
					<p className="text-primary" style={{'textAlign': 'center'}}>
						<button className="btn btn-lg btn-success" onClick={this.openAddOwner}>
							Add owner
						</button>
					</p>
					{this.renderOwners()}
				</div>
			)
		}else{
			return (
				<div className='page OwnerPage'>
					<p className='OwnerPage__goToShowOwnersButton' onClick={this.openShowOwners}> Back to list of owners</p>
					<AddOwnerBlock hidden={false} parent={this} />
				</div>
			)
		}

	}
}





