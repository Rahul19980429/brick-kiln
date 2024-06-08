import React, { useState ,useContext} from 'react';
import context from '../../ContextApi/Context';
import { useNavigate} from 'react-router-dom';
const Form = () => {
    const navigate = useNavigate();
    const a = useContext(context);
    const{logInUser,error,setError}=a;

    const [input, setInput] = useState({contact:'',password:''})

    // for password type dependancy like type and svg change
    const eyeClicked = () => {
        if (svgeye.type === 'password') {
            setSvgeye({
                type: 'text',
                eye: "bi-eye-fill",
                path1: <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />,
                path2: <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            })
        }
        else{
            setSvgeye({
                type: "password",
                eye: "bi-eye-slash-fill",
                path1: <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />,
                path2: <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            })

        }
    }
    // useState for inital svg and type of input
    const [svgeye, setSvgeye] = useState({
        type: "password",
        eye: "bi-eye-slash-fill",
        path1: <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />,
        path2: <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    });

    // on change
    const onChange=(e)=>{
        if(e.target.value.trim()===''){
            e.target.value="";
        };
        setInput({...input,[e.target.name]:e.target.value});
        setError('')
    }

    // enter only number only
    const keypress=(e)=>{
        if(isNaN(e.target.value)){
            e.target.value="";
            setInput({ ...input, [e.target.name]: e.target.value })
        }
    }

    // for login or submit
    const submit=(e)=>{
        e.preventDefault();
       logInUser(input.contact,input.password).then((result)=>{
                   if(result.success){
               localStorage.setItem('Jwt_token',result.token)
               localStorage.setItem('user_name',result.user.name)
               navigate('/')
           }
           else{
               setError(result)
               navigate('/login')
           }
       })

    }
    return (
        <form onSubmit={submit}>
            <div className=" input-group mb-4">
                <span className="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-phone-fill" viewBox="0 0 16 16">
                    <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                </svg></span>
                <input autoComplete='off' onChange={onChange} onKeyUp={keypress} maxLength={10} minLength={10} type="text" className="form-control" value={input.contact} id="contact" name="contact" placeholder='Enter Contact' />
            </div>
            <div className=" input-group mb-4">
                <span className="input-group-text" id="basic-addon1"><svg onClick={eyeClicked} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` text-primary bi ${svgeye.eye}`} viewBox="0 0 16 16">
                    {svgeye.path1}
                    {svgeye.path2}
                </svg></span>
                <input autoComplete='off' onChange={onChange} type={svgeye.type}  className="form-control" value={input.password} id="password" name="password" placeholder='Enter password' />
            </div>
            <div className=" mb-4 text-primary fw-bold text-center">
               <small>{error.error}</small>
            </div>
            <div className="d-grid gap-2">
                <button className="btn  btn-primary text-white fw-bold border-0" disabled={!input.contact||!input.password?true:false} type="submit">LOG IN</button>
            </div>
        </form>
    )
}

export default Form
