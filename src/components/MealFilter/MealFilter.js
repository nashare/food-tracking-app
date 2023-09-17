import React from 'react';

function MealFilter({ filterFrom, filterTo, onFilterChange, onFilter, onCancelFilter }) {
    
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div>
            <input
                type="date"
                placeholder="From Date"
                value={filterFrom}
                max={filterTo}
                onChange={(e) => onFilterChange('filterFrom', e.target.value)}
            />
            <input
                type="date"
                placeholder="To Date"
                value={filterTo}
                min={filterFrom}
                max={currentDate}
                onChange={(e) => onFilterChange('filterTo', e.target.value)}
            />
            <button onClick={onFilter}>Filter</button>
            <button onClick={onCancelFilter}>Cancel Filter</button>
        </div>
    );
}

export default MealFilter;
