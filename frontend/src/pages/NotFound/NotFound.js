import { useEffect } from "react";

const NotFound = () => {
    useEffect(() => {
        document.title = '(RE) – Page non trouvée';
    }, []);

    return (
        <div className="Content">
            <h1>404</h1>
            <h2>Page non trouvée</h2>
        </div>
    );
}

export default NotFound;
