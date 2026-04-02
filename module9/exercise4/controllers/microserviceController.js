// This controller defines the logic for handling requests to the microservice API.

// It includes functions for each endpoint defined in microserviceRoutes.js, 
// such as getInfo, getHealth, getMushrooms, and updateMushroom.

// It also includes logic to fetch data from an external API (myshroom-api) 
// and store it in memory for updates.

// Each function takes a request (req) and response (res) object,
// performs the necessary logic, and sends a JSON response back to the client.

// Finally, to use these controller functions, they are imported
// and connected to the routes in microserviceRoutes.js.

// GET /api/microservice
// Returns a welcome message and service name.
const getInfo = (req, res) => {
  res.json({
    service: 'microservice-api',
    message: 'Microservice is running'
  });
};

// GET /api/microservice/health
// Returns a simple status object to confirm the service is alive.
const getHealth = (req, res) => {
  res.json({
    status: 'ok'
  });
};

// --- External API connection ---
const fetch = require('node-fetch');
const MUSHROOM_URL =
  'https://raw.githubusercontent.com/fosskers/myshroom-api/master/public/mushrooms.json';

// In-memory store — loaded fresh from the external API each GET
let mushroomCache = null;

// GET /api/microservice/mushrooms
// Fetches the mushroom list from myshroom-api and returns it.
const getMushrooms = async (req, res) => {
  try {
    const response = await fetch(MUSHROOM_URL);
    mushroomCache = await response.json(); // store in cache for PUT use
    res.json(mushroomCache);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach myshroom-api', detail: err.message });
  }
};

// PUT /api/microservice/mushrooms/:id
// Accepts a JSON body and merges it into the cached mushroom at :id.
const updateMushroom = (req, res) => {
  if (!mushroomCache) {
    return res.status(400).json({ error: 'No mushroom data loaded. Call GET /mushrooms first.' });
  }
  const id = req.params.id;                         // from the URL :id segment
  const updates = req.body;                         // from the JSON request body
  const idx = mushroomCache.findIndex(m => String(m.id) === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Mushroom with id ${id} not found.` });
  }
  mushroomCache[idx] = { ...mushroomCache[idx], ...updates }; // merge fields
  res.json({ updated: mushroomCache[idx] });
};

module.exports = { getInfo, getHealth, getMushrooms, updateMushroom };
