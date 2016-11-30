#pragma strict

public var player: GameObject;
public var dist: float;

function Start () 
{
	player = gameObject.FindGameObjectWithTag ("player");
}

function Update () 
{ 
	dist = Vector3.Distance(player.transform.position, transform.position);


	if (dist > 3.5)
	{
		this.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	else
	{
		this.gameObject.GetComponent.<Renderer>().enabled = true;
	}

}