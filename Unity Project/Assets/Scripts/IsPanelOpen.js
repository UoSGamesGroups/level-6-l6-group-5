#pragma strict

public var isObjectActive: boolean;
public var sail: GameObject;
public var wood: GameObject;
public var bird: GameObject;
public var boat: GameObject;
public var zoneText: GameObject;

function Start () 
{
	
}

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
	sail.SetActive(false);
	wood.SetActive(false);
	bird.SetActive(false);
	boat.SetActive(false);
	zoneText.SetActive(true);
}

function OpenAll()
{
	sail.SetActive(true);
	wood.SetActive(true);
	bird.SetActive(true);
	boat.SetActive(true);
}