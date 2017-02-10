#pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;
public var baseDamage: int;
public var explosion: GameObject;

function Start () 
{
var currentLevel:int = PlayerPrefs.GetInt("currentLevel");
	damage = currentLevel * baseDamage; 
	ballForce = GetComponentInParent(Boss).force;
	this.gameObject.GetComponent.<Rigidbody>().AddRelativeForce(ballForce);
}

function Update () 
{
	if(transform.position.y <= 70)
	{
		Destroy(this.gameObject);
	}
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag == "BoatObj" && canDamage)
	{
		other.gameObject.GetComponentInParent(Boat).health -= damage;
		canDamage = false;
		Instantiate(explosion, transform.position, transform.rotation);
		Destroy(this.gameObject);
	}

}