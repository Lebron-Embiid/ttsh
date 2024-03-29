import { HTTP } from '../http.js'

class CheckModel extends HTTP {
	
	getSignIn(success){
	  let params = {
		method:"POST",
		url:"/app/usersign/signIn",
		success:success
	  }
	  this.request(params)
	}
	
	getSignSelect(success){
	  let params = {
		method:"POST",
		url:"/app/usersign/signPageFind",
		success:success
	  }
	  this.request(params)
	}
}

export {CheckModel}