import * as React from 'react';


export class ProfileBlock extends React.Component {
	constructor(props) {
		super(props);
		let user = window.authController.getUserData();

		this.state = {
			user: user,
			editable: false,
			commonErrors: null,
			hidden: true,
			errors: {}
		};

		this.parent = this.props.parent;
		this.handleClick = this.handleClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}


	cleanErrors(){
		this.setState({
			commonErrors: "",
			errors: {}
		})
	}
	handleClick(){
		this.setState({
			editable: true
		})
	}


	handleSaveClick(){
		let data = {
			firstName: $('#profileBlock__firstNameInput').val(),
			secondName: $('#profileBlock__lastNameInput').val(),
			fatherName: $('#profileBlock__fatherNameInput').val(),
			phoneNumber: $("#profileBlock__phoneInput").val(),
			mail: $("#profileBlock__mailInput").val(),
			password: $("#profileBlock__passwordInput").val()
		};



		let url = window.host + '/private/profile/edit';

		window.authController.setAuthData(data.mail);

		this.cleanErrors();

		fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status <= 401 && response.status >= 400){
				return response.json()
					.then((json) => {
						if(response.status == 400) {
							let errors = {};
							json.fieldErrors.forEach(error =>{
								errors[error.field] = error.message;
							});
							this.setState({
								errors: errors
							});
						}else if(response.status == 401){
							window.menu.brandClickHandler();
						}
					})
			}else if(response.status == 200) {
				data.id = this.state.id;
				window.authController.setUserData(data);
				this.setState({
					editable: false,
					user: window.authController.getUserData()
				})
			}else{
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			throw err;
		});
	}

	hide(){
		this.setState({hidden: true});
	}

	show(){
		this.setState({hidden: false});
	}

	render() {
		if(this.state.hidden){
			return null;
		}
		if (this.state.editable) {
			return (<div className="row" id="profileBlock">
				<div>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>

					<p className="profileBlock__line">
						<b>FirstName: </b> <input type="text" defaultValue={this.state.user.firstName} className="form-control" id="profileBlock__firstNameInput"/>
						<span className="small text-danger">{this.state.errors.firstName}</span>
					</p>

					<p className="profileBlock__line">
						<b>LastName: </b> <input type="text" defaultValue={this.state.user.secondName} className="form-control" id="profileBlock__lastNameInput"/>
						<span className="small text-danger">{this.state.errors.secondName}</span>

					</p>

					<p className="profileBlock__line">
						<b>FatherName: </b> <input type="text" defaultValue={this.state.user.fatherName} className="form-control" id="profileBlock__fatherNameInput"/>
						<span className="small text-danger">{this.state.errors.fatherName}</span>
					</p>

					<p className="profileBlock__line">
						<b>E-mail: </b><input type="email" defaultValue={this.state.user.mail} className="form-control" id="profileBlock__mailInput"/>
						<span className="small text-danger">{this.state.errors.mail}</span>
					</p>

					<p className="profileBlock__line">
						<b>Phone: </b> <input type="tel" defaultValue={this.state.user.phoneNumber} className="form-control" id="profileBlock__phoneInput"/>
						<span className="small text-danger">{this.state.errors.phoneNumber}</span>
					</p>
					<p className="profileBlock__line">
						<b>Password: </b> <input type="password"  className="form-control" id="profileBlock__passwordInput"/>
						<span className="small text-danger">{this.state.errors.password}</span>
					</p>
					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>)
		} else {
			return (<div className="row" id="profileBlock">
				<div>
					<p className="profileBlock__line">
						<b>FirstName: </b> {this.state.user.firstName}
					</p>

					<p className="profileBlock__line">
						<b>LastName: </b> {this.state.user.secondName}
					</p>

					<p className="profileBlock__line">
						<b>FatherName: </b> {this.state.user.fatherName}
					</p>

					<p className="profileBlock__line">
						<b>E-mail: </b> {this.state.user.mail}
					</p>

					<p className="profileBlock__line">
						<b>Phone: </b> {this.state.user.phoneNumber}
					</p>
					<button className="btn btn-md btn-primary btn-block" type='submit' onClick={this.handleClick}>Edit</button>

				</div>
			</div>)
		}
	}
}
