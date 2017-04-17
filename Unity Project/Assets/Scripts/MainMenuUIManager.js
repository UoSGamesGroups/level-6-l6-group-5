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
public var titleImage: GameObject;
public var panCamera: PanCamera;

function Start()
{
//some reason starts active
	boatObj.SetActive (false);
}

function ExploreButton()
{
	panCamera.levelSelectActive = true;
	cosmeticsCamera.transform.position.x = PlayerPrefs.GetFloat("cameraPos");
	cosmeticsCamera.SetActive (true);
	LevelGen.SetActive (true);
	//zones.SetActive (true);
	mainMenuButtons.SetActive (false);
	closeUIButton.SetActive (true);
	titleImage.SetActive (false);
}

function OpenChestPanel()
{
	panCamera.levelSelectActive = false;
	cosmeticsCamera.SetActive (true);
	cosmeticsCamera.transform.position = Vector3(0,16.65,0.12);
	chestsPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
	titleImage.SetActive (false);
	
}

function OpenUpgradesPanel()
{
	upgradesPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
	resourcesUI.SetActive (true);
	titleImage.SetActive (false);
	
}

function OpenCosmeticsPanel()
{
	cosmeticsCamera.transform.position = Vector3(0,16.65,0.12);
	cosmeticsCamera.SetActive (true);
	cosmeticsPanel.SetActive (true);
	closeUIButton.SetActive (true);
	mainMenuButtons.SetActive (false);
	boatObj.SetActive (true);
	titleImage.SetActive (false);
	
}

function CloseUI()
{
	panCamera.levelSelectActive = false;
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
	titleImage.SetActive (true);
	
	
}
