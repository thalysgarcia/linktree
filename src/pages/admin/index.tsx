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
        return () => { unsub(); }
    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault()
        if (nameInput === "" || urlInput === "") return;

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backGroundColorInput,
            color: textColorInput,
            created: new Date()
        }).then(() => {
            setNameInput("")
            setUrlInput("")
        }).catch(() => {
            console.log("Erro ao cadastrar no banco")
        })
    }

    async function handleDeletLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Form card */}
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-5">
                        <span className="font-mono text-xs text-accent">// 01</span>
                        <h2 className="font-bold text-foreground text-lg">Novo Link</h2>
                        <span className="flex-1 h-px bg-border" />
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground">nome do link</label>
                            <Input
                                placeholder="Ex: Meu Portfolio..."
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground">url do link</label>
                            <Input
                                type="input"
                                placeholder="https://..."
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-6">
                            <div className="flex items-center gap-3">
                                <label className="font-mono text-xs text-muted-foreground">cor do texto</label>
                                <div className="relative w-8 h-8 rounded-md border border-border overflow-hidden">
                                    <input
                                        type="color"
                                        value={textColorInput}
                                        onChange={(e) => setTextColorInput(e.target.value)}
                                        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                                    />
                                    <span
                                        className="absolute inset-0 rounded-md"
                                        style={{ backgroundColor: textColorInput }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="font-mono text-xs text-muted-foreground">fundo do link</label>
                                <div className="relative w-8 h-8 rounded-md border border-border overflow-hidden">
                                    <input
                                        type="color"
                                        value={backGroundColorInput}
                                        onChange={(e) => setBackGroundColorInput(e.target.value)}
                                        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                                    />
                                    <span
                                        className="absolute inset-0 rounded-md"
                                        style={{ backgroundColor: backGroundColorInput }}
                                    />
                                </div>
                            </div>
                        </div>

                        {nameInput !== '' && (
                            <div className="border border-border/50 rounded-lg p-3 bg-muted/30">
                                <p className="font-mono text-xs text-muted-foreground mb-2">preview</p>
                                <div
                                    className="flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium"
                                    style={{ backgroundColor: backGroundColorInput, color: textColorInput }}
                                >
                                    <span>{nameInput}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" style={{ opacity: 0.6 }}>
                                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer mt-1"
                        >
                            Cadastrar link
                        </button>
                    </form>
                </div>

                {/* Links list */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-mono text-xs text-accent">// 02</span>
                        <h2 className="font-bold text-foreground text-lg">Meus Links</h2>
                        <span className="flex-1 h-px bg-border" />
                        <span className="font-mono text-xs text-muted-foreground">{links.length} itens</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {links.map((link) => (
                            <article
                                key={link.id}
                                className="flex items-center justify-between rounded-lg py-3 px-4 border border-border/40"
                                style={{ backgroundColor: link.bg, color: link.color }}
                            >
                                <p className="text-sm font-medium">{link.name}</p>
                                <button
                                    className="flex items-center justify-center w-7 h-7 rounded border border-white/20 bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
                                    onClick={() => handleDeletLink(link.id)}
                                    title="Remover link"
                                >
                                    <FiTrash size={14} color="white" />
                                </button>
                            </article>
                        ))}

                        {links.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground font-mono text-sm border border-dashed border-border rounded-xl">
                                nenhum link cadastrado ainda.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
