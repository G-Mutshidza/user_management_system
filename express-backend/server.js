const express = require('express');
const app = express();
const port = 3000;

// setup cross-origin requests
const cors = require('cors');
app.use(cors());

const users = [
	{id: 1, name: "Given Admin", email: "admin@email.com", phone: "0727690572", password: "", role: "Administrator", isActive: true, logged: false, accessrole: "admin", imageUrl: ""}
];

app.get('/user-details', (req, res) => {
	res.json(users);
});
