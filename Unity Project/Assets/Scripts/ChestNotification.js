#pragma strict

public var text: Text;
public var image: GameObject;
public var totalChests: int;
public var highestLevel: int;

function Update() 
{
	highestLevel = PlayerPrefs.GetInt("zoneUnlocked");

	totalChests = 0;

	for(var i: int = 1; i <= highestLevel; i++)
	{
		totalChests += PlayerPrefs.GetInt("Zone" + i);
	}

	if(totalChests > 0)
	{
		image.SetActive(true);
	}
	else
	{
		image.SetActive(false);
	}

	text.text = totalChests.ToString();
}
