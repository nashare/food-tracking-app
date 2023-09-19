import React from 'react';

function MealFilter({ filterFrom, filterTo, onFilterChange, onFilter, onCancelFilter }) {
    
    return (
        <div>
            <div className="field is-grouped">
                <p className="control">
                    <input
                        className="input is-medium"
                        type="date"
                        placeholder="From Date"
                        value={filterFrom}
                        max={filterTo}
                        onChange={(e) => onFilterChange('filterFrom', e.target.value)}
                    />
                </p>
                <p className="control">
                    <input
                        className="input is-medium"
                        type="date"
                        placeholder="To Date"
                        value={filterTo}
                        min={filterFrom}
                        onChange={(e) => onFilterChange('filterTo', e.target.value)}
                    />
                </p>
                <p className="control is-flex is-align-items-center">
                    <button className="button is-normal is-info" onClick={onFilter}>Filter</button>
                </p>
                <p className="control is-flex is-align-items-center">
                    <button className="button is-normal is-info" onClick={onCancelFilter}>Cancel</button>
                </p>
            </div>
        </div>
    );
}

export default MealFilter;
