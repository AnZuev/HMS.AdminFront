import * as React from 'react';


export class OwnerItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			mail: this.props.mail,
			firstName: this.props.firstName,
			secondName: this.props.secondName,
			fatherName: this.props.fatherName,
			hotel:{
				title: this.props.hotelTitle,
				id: this.props.hotelId
			},
			status: {
				editable: false
			},
			errors:{

			},
			hotels: []
		};
		this.parent = this.props.parent;

		this.handleClick = this.handleClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.loadHotels();
	}

	showError(errors){
		let errorObj = {};
		errors.forEach(error => {
			errorObj[error.field] = error.message;
		});
		this.setState({
			errors: errorObj
		})
	}

	cleanErrors(){
		this.setState({
			errors: {}
		})
	}


	handleClick(){
		this.makeEditable();
	}

	handleSaveClick(){
		let data = this.getDataFromInputs();
		console.log(data);
		let url = window.host + '/private/owner/update';

		this.cleanErrors();
		fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				let bl = document.getElementById("OwnerItem__hotels");
				this.setState({
					firstName: data.firstName,
					secondName: data.secondName,
					fatherName: data.fatherName,
					mail: data.email,
					id: data.id,
					status: {
						editable: false
					},
					hotel: {
						id: data.hotelId,
						title: bl.options[bl.selectedIndex].text
					}
				});
			}else if(response.status == 400){
				return response.json()
					.then(json => {
						if(json.fieldErrors){
							this.showError(json.fieldErrors);
						}
					})
			}else{
				new Error();
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			throw err;
		});
	}

	makeEditable(){
		this.setState({
			status: {
				editable: true
			}
		})
	}

	makeUneditable(){
		this.setState({
			status: {
				editable: false
			}
		})
	}

	getDataFromInputs(){
		return {
			firstName: $("#OwnerItem__firstNameInput").val(),
			secondName: $("#OwnerItem__secondNameInput").val(),
			fatherName: $("#OwnerItem__fatherNameInput").val(),
			email: $("#OwnerItem__mailInput").val(),
			id: this.state.id,
			hotelId: $("#OwnerItem__hotels").val(),
			password: $("#OwnerItem__passwordInput").val()
		}
	}

	loadHotels(){
		fetch(window.host + '/private/hotels/full', {
			method: "get",
			credentials: 'include'
		}).then((response)=>{

			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.setState({hotels: json});
		}).catch((err)=>{
			console.log(err);
		});
	}

	renderHotelDropDown(){
		let opt = null;
		let flag = false;


		opt = [];
		this.state.hotels.forEach((hotel)=>{
			let t;

			if(this.state.hotel.id == hotel.id){
				flag = true;
				t = <option key={hotel.id} value={hotel.id} selected> {hotel.title} </option>;
			}else{
				t = <option key={hotel.id} value={hotel.id}> {hotel.title} </option>;
			}
			opt.push(t);
		});

		return (<div className="form-group">
			<label htmlFor="OwnerItem__hotels"><b>Hotel:</b></label>
			<select className="form-control" id="OwnerItem__hotels">
				{(!flag ? <option value="" disabled selected>Choose hotel...</option> : null)}
				{opt}
			</select>
			<span className="small text-danger">{this.state.errors.hotelId}</span>
		</div>)
	}

	render() {
		if(this.state.status.editable){
			return 	(
				<div className="OwnerItem">
					<p className="h3">{this.state.firstName + " " + this.state.secondName }:</p>
					<hr/>
					<p >
						<b>id: </b> {this.state.id}
					</p>
					<p>
						<b>First name: </b> <input type="text" defaultValue={this.state.firstName} className="form-control" id="OwnerItem__firstNameInput"/>
						<span className="small text-danger">{this.state.errors.firstName}</span>
					</p>

					<p>
						<b>Last name: </b>
						<input type="text" defaultValue={this.state.secondName} className="form-control" id="OwnerItem__secondNameInput"/>
						<span className="small text-danger">{this.state.errors.secondName}</span>
					</p>

					<p>
						<b>Father name: </b>
						<input type="text" defaultValue={this.state.fatherName} className="form-control" id="OwnerItem__fatherNameInput"/>
						<span className="small text-danger">{this.state.errors.fatherName}</span>
					</p>

					{this.renderHotelDropDown()}

					<p>
						<b>Mail: </b>
						<input type="text" defaultValue={this.state.mail} className="form-control" id="OwnerItem__mailInput"/>
						<span className="small text-danger">{this.state.errors.email}</span>
					</p>

					<p>
						<b>Password: </b>
						<input type="password" className="form-control" id="OwnerItem__passwordInput"/>
						<span className="small text-danger">{this.state.errors.password}</span>
					</p>

					<p className="text-primary text-xs-left">
						<button className="btn btn-md btn-success pull-right" onClick={this.handleSaveClick}>
							Save
						</button>
					</p>
					<div className="clearfix"></div>
				</div>
			)
		}else{
			return 	(
				<div className="OwnerItem">
					<p className="h3">{this.state.firstName + " " + this.state.secondName }:</p>
					<hr/>
					<p >
						<b>id: </b> {this.state.id}
					</p>
					<p>
						<b>First name: </b> {this.state.firstName}
					</p>

					<p>
						<b>Last name: </b> {this.state.secondName}
					</p>

					<p>
						<b>Father name: </b> {this.state.fatherName}
					</p>
					<p>
						<b>Mail: </b> {this.state.mail}
					</p>
					<p>
						<b>Hotel: </b> {this.state.hotel.title}
					</p>
					<p className="text-primary text-xs-left">
						<button className="btn btn-md btn-primary pull-right" onClick={this.handleClick}>
							Edit
						</button>
					</p>
					<div className="clearfix"></div>
				</div>
			)
		}

	}

}



