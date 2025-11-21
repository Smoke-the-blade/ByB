import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <h1>Menú Principal</h1>

            <p>Bienvenido, <strong>{user?.username}</strong></p>

            <div style={styles.menuBox}>
                <button style={styles.button} onClick={() => navigate("/stock")}>
                    Stock
                </button>

                <button style={styles.button} onClick={() => navigate("/ventas")}>
                    Ventas
                </button>

                <button style={styles.button} onClick={() => navigate("/empleados")}>
                    Empleados
                </button>

                <button style={styles.button} onClick={() => navigate("/informes")}>
                    Informes
                </button>
            </div>

            <button style={styles.logoutButton} onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
};

const styles = {
    container: {
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    menuBox: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "200px"
    },
    button: {
        padding: "12px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#007bff",
        color: "white"
    },
    logoutButton: {
        marginTop: "30px",
        padding: "10px 15px",
        backgroundColor: "red",
        border: "none",
        color: "white",
        cursor: "pointer"
    }
};

export default Menu;
