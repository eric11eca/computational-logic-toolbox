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

router.post("/", (req, res, next) => {
	res.send({
		redirect: '/fsm'
	});
});

router.post("/generateAutomaton", (req, res, next) => {
	var fsmType = req.body.fsmType;
	var automaton = stateAutomaton.createRandomFsm(fsmType, 4, 3, 3);
	//var expression = stateAutomaton.toRegex(automaton);
	//console.log("ENFA: ", automaton);
	//automaton = stateAutomaton.convertEnfaToNfa(automaton);
	//console.log("NFA: ", automaton);
	//automaton = stateAutomaton.convertNfaToDfa(automaton);
	//console.log("DFA: ", automaton);
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

router.post("/getCurrentStates", (req, res, next) => {
	var automaton = req.body.automaton;
	var currentStates = stateAutomaton.forwardEpsilonTransition(automaton, [automaton.starting]);
	return res.send(currentStates);
});

router.post("/forwardTransition", (req, res, next) => {
	var automaton = req.body.automaton;
	var currentStates = req.body.currentStates;
	var input = req.body.input;
	var newStates = stateAutomaton.forwardTransition(automaton, currentStates, input);
	return res.send(newStates);
});

router.post("/backwardTransition", (req, res, next) => {
	var automaton = req.body.automaton;
	var inputString = req.body.inputString;
	var newStates = stateAutomaton.backwardTransition(automaton, inputString);
	return res.send(newStates);
});

module.exports = router;