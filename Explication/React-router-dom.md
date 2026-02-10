# React Router DOM - Passo a Passo

## 1. Instalacao

```bash
npm install react-router-dom
```

## 2. Configuracao Basica

### 2.1 Envolver a aplicacao com BrowserRouter

No arquivo `main.tsx` ou `index.tsx`:

```tsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### 2.2 Definir as Rotas

No arquivo `App.tsx` ou em um arquivo de rotas separado:

```tsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<h1>404 - Pagina nao encontrada</h1>} />
    </Routes>
  )
}
```

## 3. Navegacao

### 3.1 Usando o componente Link

```tsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">Sobre</Link>
    </nav>
  )
}
```

### 3.2 Usando o hook useNavigate

```tsx
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()

  function handleLogin() {
    // logica de login...
    navigate('/dashboard')
  }

  return <button onClick={handleLogin}>Entrar</button>
}
```

## 4. Parametros de Rota

### 4.1 Definindo rotas com parametros

```tsx
<Route path="/user/:id" element={<UserProfile />} />
```

### 4.2 Acessando parametros com useParams

```tsx
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()

  return <h1>Usuario: {id}</h1>
}
```

## 5. Rotas Aninhadas (Nested Routes)

```tsx
// App.tsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>

// Dashboard.tsx
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Renderiza a rota filha aqui */}
    </div>
  )
}
```

## 6. Hooks Uteis

| Hook | Descricao |
|------|-----------|
| `useNavigate()` | Navegar programaticamente |
| `useParams()` | Acessar parametros da URL |
| `useLocation()` | Acessar objeto location atual |
| `useSearchParams()` | Acessar query strings (?key=value) |

### Exemplo useSearchParams

```tsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')

  return <h1>Buscando por: {query}</h1>
}
// URL: /search?q=react
```

## 7. Protecao de Rotas (Route Guard)

```tsx
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const isAuthenticated = // sua logica de autenticacao

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Uso:
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

## 8. NavLink (Link com estado ativo)

```tsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
    </nav>
  )
}
```

## Resumo

1. Instalar: `npm install react-router-dom`
2. Envolver app com `<BrowserRouter>`
3. Definir rotas com `<Routes>` e `<Route>`
4. Navegar com `<Link>` ou `useNavigate()`
5. Pegar parametros com `useParams()`
6. Usar `<Outlet>` para rotas aninhadas
