#pragma strict

public var dist: float;
public var player: GameObject;
public var bossFoundUI: GameObject;

function Start () 
{
	player = gameObject.FindGameObjectWithTag ("player");
	bossFoundUI = gameObject.FindGameObjectWithTag ("bossfoundui");
	bossFoundUI.SetActive (false);
}

function Update () 
{
	dist = Vector3.Distance(player.transform.position, transform.position);
	if (dist < 1)
	{
		bossFoundUI.SetActive(true);
	}
}