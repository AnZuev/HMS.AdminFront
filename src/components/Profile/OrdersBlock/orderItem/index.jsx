import * as React from 'react';


export class OrderBlockItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.order;
		this.handleCancelClick = this.handleCancelClick.bind(this);
	}


	handleCancelClick(){
		let url = window.host + '/private/orders/cancel';
		let id = this.state.id;
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				orderId: id
			})
		}).then((response)=>{
			console.log(this.props);
			this.props.parent.loadOrders();
			if(response.status == 200){
				this.setState({
					status: "CANCELED"
				})
			}else if(response.status == 401){
				window.authController.cleanLocalStorage();
				window.menu.signInClickHandler();
			}else{
				throw new Error();
			}

		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}
	render() {
		let errorBlock = "";

		if(this.state.commonError){
			errorBlock = <div className="alert alert-danger" role="alert">
				{this.state.commonError}
			</div>;
		}
		return (
			<div className="row profileBlock__ordersBlock__orderItem">
				{errorBlock}
				<span><b>Id:</b> {this.state.id}</span><br/>
				<span><b>Hotel:</b> {this.state.hotelTitle}</span><br/>
				<span><b>Room:</b> {this.state.roomNumber}</span><br/>
				<span><b>From:</b> {this.state.from}</span><br/>
				<span><b>To:</b> {this.state.to}</span><br/>
				<span><b>Cost:</b> {this.state.cost}$</span><br/>
				<span><b>Status:</b> {this.state.status}</span>
				{(this.state.status == "BOOKED") ? <button className="btn btn-sm btn-danger btn-block pull-right" onClick={this.handleCancelClick}>Cancel</button> : ""}
			</div>
			)
	}

}
