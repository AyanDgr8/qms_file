// src/components/routes/MainFiles/MainFiles.js

import React, { useEffect, useState, useRef } from "react";
import "./MainFiles.css";

const MainFiles = ({ searchQuery, wordGroups }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openFileId, setOpenFileId] = useState(null);
    const [termCounts, setTermCounts] = useState({});
    const containerRef = useRef(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams();
                if (searchQuery?.spokenWords) {
                    params.append("spokenWords", searchQuery.spokenWords);
                }
                if (searchQuery?.addWords) {
                    params.append("addWords", searchQuery.addWords);
                }
                if (searchQuery?.timeBasis) {
                    params.append("timeBasis", searchQuery.timeBasis);
                }

                const queryString = params.toString();
                console.log(`Query string: ${queryString}`);


                // ****************
                if (!hasFetched.current) {}
                // ****************

                
                // Use the correct endpoint for fetching all transcriptions
                const url = queryString
                    ? `http://localhost:8000/api/search-transcriptions/?${queryString}`
                    : `http://localhost:8000/api/transcriptions/`;

                const response = await fetch(url);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }
                const result = await response.json();
                console.log("API response:", result);

                // Calculate term counts and highlight text
                const termCountsMap = {};
                const filteredData = result.map(item => {
                        const allTerms = [
                            searchQuery?.spokenWords || '',
                            searchQuery?.addWords || '',
                            ...Object.values(wordGroups).flat().filter(term => typeof term === 'string')
                        ].filter(Boolean).join(' ').trim();

                        // Create a regex pattern to match any of the words in the content
                        const escapedTerms = allTerms.split(' ').map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
                        const regex = new RegExp(`(${escapedTerms})`, 'gi');

                        // Update term counts
                        const counts = {};
                        [item.agent_transcription, item.agent_translation, item.customer_transcription, item.customer_translation].forEach(field => {
                            if (field) {
                                const matches = field.match(regex);
                                if (matches) {
                                    matches.forEach(match => {
                                        const term = match.toLowerCase();
                                        counts[term] = (counts[term] || 0) + 1;
                                    });
                                }
                            }
                        });

                        // Add counts to the global termCountsMap
                        Object.keys(counts).forEach(term => {
                            termCountsMap[term] = (termCountsMap[term] || 0) + counts[term];
                        });

                        // Highlight text
                        const highlightText = (text) => {
                            return text.replace(regex, (match) => `<span class="${highlightClass(match)}">${match}</span>`);
                        };

                        // Determine the highlight class
                        const highlightClass = (term) => {
                            const termIsInWordGroups = Object.values(wordGroups).flat()
                                .filter(item => typeof item === 'string')
                                .some(groupTerm => groupTerm.toLowerCase() === term.toLowerCase());

                            return termIsInWordGroups ? 'highlight-green' : 'highlight';
                        };

                        return {
                            ...item,
                            agent_transcription: highlightText(item.agent_transcription || ''),
                            agent_translation: highlightText(item.agent_translation || ''),
                            customer_transcription: highlightText(item.customer_transcription || ''),
                            customer_translation: highlightText(item.customer_translation || '')
                        };
                    });

                setTermCounts(termCountsMap);
                setData(filteredData);
            } catch (error) {
                console.error("Error during fetch:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchData();
    }, [searchQuery, wordGroups]);

    const toggleDetails = (fileId) => {
        if (openFileId === fileId) {
            setOpenFileId(null);
        } else {
            setOpenFileId(fileId);
            const element = document.getElementById(`file-${fileId}`);
            if (element && containerRef.current) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                containerRef.current.scrollTop = element.offsetTop - (containerRef.current.clientHeight / 2) + (element.clientHeight / 2);
            }
        }
    };

    const filterData = (data, searchTerms, additionalTerms, wordGroups) => {
        if (!searchTerms && !additionalTerms && !wordGroups) return data;

        const allTerms = [
            searchTerms,
            additionalTerms,
            ...Object.values(wordGroups).flat().filter(term => typeof term === 'string')
        ].filter(Boolean).join(' ').trim();

        // Create a regex pattern to match any of the words in the content
        const escapedTerms = allTerms.split(' ').map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const regex = new RegExp(`(${escapedTerms})`, 'gi');

        return data.filter(item =>
            [item.agent_transcription, item.agent_translation, item.customer_transcription, item.customer_translation].some(field =>
                field && field.match(regex)
            )
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredData = filterData(data, searchQuery?.spokenWords, searchQuery?.addWords, wordGroups);

    return (
        <div className="mainfiles-container" ref={containerRef}>
            <div className="search-terms-count">
                {Object.entries(termCounts).map(([term, count]) => (
                    <div key={term}>
                        <strong>{term}:</strong> {count} occurrences
                    </div>
                ))}
            </div>
            {filteredData.length === 0 ? (
                // Display all files when there's no search result
                data.map(item => (
                    <div key={item.id} id={`file-${item.id}`} className={`file-table-container ${openFileId === item.id ? 'visible' : 'hidden'}`}>
                        <table className="file-table">
                            <tbody>
                                <tr>
                                    <th>File Name</th>
                                    <td>{item.file_name}</td>
                                    <td>
                                        <button
                                            className="toggle-button"
                                            onClick={() => toggleDetails(item.id)}
                                        >
                                            {openFileId === item.id ? '▲' : '▼'}
                                        </button>
                                    </td>
                                </tr>
                                {openFileId === item.id && (
                                    <>
                                        <tr className="details">
                                            <th>Date Time</th>
                                            <td>{item.date_time}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.agent_transcription }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.agent_translation }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.customer_transcription }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.customer_translation }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Download Links</th>
                                            <td>
                                                <a href={item.audio_file_link} target="_blank" rel="noreferrer">Audio File</a> | 
                                                <a href={item.transcript_file_link} target="_blank" rel="noreferrer">Transcript File</a>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                filteredData.map(item => (
                    <div key={item.id} id={`file-${item.id}`} className={`file-table-container ${openFileId === item.id ? 'visible' : 'hidden'}`}>
                        <table className="file-table">
                            <tbody>
                                <tr>
                                    <th>File Name</th>
                                    <td>{item.file_name}</td>
                                    <td>
                                        <button
                                            className="toggle-button"
                                            onClick={() => toggleDetails(item.id)}
                                        >
                                            {openFileId === item.id ? '▲' : '▼'}
                                        </button>
                                    </td>
                                </tr>
                                {openFileId === item.id && (
                                    <>
                                        <tr className="details">
                                            <th>Date Time</th>
                                            <td>{item.date_time}</td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.agent_transcription }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Agent Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.agent_translation }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Transcription</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.customer_transcription }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Customer Translation</th>
                                            <td dangerouslySetInnerHTML={{ __html: item.customer_translation }}></td>
                                        </tr>
                                        <tr className="details">
                                            <th>Download Links</th>
                                            <td>
                                                <a href={item.audio_file_link} target="_blank" rel="noreferrer">Audio File</a> | 
                                                <a href={item.transcript_file_link} target="_blank" rel="noreferrer">Transcript File</a>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default MainFiles;
