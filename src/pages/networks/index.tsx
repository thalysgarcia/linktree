import { useEffect, useState, type FormEvent } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"


import { db } from "../../services/firebaseConnection";
import { 
    setDoc,
    doc,
    getDoc,
} from "firebase/firestore";



export function Networks() {
    const [x, setX] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
  
    useEffect (()=> {
            function loadLinks(){
                const docRef=doc(db,"social","link")
                getDoc(docRef)
                .then((snapshot)=> {
                    if(snapshot.data() !==undefined){
                        setX(snapshot.data()?.x)
                        setInstagram(snapshot.data()?.instagram)
                        setYoutube(snapshot.data()?.youtube)
                    }
                })
            }

        loadLinks();
    },[])

    function handleRegister(e:FormEvent){
        e.preventDefault();
        
        setDoc(doc(db, "social", "link"), {
            x: x,
            instagram: instagram,
            youtube:youtube,
        })
        .then(()=>{
            console.log("Cadastrados com sucesso")
        })
        .catch((error)=>{
            console.log("Erro ao salvar " + error)
        })
        
    }
    
    return (
        <div className=" flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-bold"> Minhas Redes Sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-3"> Link do X</label>
                <Input
                    type="url"
                    placeholder="Digite a url do X..."
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-3"> Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do Instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-3"> Link do Youtube</label>

                <Input
                    type="url"
                    placeholder="Digite a url do Youtube.."
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button 
                type="submit"
                className="text-white bg-blue-600 rounded-md items-center justify-center flex mb-7 fonc-medium "
                > 
                    Salvar Links

                </button>
            </form>

        </div>

    )
}