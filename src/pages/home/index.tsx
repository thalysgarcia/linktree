import { useEffect, useState } from "react"
import { Social } from "../../components/social"
import { FaX, FaInstagram, FaLinkedin } from "react-icons/fa6"

import { db } from "../../services/firebaseConnection"
import {
    getDocs,
    query,
    collection,
    orderBy,
    doc,
    getDoc
} from "firebase/firestore"

interface LinksProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string,
}

interface SocialLinksProps {
    x: string,
    instagram: string,
    youtube: string,
}

export function Home() {
    const [links, setLinks] = useState<LinksProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))
            getDocs(queryRef).then((snapshot) => {
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
        }
        loadLinks();
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef).then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setSocialLinks({
                        x: snapshot.data()?.x,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                    })
                }
            })
        }
        loadSocialLinks();
    }, [])

    return (
        <div className="min-h-screen bg-background grid-bg">
            {/* gradient overlay at bottom */}
            <div className="fixed inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 60%, oklch(0.17 0.025 257 / 0.7))'
                }}
            />

            <div className="relative max-w-lg mx-auto px-4 py-16 flex flex-col items-center">

                {/* Badge */}
                <span className="inline-flex items-center gap-2 border border-border bg-card/60 rounded-full px-3 py-1 font-mono text-xs text-muted-foreground mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    disponível para novos projetos
                </span>

                {/* Profile */}
                <div className="text-center mb-2">
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                        <span className="text-accent">&gt;</span> thalys@dev:~$
                    </p>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight cursor-blink">
                        ThalysMorais
                    </h1>
                    <p className="text-muted-foreground mt-3 text-sm max-w-xs mx-auto">
                        Desenvolvedor web em formação, apaixonado por código limpo e boas práticas.
                    </p>
                </div>

                {/* Role chips */}
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-4 mb-10 font-mono text-xs text-muted-foreground">
                    <span className="text-foreground font-semibold">Desenvolvedor Web</span>
                    <span className="text-border">/</span>
                    <span className="text-foreground font-semibold">Estudante de TI</span>
                    <span className="text-border">/</span>
                    <span className="text-foreground font-semibold flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" className="text-accent">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        Brasil
                    </span>
                </div>

                {/* Links */}
                <div className="flex flex-col w-full gap-3 mb-10">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: link.bg, color: link.color }}
                            className="flex items-center justify-between w-full py-4 px-5 rounded-lg border border-border/40 font-medium text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                        >
                            <span>{link.name}</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ opacity: 0.6 }}>
                                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Social */}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <div className="flex flex-col items-center gap-3 w-full">
                        <p className="font-mono text-xs text-muted-foreground">// me encontre</p>
                        <div className="flex items-center gap-3">
                            <Social url={socialLinks?.x}>
                                <span className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200">
                                    <FaX size={18} />
                                </span>
                            </Social>
                            <Social url={socialLinks?.instagram}>
                                <span className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200">
                                    <FaInstagram size={18} />
                                </span>
                            </Social>
                            <Social url={socialLinks?.youtube}>
                                <span className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200">
                                    <FaLinkedin size={18} />
                                </span>
                            </Social>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <p className="font-mono text-xs text-muted-foreground mt-12">
                    &copy; 2026 Thalys Morais Garcia
                </p>
            </div>
        </div>
    )
}
