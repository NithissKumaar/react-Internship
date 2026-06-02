import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=(e)=>{
e.preventDefault();

if(email==="admin@gmail.com" &&
password==="1234")
{
navigate("/dashboard");
}
else{
alert("Invalid Login");
}

};

return(
<div>

<h1>Login</h1>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button>Login</button>

</form>

</div>
);

}

export default Login;