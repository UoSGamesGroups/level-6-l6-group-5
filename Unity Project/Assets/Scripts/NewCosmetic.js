#pragma strict

public var UIManager: MainMenuUIManager;
public var prompt: GameObject;
public var newCosmetic: boolean;

function Update () 
{
	if(newCosmetic)
	{
		prompt.SetActive(true);
	}
	else
	{
		prompt.SetActive(false);
	}
}
