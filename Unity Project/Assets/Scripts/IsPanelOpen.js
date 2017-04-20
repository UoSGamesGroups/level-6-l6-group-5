#pragma strict

public var isObjectActive: boolean;
public var sail: GameObject;
public var wood: GameObject;
public var bird: GameObject;
public var boat: GameObject;
public var sailButton: GameObject;
public var woodButton: GameObject;
public var birdButton: GameObject;
public var zoneText: GameObject;

function Update () 
{
	if(sail.activeSelf || wood.activeSelf || bird.activeSelf)
	{
		isObjectActive = true;
	}
	else
	{
		isObjectActive = false;
	}
}

function CloseAll()
{
	sailButton.GetComponent(SailButton).panelOpen = false;
	sail.SetActive(false);
	woodButton.GetComponent(WoodButton).panelOpen = false;
	wood.SetActive(false);
	birdButton.GetComponent(BirdButton).panelOpen = false;
	bird.SetActive(false);
	boat.SetActive(false);
	//zoneText.SetActive(true);
}

function OpenAll()
{
	sail.SetActive(true);
	wood.SetActive(true);
	bird.SetActive(true);
	boat.SetActive(true);
}