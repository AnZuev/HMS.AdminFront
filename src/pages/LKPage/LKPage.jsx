import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ProfileBlock} from '../../components/Profile/ProfileBlock/index.jsx'
import {TabControl} from '../../components/Profile/tabControl/index.jsx'
import {OrdersBlock} from '../../components/Profile/OrdersBlock/index.jsx';

export class LKPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: !window.authController.isAuthorized(),
			title: 'lkPage'
		};
	}

	close(){
		this.setState({hidden: true});
	}
	open(){
		this.setState({hidden: false});
		this.ordersBlock.loadOrders();
	}

	openProfile(){
		this.ordersBlock.hide();
		this.profile.show();
	}

	openOrders(){
		this.profile.hide();
		this.ordersBlock.show();
	}


	render(){
		if(!window.authController.isAuthorized()){
			return null;
		}

		var lymbdaProfile = (child)=>{
			if(child){
				this.profile = child;
			}
		};
		var lymbdaOrders = (child)=>{
			if(child){
				this.ordersBlock = child;
			}
		};
		return (
			<div className={this.state.hidden ? 'hide page' : 'page'} >
				<TabControl parent = {this} />
				<ProfileBlock parent = {this} ref={lymbdaProfile} />
				<OrdersBlock parent = {this} ref = {lymbdaOrders} />
			</div>
		)
	}





}





