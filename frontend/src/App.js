// Login y Menú con diseño profesional (React puro + CSS inline elegante)
// Sin librerías externas.

import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={styles.appContainer}>
      {isLoggedIn ? (
        <Menu onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.buttonPrimary}>Ingresar</button>
      </form>
    </div>
  );
}

function Menu({ onLogout }) {
  const opciones = [
    "Productos",
    "Clientes",
    "Proveedores",
    "Pedidos",
    "Ventas",
  ];

  return (
    <div style={styles.menuContainer}>
      <h2 style={styles.title}>Panel Principal</h2>

      <div style={styles.grid}>
        {opciones.map((op) => (
          <button key={op} style={styles.menuButton}>{op}</button>
        ))}
      </div>

      <button onClick={onLogout} style={styles.logoutButton}>Cerrar Sesión</button>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0d47a1, #1976d2)",
    padding: 20,
  },

  card: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    color: "#0d47a1",
    fontWeight: "700",
    fontSize: "24px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },

  buttonPrimary: {
    padding: "12px",
    background: "#1976d2",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },

  menuContainer: {
    width: "500px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "25px",
  },

  menuButton: {
    padding: "15px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },

  logoutButton: {
    marginTop: "10px",
    padding: "12px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};