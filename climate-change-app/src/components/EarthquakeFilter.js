import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

const EarthquakeFilterSort = () => {
    const [earthquakeData, setEarthquakeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    // Year and Month options
    const years = Array.from({ length: 16 }, (_, index) => (2008 + index).toString());
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Helper function to filter data by year and month
    const filterData = useMemo(() => {
        return earthquakeData
            .filter((row) => {
                const earthquakeYear = new Date(row.earthquake_time).getFullYear().toString();
                const earthquakeMonth = new Date(row.earthquake_time).toLocaleString('default', { month: 'long' });
                return earthquakeYear === selectedYear && earthquakeMonth === selectedMonth;
            })
            .sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.earthquake_magnitude - b.earthquake_magnitude;
                } else {
                    return b.earthquake_magnitude - a.earthquake_magnitude;
                }
            })
            .slice(0, 50);  // Get the top 50 strongest earthquakes
    }, [earthquakeData, selectedYear, selectedMonth, sortOrder]);

    // Fetch earthquake data from CSV file on component mount
    useEffect(() => {
        d3.csv('/processed_earthquake_data.csv').then((data) => {
            const parsedData = data.map((row) => ({
                earthquake_time: row.earthquake_time,
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                earthquake_depth: parseFloat(row.earthquake_depth),
                earthquake_magnitude: parseFloat(row.earthquake_magnitude),
                earthquake_location: row.earthquake_location,
            }));
            setEarthquakeData(parsedData);
            setLoading(false);
        });
    }, []);

    // Effect to apply filters when year, month, or sort order changes
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setFilteredData(filterData);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout); // Cleanup to prevent memory leaks
    }, [filterData]);

    // Handlers to immediately show loading
    const handleYearChange = (e) => {
        setLoading(true);
        setSelectedYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setLoading(true);
        setSelectedMonth(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setLoading(true);
        setSortOrder(e.target.value);
    };

    const handleResetFilters = () => {
        setLoading(true);
        setSelectedYear('2023');
        setSelectedMonth('January');
        setSortOrder('asc');
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '36px', color: '#333' }}>Earthquake Data</h1>
                <h4 style={{ fontSize: '24px', color: '#555' }}>Top 50 Strongest Earthquakes</h4>
            </div>

            {/* Filters Box */}
            <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div>
                    <label htmlFor="year" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Year:</label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px' }}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="month" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Month:</label>
                    <select
                        id="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px' }}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sort" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Sort by Magnitude:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px' }}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <button onClick={handleResetFilters} style={{ padding: '8px 15px', fontSize: '16px', borderRadius: '4px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Reset Filters
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading Data...</div>}

            {/* Earthquake Data Table */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {filteredData.length > 0 ? (
                    <table style={{ width: '100%', margin: '20px 0', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f4f4f4' }}>Time</th>
                                <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f4f4f4' }}>Location</th>
                                <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f4f4f4' }}>Magnitude</th>
                                <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f4f4f4' }}>Depth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                    <td style={{ padding: '10px' }}>{row.earthquake_time}</td>
                                    <td style={{ padding: '10px' }}>{row.earthquake_location}</td>
                                    <td style={{ padding: '10px' }}>{row.earthquake_magnitude}</td>
                                    <td style={{ padding: '10px' }}>{row.earthquake_depth} km</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ textAlign: 'center', fontSize: '18px' }}>No data available for the selected filters.</div>
                )}
            </div>
        </div>
    );
};

export default EarthquakeFilterSort;
