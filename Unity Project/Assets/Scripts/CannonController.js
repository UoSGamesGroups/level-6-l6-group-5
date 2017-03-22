#pragma strict

public var normalCannon: GameObject;
public var fireCannon: GameObject;
public var heavyCannon: GameObject;
public var slowCannon: GameObject;
public var normalOutline: GameObject;
public var fireOutline: GameObject;
public var heavyOutline: GameObject;
public var slowOutline: GameObject;
public var fireShots: int;
public var heavyShots: int;
public var slowShots: int;


function Start () 
{
	fireShots = PlayerPrefs.GetInt("PowerUp1");
	heavyShots = PlayerPrefs.GetInt("PowerUp2");
	slowShots = PlayerPrefs.GetInt("PowerUp3");

	UpdateAmmo();
}

function Selected () 
{
	normalCannon.GetComponent(Cannon).selected = false;
	fireCannon.GetComponent(Cannon).selected = false;
	heavyCannon.GetComponent(Cannon).selected = false;
	slowCannon.GetComponent(Cannon).selected = false;
}
function UpdateAmmo()
{

	if(fireShots > 0)
	{
		fireCannon.SetActive(true);
		fireOutline.SetActive(true);
	}
	else
	{
		fireCannon.SetActive(false);
		fireOutline.SetActive(false);
	}

	if(heavyShots > 0)
	{
		heavyCannon.SetActive(true);
		heavyOutline.SetActive(true);
	}
	else
	{
		heavyCannon.SetActive(false);
		heavyOutline.SetActive(false);
	}

	if(slowShots > 0)
	{
		slowCannon.SetActive(true);
		slowOutline.SetActive(true);
	}
	else
	{
		slowCannon.SetActive(false);
		slowOutline.SetActive(false);
	}
}
