
// Initate historical shareprice chart ...
// Overlay ValueLine table
// Add key insider & substantial holder trading
// Add key broker reports
// Add key fund manager, socials and news commentary
// Mobile Gossip Analysis ready




// Task 1: Create 6 JS functions which print the above Mobile Gossip Analysis and call those functions in sequence. 
// Use a mix of function declarations, expressions and arrow functions.

function initiateHistoricalSharePriceChart1() {
    console.log("Initiating historical share price chart ONE...");
}

const overlayValueLineTable1 = function() {
    console.log("Overlaying ValueLine table ONE...");
}       

const addKeyInsiderTrading1 = () => {
    console.log("Adding key insider trading ONE...");
}   

function addKeyBrokerReports1() {
    console.log("Adding key broker reports ONE...");
}   

const addKeyFundManagerSocialsAndNewsCommentary1 = () => {
    console.log("Adding key fund manager, socials and news commentary ONE...");
}   

function mobileGossipAnalysisReady1() {
    console.log("Mobile Gossip Analysis ready ONE!");
}   

// Call the functions in sequence
initiateHistoricalSharePriceChart1();
overlayValueLineTable1();
addKeyInsiderTrading1();
addKeyBrokerReports1();
addKeyFundManagerSocialsAndNewsCommentary1();
mobileGossipAnalysisReady1();


// Task 2: Make the functions asynchronous by using setTimeout with different time durations, maintaining the right order.
function initiateHistoricalSharePriceChart2() {
    setTimeout(() => {
        console.log("Initiating historical share price chart TWO...");
    }, 1000);
}

const overlayValueLineTable2 = function() {
    setTimeout(() => {
        console.log("Overlaying ValueLine table TWO...");
    }, 2000);
}   

const addKeyInsiderTrading2 = () => {
    setTimeout(() => {
        console.log("Adding key insider trading TWO...");
    }, 3000);   
}

function addKeyBrokerReports2() {
    setTimeout(() => {
        console.log("Adding key broker reports TWO...");
    }, 4000);   
}

const addKeyFundManagerSocialsAndNewsCommentary2 = () => {
    setTimeout(() => {
        console.log("Adding key fund manager, socials and news commentary TWO...");
    }, 5000);
}

function mobileGossipAnalysisReady2() {
    setTimeout(() => {
        console.log("Mobile Gossip Analysis ready TWO!");
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
            console.log("Initiating historical share price chart THREE...");
            resolve();
        }, 1000);
    });
}

const overlayValueLineTable3 = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table THREE...");
            resolve();
        }, 2000);
    });
}

const addKeyInsiderTrading3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading THREE...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports THREE...");
            resolve();
        }, 4000);
    });
}   

const addKeyFundManagerSocialsAndNewsCommentary3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary THREE...");
            resolve();
        }, 5000);
    });
}

function mobileGossipAnalysisReady3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready THREE!");
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
            console.log("Initiating historical share price chart FOUR...");
            resolve();
        }, 1000);
    }); 
}

const overlayValueLineTable4 = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Overlaying ValueLine table FOUR...");
            resolve();
        }, 2000);
    });
}   

const addKeyInsiderTrading4 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key insider trading FOUR...");
            resolve();
        }, 3000);
    });
}

function addKeyBrokerReports4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key broker reports FOUR...");
            resolve();
        }, 4000);
    });   
}   

const addKeyFundManagerSocialsAndNewsCommentary4 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Adding key fund manager, socials and news commentary FOUR...");
            resolve();
        }, 5000);
    });
}  

function mobileGossipAnalysisReady4() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mobile Gossip Analysis ready FOUR!");
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
    await mobileGossipAnalysisReady4();
}

runMobileGossipAnalysis();


