import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {LoginPage} from '../../pages/LoginPage/LoginPage.jsx';
//import {SignUpPage} from '../../pages/SignUpPage/SignUpPage.jsx';
//import {PromotionPage} from '../../pages/PromotionPage/PromotionPage.jsx';
//import {RoomPage} from '../RoomPage/RoomPage.jsx';
//import {RoomSearchPage} from '../RoomSearchPage/RoomSearchPage.jsx';
import {HotelsPage} from '../HotelPage/index.jsx';
import {LKPage} from '../LKPage/LKPage.jsx'
import {OwnersPage} from '../OwnerPage/index.jsx';
import {Menu} from '../../components/menu/index.jsx';



export class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.state,
			authorized: window.authController.isAuthorized()
		};
		window.page = this;
		this.children = {};
		this.changeState = this.changeState.bind(this);

	}

	updateAuth(){
		this.setState({authorized: window.authController.isAuthorized()});
	}

	render(){
		var lymbda = (child)=>{
			if(child){
				this.children[child.state.title] = child;
			}
		};
		var lymbdaMenu = (child)=>{
			if(child){
				this.menu = child;
			}
		};

		return (
			<div className="container">
				{(!this.state.authorized ?
						<LoginPage ref = {lymbda}  pageController = {this} hidden={false} />
					:
						<div>
							<Menu pageController = {this} ref = {lymbdaMenu} isAuthorized = {window.authController.isAuthorized()} />
							<HotelsPage hidden={false}  ref={lymbda} />
							<OwnersPage hidden={true} ref={lymbda} />
 						</div>
				)}
			</div>
		)
	}

	changeState(page){
		let currentPage = this.children[this.state.currentPage];
		console.log(currentPage);
		if(currentPage){
			currentPage.close();
		}
		let nextPage = this.children[page];
		if(nextPage){
			nextPage.open();
		}
		this.setState({currentPage: page});
	}


}





