import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const updatedFiles = [...files];

        for (let i = 0; i < fileList.length; i++) {
            updatedFiles.push(fileList[i]);
        }
        setFiles(updatedFiles);
    };
    
    const resetFiles = (event) => {
        event.preventDefault();
        document.getElementById("file").value = "";
        setFiles([]);
    };

    return (
        <div className="Content">
            <h4>Contact</h4>
            <div className="whiteBox container">
                <div className="header"> {/* Header */}
                    <p>Vous n'avez pas trouvé la réponse dans notre <NavLink to="/support/faq">FAQ</NavLink> ?</p>
                    <h3>Contactez-nous</h3>
                </div>
                <div className="content"> {/* Content */}
                    <div className="contactForm">
                        <form className="row g-3 justify-content-center">
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id="firstname" placeholder="Entrez votre prénom..." />
                            </div>
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id="lastname" placeholder="Entrez votre nom de famille..." />
                            </div>
                            <div className="form-group col-md-5">
                                <input type="email" className="form-control" id="email" placeholder="Entrez votre adresse e-mail..." />
                            </div>
                            <div className="form-group col-md-5">
                                <input type="tel" className="form-control" id="phone" placeholder="Entrez votre numéro de téléphone..." />
                            </div>
                            <div className="form-group col-md-5">
                                <select className="form-select" id="subject">
                                    <option value="" disabled selected hidden>Quel est le sujet ?</option>
                                    <option value="sujet1">Sujet 1</option>
                                    <option value="sujet2">Sujet 2</option>
                                    <option value="sujet3">Sujet 3</option>
                                </select>
                            </div>
                            <div className="form-group col-md-5"></div>
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id="requestObject" placeholder="Entrez l'objet de votre demande..." />
                            </div>
                            <div className="form-group col-md-5"></div>
                            <div className="form-group col-md-5">
                                <textarea className="form-control" id="message" rows="3" placeholder="Entrez votre message..."></textarea>
                            </div>
                            <div className="form-group col-md-5 flex-column d-flex justify-content-start align-items-center ps-5">
                                <div>
                                    <label htmlFor="file" className="form-label">Fichiers :&nbsp;&nbsp;</label>
                                    <label htmlFor="file" className="btn btn-primary btn-sm">Ajouter</label>
                                    <input type="file" id="file" className="form-control" style={{ display: "none" }} onChange={handleFileChange} multiple accept=".pdf,.jpg,.jpeg,.png" />
                                    {files.length > 0 &&
                                        <button className="btn btn-danger btn-sm ms-2" onClick={resetFiles}>Supprimer tout</button>
                                    }
                                </div>
                                <small id="fileHelp" className="form-text text-muted">Formats acceptés : .pdf, .jpg, .jpeg, .png</small>
                                <div className="mt-3">
                                    <ul className="list-group list-group-flush">
                                        {files.map((file, index) => (
                                            <li key={index} className="list-group-item">
                                                {file.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group col-md-10 d-flex justify-content-center mt-5">
                                <button type="submit" className="btn btn-primary" onClick={(event) => [event.preventDefault(), alert("Message envoyé !")]}>Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
