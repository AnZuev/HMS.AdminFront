import * as React from 'react';

import {OrderBlockItem} from "./orderItem/index.jsx"

export class OrdersBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: false,
			orders: []
		};
		this.loadOrders();
		this.parent = this.props.parent;
	}

	hide(){
		this.setState({hidden: true});
	}

	show(){
		this.setState({hidden: false});
	}

	loadOrders() {
		let url = window.host + '/private/orders/';

		fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then((response)=> {
			if (response.status == 200) {
				return response.json()
					.then((json) => {
						this.setState({
							orders: json
						});
					})
			} else if(response.status == 204) {
				this.setState({orders: []});
			}else if(response.status == 401) {
				window.authController.cleanLocalStorage();
				window.page.menu.signInClickHandler();
			}else{
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
				}
		}).catch((err) => {
			console.log(err);
		});
	}

	render(){
		let block = [];


		if(!this.state.hidden){
			this.state.orders.forEach(order => {
				block.push(<OrderBlockItem key={order.id} parent={this} order={order} />);
				block.push(<hr/>);
			});
			return 	(
				<div className="row" id="profileBlock__ordersBlock" >

					{(this.state.orders.length > 0) ?
						<div>
							<hr/>
							{block}
						</div>
						:
						<div className="text-muted">
							<span>You haven't made any booking</span>
						</div>
					}
				</div>
			)
		}else{
			return null;
		}
	}

}



