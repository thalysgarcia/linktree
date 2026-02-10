import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { useState, type FormEvent, useEffect } from "react"

import { FiTrash } from 'react-icons/fi'
import { db } from "../../services/firebaseConnection"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc,

} from "firebase/firestore"


interface LinksProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string,
}

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backGroundColorInput, setBackGroundColorInput] = useState("#121212")

    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                })
            })

            setLinks(lista);
        })

        return () => {
            unsub();
        }
    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault()
        if (nameInput === "" || urlInput === "") {
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backGroundColorInput,
            color: textColorInput,
            created: new Date()
        })
            .then(() => {
                setNameInput("")
                setUrlInput("")
                console.log("Cadastrado com sucesso!")
            })
            .catch(() => {
                console.log("Erro ao cadastra no banco")
            })
    }


    async function handleDeletLink(id:string){
       const docRef=doc(db,"links",id)
       await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl " onSubmit={handleRegister}>
                <label className="text-white  font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white  font-medium mt-2 mb-2">Url do Link</label>
                <Input
                    type="input"
                    placeholder="Digite a url..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5 ">
                    <div className="flex gap-4">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link </label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link </label>
                        <input
                            type="color"
                            value={backGroundColorInput}
                            onChange={(e) => setBackGroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center-safe justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-2">Veja como esta ficando!</label>
                        <article
                            className=" text-white w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, background: backGroundColorInput }}>
                            <p style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit" className="mb-7 bg-blue-600  h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map((link) => (
                <article
                    key={link.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none"
                    style={{ backgroundColor: link.bg, color:link.color }}
                >
                    <p>{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed  p-1 rounded cursor-pointer bg-neutral-900"
                            onClick={()=> handleDeletLink(link.id)}
                            >
                            
                            <FiTrash size={18} color="white" />
                        </button>
                    </div>

                </article>
            ))}
        </div>
    )
}