
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
function initiateHistoricalSharePriceChart2() {
    setTimeout(() => {
        console.log("Initiating historical share price chart...");
    }, 1000);
}

const overlayValueLineTable2 = function() {
    setTimeout(() => {
        console.log("Overlaying ValueLine table...");
    }, 2000);
}   

const addKeyInsiderTrading2 = () => {
    setTimeout(() => {
        console.log("Adding key insider trading...");
    }, 3000);   
}

function addKeyBrokerReports2() {
    setTimeout(() => {
        console.log("Adding key broker reports...");
    }, 4000);   
}

const addKeyFundManagerSocialsAndNewsCommentary2 = () => {
    setTimeout(() => {
        console.log("Adding key fund manager, socials and news commentary...");
    }, 5000);
}

function mobileGossipAnalysisReady2() {
    setTimeout(() => {
        console.log("Mobile Gossip Analysis ready!");
    }, 6000);
}   

// Call the functions in sequence
initiateHistoricalSharePriceChart2();
overlayValueLineTable2();
addKeyInsiderTrading2();
addKeyBrokerReports2();
addKeyFundManagerSocialsAndNewsCommentary2();
mobileGossipAnalysisReady2();


// Task 3: Modify the asynchronous functions to use Promises and achieve the required result.
function initiateHistoricalSharePriceChart3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Initiating historical share price chart...");
            resolve();
        }, 1000);
    });
}

const overlayValueLineTable3 = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table...");
            resolve();
        }, 2000);
    });
}

const addKeyInsiderTrading3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports...");
            resolve();
        }, 4000);
    });
}   

const addKeyFundManagerSocialsAndNewsCommentary3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary...");
            resolve();
        }, 5000);
    });
}

function mobileGossipAnalysisReady3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready!");
            resolve();
        }, 6000);
    }); 
}

// Call the functions in sequence using Promises
initiateHistoricalSharePriceChart3()
    .then(overlayValueLineTable3)
    .then(addKeyInsiderTrading3)
    .then(addKeyBrokerReports3)
    .then(addKeyFundManagerSocialsAndNewsCommentary3)
    .then(mobileGossipAnalysisReady3);


    

// Task 4: Modify the functions to use async/await and achieve the required result.

function initiateHistoricalSharePriceChart4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Initiating historical share price chart...");
            resolve();
        }, 1000);
    }); 
}

const overlayValueLineTable4 = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table...");
            resolve();
        }, 2000);
    });
}   

const addKeyInsiderTrading4 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports...");
            resolve();
        }, 4000);
    });   
}   

const addKeyFundManagerSocialsAndNewsCommentary4 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary...");
            resolve();
        }, 5000);
    });
}  

function mobileGossipAnalysisReady4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready!");
            resolve();
        }, 6000);
    });
}

// Call the functions in sequence using async/await
async function runMobileGossipAnalysis() {
    await initiateHistoricalSharePriceChart4();
    await overlayValueLineTable4();
    await addKeyInsiderTrading4();
    await addKeyBrokerReports4();
    await addKeyFundManagerSocialsAndNewsCommentary4();
    await mobileGossipAnalysisReady4   ();
}

runMobileGossipAnalysis();


