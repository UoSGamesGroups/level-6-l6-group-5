#pragma strict

public var player: GameObject;
public var dist: float;
public var distUpgrade: float;
public var discovered: boolean;


function Start () 
{
	player = gameObject.FindGameObjectWithTag ("player");
	distUpgrade = 2.5 + (PlayerPrefs.GetInt("Vision") / 10);
}

function Update () 
{ 
	dist = Vector3.Distance(player.transform.position, transform.position);


	if (dist > distUpgrade && !discovered)//THIS IS THE VISION SYSTEM THAT LEAVES OBJS VISIBLE AFTER THEY HAVE BEEN FOUND
	{
		this.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	else
	{
		this.gameObject.GetComponent.<Renderer>().enabled = true;
		discovered =  true;
	}


	/* THIS IS THE ORIGINAL VISION SYSTEM
		if (dist > distUpgrade)
	{
		this.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	else
	{
		this.gameObject.GetComponent.<Renderer>().enabled = true;
	}
	*/






}