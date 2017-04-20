#pragma strict

public var UIManager: MainMenuUIManager;
public var prompt: GameObject;
public var newCosmetic: boolean;
public var allSails: SailUnlocks[];
public var allPets: BirdUnlocks[];
public var allWood: WoodlUnlocks1[];

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

function Check()
{
	newCosmetic = false;

	for(var i : int = 0; i < allSails.Length; i++)
    {
    	allSails[i].GetComponent(SailUnlocks).HasBeenSelected();
    }

	for(var j : int = 0; j < allPets.Length; j++)
    {
    	allPets[j].GetComponent(BirdUnlocks).HasBeenSelected();
    }

	for(var k : int = 0; k < allWood.Length; k++)
    {
    	allWood[k].GetComponent(WoodlUnlocks1).HasBeenSelected();
    }
}