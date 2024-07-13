import React, { useState } from 'react';
import IsLoading from '../IsLoading/IsLoading';
import TableTemplate from '../TableTemplate/TableTemplate';

const ManageModeration = ({ title, context, theadData, tbodyData, isLoading = false, limit = null, filterBy = null, addButton = null, manageTicketsField = null }) => {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const getFilteredData = () => {
        return tbodyData.filter(item => {
            return Object.keys(filters).every(filterKey => {
                if (!filters[filterKey]) return true;
                return item[filterKey] === filters[filterKey];
            });
        });
    };

    const filteredData = getFilteredData();

    return (
        <div className="Content">
            <h4>Modération : Gestion des {context}</h4>
            <div className='whiteBox gap-4'>
                <div className="d-flex justify-content-between align-items-start w-100">
                    <div className="d-flex gap-2 align-items-start flex-wrap flex-column">
                        <h5>Liste des {context}</h5>
                        <div className="d-flex gap-3 align-items-start flex-wrap">
                            {filterBy && filterBy.map((filter, index) => (
                                <div key={index} className="d-flex gap-2 align-items-start">
                                    <label htmlFor={filter.key}>{filter.label}:</label>
                                    <select
                                        name={filter.key}
                                        id={filter.key}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="form-select form-select-sm"
                                    >
                                        <option value="">Tous</option>
                                        {[...new Set(tbodyData.map(item => item[filter.key]))].map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                    {addButton &&
                        <button className="btn btn-outline-primary" onClick={addButton}>
                            Ajouter un {context && context.slice(0, -1)}
                        </button>
                    }
                </div>
                <div className="d-flex justify-content-end w-100">
                    <small>{filteredData.length} {context} trouvés</small>
                </div>
                <TableTemplate theadData={theadData} tbodyData={filteredData} isLoading={isLoading} limit={limit} manageTicketsField={manageTicketsField} />
            </div>
        </div>
    );
};

export default ManageModeration;
