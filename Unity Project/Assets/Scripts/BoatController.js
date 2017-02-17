#pragma strict

public var boat: GameObject[];
public var currentLevel: float;
public var boatAmount: float;

function Start () 
{
	currentLevel = PlayerPrefs.GetInt("currentLevel");
	boatAmount = currentLevel/10;

	for(var i: int; i < boat.Length; i++)
	{
		boat[i].SetActive(false);
	}

	for(var j: int; j < boatAmount; j++)
	{
		boat[j].SetActive(true);
	}
}
