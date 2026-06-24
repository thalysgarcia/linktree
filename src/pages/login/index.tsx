import { Link, useNavigate } from "react-router-dom";
import { Input } from '../../components/input';
import { useState, type FormEvent } from "react";

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (email === '' || password === '') {
            alert("Preencha todos os campos!")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/admin", { replace: true })
            })
            .catch((error) => {
                console.log("Erro ao fazer login!", error);
            })
    }

    return (
        <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 font-mono text-lg font-bold">
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/15 text-primary border border-primary/25">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                            </svg>
                        </span>
                        <span className="text-foreground">dev<span className="text-accent">.link</span></span>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-3 font-mono">
                        <span className="text-accent">//</span> acesso restrito
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h1 className="text-foreground font-bold text-xl mb-1">Entrar</h1>
                    <p className="text-muted-foreground text-sm mb-6">Acesse o painel de administração.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground">email</label>
                            <Input
                                placeholder="seu@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-muted-foreground">senha</label>
                            <Input
                                placeholder="••••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Acessar
                        </button>
                    </form>
                </div>

                <p className="text-center font-mono text-xs text-muted-foreground mt-6">
                    <Link to="/" className="hover:text-foreground transition-colors">
                        ← voltar para o início
                    </Link>
                </p>
            </div>
        </div>
    )
}
