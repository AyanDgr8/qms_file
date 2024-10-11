// src/components/routes/MainBody/MainBody/MainBody.js

import React, { useState } from "react";
import "./MainBody2.css";

const MainBody2 = () => {
    const [spokenPhrase, setSpokenPhrase] = useState("");
    const [addPhrase, setAddPhrase] = useState("");

    const handleClearClick = () => {
        setSpokenPhrase("");
        setAddPhrase("");
    };

    return (
        <div>
            <div className="mainbody-container">
                <div className="mainbody-searchh">
                    <div className="mainb-firstt">
                        <div className="mainb-first-search">
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Agent Name
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Agent Name"
                                    value={spokenPhrase}
                                    onChange={(e) => setSpokenPhrase(e.target.value)}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Disposition
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Disposition"
                                    value={addPhrase}
                                    onChange={(e) => setAddPhrase(e.target.value)}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Sentimental Score
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Sentimental Score"
                                    value={spokenPhrase}
                                    onChange={(e) => setSpokenPhrase(e.target.value)}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Abusive Score
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Abusive Score"
                                    value={addPhrase}
                                    onChange={(e) => setAddPhrase(e.target.value)}
                                />
                            </div>
                        </div>  
                    </div>

                    {/* *********** */}

                    <div className="mainb-secondd">
                        <div className="mainb-first-search">
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Extension Number
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Extension Number"
                                    value={spokenPhrase}
                                    onChange={(e) => setSpokenPhrase(e.target.value)}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Dialed Number
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Dialed Number"
                                    value={addPhrase}
                                    onChange={(e) => setAddPhrase(e.target.value)}
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3 sed">
                                <span className="input-group-text phrase-word span-w" id="inputGroup-sizing-sm">
                                    Recieved Number
                                </span>
                                <input
                                    type="text"
                                    className="form-control inp-w"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter Recieved Number"
                                    value={spokenPhrase}
                                    onChange={(e) => setSpokenPhrase(e.target.value)}
                                />
                            </div>
                            
                            {/* ******* */}
                            
                            <div className="srch-btns">
                                <button 
                                    type="button" 
                                    className="btn btn-primary clr-srchh"
                                    onClick={handleClearClick}
                                >
                                    Search 
                                </button>
                            </div>
                        </div> 

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainBody2;
