import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header() {

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <header className="w-full sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Link
                        to="/"
                        className="font-mono text-sm font-bold flex items-center gap-1.5 mr-4"
                    >
                        <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/15 text-primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                            </svg>
                        </span>
                        <span className="text-foreground">dev<span className="text-accent">.link</span></span>
                    </Link>

                    <nav className="flex items-center gap-0.5">
                        <Link
                            to="/admin"
                            className="font-mono text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
                        >
                            <span className="text-accent">01</span> links
                        </Link>
                        <Link
                            to="/admin/networks"
                            className="font-mono text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
                        >
                            <span className="text-accent">02</span> redes
                        </Link>
                    </nav>
                </div>

                <button
                    className="flex items-center justify-center w-8 h-8 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors cursor-pointer"
                    onClick={handleLogout}
                    title="Sair"
                >
                    <BiLogOut size={16} />
                </button>
            </div>
        </header>
    )
}
