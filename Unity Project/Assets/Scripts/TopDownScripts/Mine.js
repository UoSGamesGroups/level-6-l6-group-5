#pragma strict

public var player: GameObject;
public var explosion: GameObject;
public var dist: float;
public var damage: float;
public var baseDamage: float;

function Start () 
{
	
	player = gameObject.FindGameObjectWithTag ("player");
	damage = (Application.loadedLevel + 1) * baseDamage;

}

function Update () 
{ 
	dist = Vector3.Distance(player.transform.position, transform.position);


	if (dist < 0.75)
	{
		Instantiate (explosion,transform.position,transform.rotation);
		player.GetComponent.<BoatControl>().health -= damage;
		Destroy (gameObject);
	}

}