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

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef).then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setX(snapshot.data()?.x)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }
        loadLinks();
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        setDoc(doc(db, "social", "link"), {
            x: x,
            instagram: instagram,
            youtube: youtube,
        }).then(() => {
            console.log("Cadastrados com sucesso")
        }).catch((error) => {
            console.log("Erro ao salvar " + error)
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="font-mono text-xs text-accent">// 02</span>
                        <h2 className="font-bold text-foreground text-lg">Redes Sociais</h2>
                        <span className="flex-1 h-px bg-border" />
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-muted-foreground">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                                </svg>
                                link do x (twitter)
                            </label>
                            <Input
                                type="url"
                                placeholder="https://x.com/..."
                                value={x}
                                onChange={(e) => setX(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-muted-foreground">
                                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 9.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z" />
                                </svg>
                                link do instagram
                            </label>
                            <Input
                                type="url"
                                placeholder="https://instagram.com/..."
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-muted-foreground">
                                    <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.7 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.5V9h3.6v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7Z" />
                                </svg>
                                link do linkedin
                            </label>
                            <Input
                                type="url"
                                placeholder="https://linkedin.com/in/..."
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer mt-1"
                        >
                            Salvar redes sociais
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
