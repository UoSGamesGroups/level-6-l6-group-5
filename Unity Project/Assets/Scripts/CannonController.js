#pragma strict

public var normalCannon: GameObject;
public var fireCannon: GameObject;
public var heavyCannon: GameObject;
public var slowCannon: GameObject;
public var fireShots: int;
public var heavyShots: int;
public var slowShots: int;


function Start () 
{
	//fireShots = PlayerPrefs.GetInt("FireShots");
	//heavyShots = PlayerPrefs.GetInt("HeavyShots");
	//slowShots = PlayerPrefs.GetInt("SlowShots");
	

	if(fireShots > 0)
	{
		fireCannon.SetActive(true);
	}
	else
	{
		fireCannon.SetActive(false);
	}

	if(heavyShots > 0)
	{
		heavyCannon.SetActive(true);
	}
	else
	{
		heavyCannon.SetActive(false);
	}

	if(slowShots > 0)
	{
		slowCannon.SetActive(true);
	}
	else
	{
		slowCannon.SetActive(false);
	}
}

function Selected () 
{
	normalCannon.GetComponent(Cannon).selected = false;
	fireCannon.GetComponent(Cannon).selected = false;
	heavyCannon.GetComponent(Cannon).selected = false;
	slowCannon.GetComponent(Cannon).selected = false;
}
