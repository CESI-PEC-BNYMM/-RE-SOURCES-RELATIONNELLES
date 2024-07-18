import React, { useState } from 'react';

const PollForm = () => {
    const [numberOfAnswers, setNumberOfAnswers] = useState(2);

    const handleRadioChange = (event) => {
        setNumberOfAnswers(parseInt(event.target.value));
    };

    return (
        <div className="w-100 mb-4 d-flex flex-column gap-1">
            <div className="w-100 mb-4">
                <label htmlFor="pollNbAnswers" className="form-label">Combien de réponses voulez-vous ? (2 minimum)</label>
                <div className="d-flex align-items-center gap-2">
                    {[2, 3, 4, 5].map((value) => (
                        <div className="form-check form-check-inline" key={value}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id={`inlineRadio${value}`}
                                value={value}
                                checked={numberOfAnswers === value}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor={`inlineRadio${value}`}>{value}</label>
                        </div>
                    ))}
                </div>
            </div>
            <input type="text" className="form-control mb-3" id="pollTitle" placeholder="Ajouter un titre..." required />
            <div className="w-100 mb-4 d-flex flex-column gap-2">
                {[...Array(numberOfAnswers)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-control"
                        id={`pollAnswer${index + 1}`}
                        placeholder={`Ajouter le choix ${index + 1}...`}
                        required
                    />
                ))}
            </div>
        </div>
    );
};

export default PollForm;
