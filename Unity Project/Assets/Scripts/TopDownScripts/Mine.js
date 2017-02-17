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
	transform.position.y = 0.5;
}

function OnCollisionEnter(other:Collision)
{
	if(other.gameObject.tag == ("player"))
	{
		Instantiate (explosion,transform.position,transform.rotation);
		//player.GetComponent.<BoatControl>().health -= damage; old system here if we need
		player.GetComponent.<exploreControls>().health -= damage;
		Destroy (gameObject);
	}
}