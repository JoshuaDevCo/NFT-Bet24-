import React from 'react'

function Forgot() {
  return (
    <div>

<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="login_form mt_7">
				    <h1>Recover Password</h1>
				    <p>To Keep connected with us please login with your personal info.</p>
				    <form>
			            <div class="form-group">
					        <label for="email">Enter Login Id</label>
					        <input type="text" class="form-control" placeholder="Login Id" name="loginId" />
					    </div>

			            <div class="login_btn">
			            	<button type="button" class="btn button btn-block">Recover password </button>
			            </div>
			            <p>Don’t have an account yet? <a href="/Registration">Sign Up</a></p>
			        </form>	
				</div>
			</div>
			<div class="col-md-6">
				<div class="login_img">
					<img src="assets/images/login_img.png" />
				</div>
			</div>
		</div>
	</div>

    </div>
  )
}

export default Forgot