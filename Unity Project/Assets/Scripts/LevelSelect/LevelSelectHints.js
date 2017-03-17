#pragma strict

public var timer: float;
public var hint1: GameObject;
public var hint2: GameObject;
public var zonesUnlocked: int;
function Start () 
{
	zonesUnlocked = PlayerPrefs.GetInt ("zoneUnlocked");
}

function Update ()
{
	timer += 1 * Time.deltaTime;

	if (timer > 20 && zonesUnlocked == 0)
	{
		hint1.SetActive (true);
	}



}

function Hint2 ()
{
	hint2.SetActive (false);
}