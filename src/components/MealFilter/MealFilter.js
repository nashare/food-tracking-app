import React from 'react';

function MealFilter({ filterFrom, filterTo, onFilterChange, onFilter, onCancelFilter }) {
    
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div>
            <div className="field is-grouped">
                <p class="control">
                    <input
                        className="input is-medium"
                        type="date"
                        placeholder="From Date"
                        value={filterFrom}
                        max={filterTo}
                        onChange={(e) => onFilterChange('filterFrom', e.target.value)}
                    />
                </p>
                <p class="control">
                    <input
                        className="input is-medium"
                        type="date"
                        placeholder="To Date"
                        value={filterTo}
                        min={filterFrom}
                        max={currentDate}
                        onChange={(e) => onFilterChange('filterTo', e.target.value)}
                    />
                </p>
                <p class="control is-flex is-align-items-center">
                    <button className="button is-normal is-info" onClick={onFilter}>Filter</button>
                </p>
                <p class="control is-flex is-align-items-center">
                    <button className="button is-normal is-info" onClick={onCancelFilter}>Cancel</button>
                </p>
            </div>
        </div>
    );
}

export default MealFilter;
