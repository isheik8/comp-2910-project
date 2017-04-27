function openOptionsMenu() {
	let optionsGroup = game.group();
	let optionsPanel = game.rectangle(200,400,"grey");
	let backButton = game.circle(50,"red");
	optionsGroup.addChild(optionsPanel, backButton);
	game.stage.putCenter(optionsGroup);
	backButton.interact = true;
	
	backButton.tap = () => {
		game.stage.remove(optionsGroup);
		game.state = openMainMenu;
	}
	
	game.state = optionsMenu;
}

function optionsMenu() {
}
