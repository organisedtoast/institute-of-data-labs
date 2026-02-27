
// Initate historical shareprice chart ...
// Overlay ValueLine table
// Add key insider & substantial holder trading
// Add key broker reports
// Add key fund manager, socials and news commentary
// Mobile Gossip Analysis ready




// Task 1: Create 6 JS functions which print the above Mobile Gossip Analysis and call those functions in sequence. 
// Use a mix of function declarations, expressions and arrow functions.

function initiateHistoricalSharePriceChart() {
    console.log("Initiating historical share price chart...");
}

const overlayValueLineTable = function() {
    console.log("Overlaying ValueLine table...");
}       

const addKeyInsiderTrading = () => {
    console.log("Adding key insider trading...");
}   

function addKeyBrokerReports() {
    console.log("Adding key broker reports...");
}   

const addKeyFundManagerSocialsAndNewsCommentary = () => {
    console.log("Adding key fund manager, socials and news commentary...");
}   

function mobileGossipAnalysisReady() {
    console.log("Mobile Gossip Analysis ready!");
}   

// Call the functions in sequence
initiateHistoricalSharePriceChart();
overlayValueLineTable();
addKeyInsiderTrading();
addKeyBrokerReports();
addKeyFundManagerSocialsAndNewsCommentary();
mobileGossipAnalysisReady();


// Task 2: Make the functions asynchronous by using setTimeout with different time durations, maintaining the right order.
function initiateHistoricalSharePriceChart() {
    setTimeout(() => {
        console.log("Initiating historical share price chart...");
    }, 1000);
}

const overlayValueLineTable = function() {
    setTimeout(() => {
        console.log("Overlaying ValueLine table...");
    }, 2000);
}   

const addKeyInsiderTrading = () => {
    setTimeout(() => {
        console.log("Adding key insider trading...");
    }, 3000);   
}

function addKeyBrokerReports() {
    setTimeout(() => {
        console.log("Adding key broker reports...");
    }, 4000);   
}

const addKeyFundManagerSocialsAndNewsCommentary = () => {
    setTimeout(() => {
        console.log("Adding key fund manager, socials and news commentary...");
    }, 5000);
}

function mobileGossipAnalysisReady() {
    setTimeout(() => {
        console.log("Mobile Gossip Analysis ready!");
    }, 6000);
}   

// Call the functions in sequence
initiateHistoricalSharePriceChart();
overlayValueLineTable();
addKeyInsiderTrading();
addKeyBrokerReports();
addKeyFundManagerSocialsAndNewsCommentary();
mobileGossipAnalysisReady();


// Task 3: Modify the asynchronous functions to use Promises and achieve the required result.
function initiateHistoricalSharePriceChart() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Initiating historical share price chart...");
            resolve();
        }, 1000);
    });
}

const overlayValueLineTable = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table...");
            resolve();
        }, 2000);
    });
}

const addKeyInsiderTrading = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports...");
            resolve();
        }, 4000);
    });
}   

const addKeyFundManagerSocialsAndNewsCommentary = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary...");
            resolve();
        }, 5000);
    });
}

function mobileGossipAnalysisReady() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready!");
            resolve();
        }, 6000);
    }); 
}

// Call the functions in sequence using Promises
initiateHistoricalSharePriceChart()
    .then(overlayValueLineTable)
    .then(addKeyInsiderTrading)
    .then(addKeyBrokerReports)
    .then(addKeyFundManagerSocialsAndNewsCommentary)
    .then(mobileGossipAnalysisReady);


    

// Task 4: Modify the functions to use async/await and achieve the required result.

function initiateHistoricalSharePriceChart() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Initiating historical share price chart...");
            resolve();
        }, 1000);
    }); 
}

const overlayValueLineTable = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table...");
            resolve();
        }, 2000);
    });
}   

const addKeyInsiderTrading = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports...");
            resolve();
        }, 4000);
    });
    
}   

const addKeyFundManagerSocialsAndNewsCommentary = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary...");
            resolve();
        }, 5000);
    });
}  

function mobileGossipAnalysisReady() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready!");
            resolve();
        }, 6000);
    });
}

// Call the functions in sequence using async/await
async function runMobileGossipAnalysis() {
    await initiateHistoricalSharePriceChart();
    await overlayValueLineTable();
    await addKeyInsiderTrading();
    await addKeyBrokerReports();
    await addKeyFundManagerSocialsAndNewsCommentary();
    await mobileGossipAnalysisReady();
}

runMobileGossipAnalysis();


