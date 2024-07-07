import React from 'react';
import IsLoading from '../IsLoading/IsLoading';
import TableTemplate from '../TableTemplate/TableTemplate';

const ManageModeration = ({ title, context, theadData, tbodyData, isLoading = false, limit = null }) => {
    const handleModalAddOpen = () => {
        console.log(`Ajout d'un ${context}`);
    };

    return (
        <div className="Content">
            <h4>Modération : Gestion des {context}</h4>
            <div className='whiteBox gap-4'>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h5>Liste des {context}</h5>
                    <button className="btn btn-outline-primary" onClick={handleModalAddOpen}>
                        Ajouter un {context &&
                        context.slice(0, -1)} {/* Remove the last character of the string (here, the 's' at the end of the word) */}
                    </button>
                </div>
                <div className="d-flex justify-content-end w-100">
                    <small>{tbodyData.length} {context} trouvés</small>
                </div>
                <TableTemplate theadData={theadData} tbodyData={tbodyData} isLoading={isLoading} limit={limit} />
            </div>
        </div>
    );
}

export default ManageModeration;
