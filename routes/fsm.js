const express = require("express"),
	router = express.Router(),
	bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: true
}));

let stateAutomaton = require("../app/stateAutomaton.js").data;

router.get("/", (request, response) => {
	response.render("fsm", {
		title: "Finite State Automaton Simulation",
		author: "Zeming Chen",
		description: "playground for define FSM and simulate string"
	});
});

router.post("/generateAutomaton", (req, res, next) => {
	var fsmType = req.body.fsmType;
	var automaton = stateAutomaton.createRandomFsm(fsmType, 4, 3, 3)
	return res.send(stateAutomaton.serializeFsmToString(automaton));
});

router.post("/createAutomaton", (req, res, next) => {
	var definition = req.body.definition;
	var automaton = stateAutomaton.parseFsmFromString(definition);
	return res.send(automaton);
});

router.post("/printDotFormat", (req, res, next) => {
	var automaton = req.body.automaton;
	var dotString = stateAutomaton.printDotFormat(automaton);
	return res.send(dotString);
});

module.exports = router;