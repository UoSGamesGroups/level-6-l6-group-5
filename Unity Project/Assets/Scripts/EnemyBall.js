#pragma strict

public var ballForce: Vector3;
public var damage: int;
public var canDamage: boolean;


function Start () 
{
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
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
	}

}