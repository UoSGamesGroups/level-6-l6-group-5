#pragma strict

public var chestCollected: boolean;

function OnCollisionEnter(other:Collision)
{
	if(other.gameObject.tag == "player")
	{
		chestCollected = true;
		PlayerPrefs.SetInt("ChestCollected", (chestCollected ? 1 : 0));
		Destroy (gameObject);
	}
}