import { Link, useNavigate } from "react-router-dom";
import{Input} from '../../components/input';
import { useState, type FormEvent } from "react";


import {auth} from '../../services/firebaseConnection'
import{signInWithEmailAndPassword} from 'firebase/auth'

export function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        
         if(email === '' || password ===''){
            alert("Preencha todos os campos!")
         return;
        }

        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            console.log("Login feito com sucesso!")
            navigate("/admin", {replace: true})
        })
        .catch((error)=>{
            console.log("Erro ao fazer login!")
            console.log(error);
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="text-6xl mt-11 text-white mb-7 font-bold text-5x1">Dev
                <span className="bg-linear-to-r from-yellow-400 bg-clip-text text-transparent"> Link</span></h1>
            </Link>
            
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                
                <Input
                    placeholder="Digite seu email..."
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />

                 <Input
                    placeholder="*******"
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <button 

                type="submit"
                className="h-9 bg-blue bg-blue-600 rounded border-0 text-lg font-medium cursor-pointer text-white" >
                    Acessar
                </button>

            </form>

        </div>
    )
}