#pragma strict
public var upgradesPanel: GameObject;
public var cosmeticsPanel: GameObject;
public var chestsPanel: GameObject;
public var resourcesUI: GameObject;
public var closeUIButton: GameObject;
public var mainMenuButtons: GameObject;
public var zones: GameObject;
public var boatObj: GameObject;
public var cosmeticsCamera: GameObject;
public var LevelGen: GameObject;

function Start()
{
//some reason starts active
	boatObj.SetActive (false);
}

function ExploreButton()
{
	cosmeticsCamera.SetActive (true);
	LevelGen.SetActive (true);
	//zones.SetActive (true);
	mainMenuButtons.SetActive (false);
	closeUIButton.SetActive (true);
}

function OpenChestPanel()
{
	chestsPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
}

function OpenUpgradesPanel()
{
	upgradesPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
	resourcesUI.SetActive (true);
}

function OpenCosmeticsPanel()
{
	cosmeticsCamera.SetActive (true);
	cosmeticsPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
	boatObj.SetActive (true);
}

function CloseUI()
{
	LevelGen.SetActive (false);
	cosmeticsCamera.SetActive (false);
	upgradesPanel.SetActive (false);
	cosmeticsPanel.SetActive (false);
	chestsPanel.SetActive (false);
	closeUIButton.SetActive (false);
	mainMenuButtons.SetActive (true);
	boatObj.SetActive (false);
	zones.SetActive (false);
	resourcesUI.SetActive (false);
	
}
